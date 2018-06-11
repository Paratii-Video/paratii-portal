/* @flow */

import { createAction } from 'redux-actions'
import paratii from 'utils/ParatiiLib'

import {
  UPLOAD_REQUESTED,
  UPLOAD_PROGRESS,
  UPLOAD_REMOTE_SUCCESS,
  UPLOAD_LOCAL_SUCCESS,
  VIDEO_DATA_START,
  VIDEO_DATA_SAVED,
  UPLOAD_VIDEO_SELECT,
  TRANSCODING_REQUESTED,
  TRANSCODING_PROGRESS,
  TRANSCODING_SUCCESS,
  TRANSCODING_FAILURE,
  VIDEO_STAKED
} from 'constants/ActionConstants'
import VideoRecord from 'records/VideoRecords'
import { videoFetchSuccess } from 'actions/VideoActions'
import type { Dispatch } from 'redux'
import type { RootState } from 'types/ApplicationTypes'

import Notifications from 'react-notification-system-redux'

export const selectVideoToPublish = createAction(UPLOAD_VIDEO_SELECT)
const uploadRequested = createAction(UPLOAD_REQUESTED)
const uploadProgress = createAction(UPLOAD_PROGRESS)
const uploadRemoteSuccess = createAction(UPLOAD_REMOTE_SUCCESS)
const uploadLocalSuccess = createAction(UPLOAD_LOCAL_SUCCESS)
const videoDataStart = createAction(VIDEO_DATA_START)
const videoDataSaved = createAction(VIDEO_DATA_SAVED)
const transcodingRequested = createAction(TRANSCODING_REQUESTED)
const transcodingProgress = createAction(TRANSCODING_PROGRESS)
const transcodingSuccess = createAction(TRANSCODING_SUCCESS)
const transcodingFailure = createAction(TRANSCODING_FAILURE)
const videoStaked = createAction(VIDEO_STAKED)

function upsertVideo (videoId, dataToUpdate, state) {
  const v = state.videos.get(videoId)
  const updatedVideo = Object.assign({}, v.toJS(), dataToUpdate)
  delete updatedVideo.fetchStatus
  delete updatedVideo.staked
  delete updatedVideo.published
  if (!updatedVideo.filename) {
    updatedVideo.filename = ''
  }
  console.log('SAVING:')
  console.log(updatedVideo)
  return paratii.vids.upsert(updatedVideo).catch(error => {
    throw error
  })
}

// upload the video to the local ipfs node and dispatch the transcoding process
export const uploadAndTranscode = (file: Object, videoId: string) => (
  dispatch: Dispatch<*>,
  getState: () => RootState
) => {
  console.log('STARTING FILE UPLOAD')
  dispatch(
    Notifications.success({
      title: 'Be Patient!',
      message: 'We are preparing your file.'
    })
  )
  // create a new Id if none was given
  if (!videoId) {
    videoId = paratii.eth.vids.makeId()
  }
  dispatch(videoFetchSuccess({ id: videoId, owner: paratii.eth.getAccount() }))
  dispatch(
    uploadRequested({
      id: videoId,
      filename: file.name,
      filesize: file.size,
      owner: paratii.eth.getAccount()
    })
  )
  // this will upload the file to the local IPFS node and report on progress
  const uploader = paratii.vids.uploadAndTranscode(file)

  uploader.on('error', function (error) {
    console.log('[UPLOAD error]', error)
    dispatch(
      Notifications.error({
        title: 'Upload Error',
        message: 'Something went wrong with your file. May you retry?',
        autoDismiss: 0
      })
    )
    throw error
  })
  uploader.on('done', function (files) {
    dispatch(
      Notifications.success({
        title: 'Local upload',
        message: 'The local upload has been done'
      })
    )
    const file = files[0]
    upsertVideo(
      videoId,
      {
        owner: paratii.eth.getAccount(),
        ipfsHashOrig: file.hash,
        filename: file.path,
        filesize: file.size
      },
      getState()
    )
  })

  uploader.on('progress', percent => {
    console.log('upload progress', percent)
    dispatch(uploadProgress({ id: videoId, progress: percent }))
  })

  uploader.on('local:fileReady', function (file) {
    dispatch(
      Notifications.success({
        title: 'File uploaded',
        message: 'Now we need to transcode your pixels'
      })
    )
    dispatch(
      uploadLocalSuccess({ id: videoId, hash: file.hash, size: file.size })
    )
    console.log(
      `Requesting to transcode video ${videoId} with hash ${file.hash}`
    )
    // now we can start the transcoding
    // this wll ALSO start the XHR upload
    const videoInfo = {
      id: videoId,
      hash: file.hash,
      size: file.size
    }
    dispatch(transcodingRequested(videoInfo))
  })
  _handleTrancoderEvents(uploader, videoId, dispatch, getState)
}

const _handleTrancoderEvents = (transcoder, videoId, dispatch, getState) => {
  transcoder.on('uploader:progress', function (hash, size, percent) {
    console.log('upload progress', percent)
    dispatch(uploadProgress({ id: videoId, progress: percent }))
  })

  transcoder.on('transcoding:error', function (error) {
    console.log('TRANSCODER ERROR', error)
    dispatch(
      Notifications.error({
        title: 'Transcoder Error',
        message: 'The machines are not cooperating. Can you refresh?',
        autoDismiss: 0
      })
    )
    dispatch(transcodingFailure({ id: videoId }, error))
  })

  transcoder.on('transcoding:started', function (hash, author) {
    // Once we have this, the file is fully uploaded to the transcoder
    console.log('Remote upload done!')
    dispatch(uploadProgress({ id: videoId, progress: 100 }))
    dispatch(uploadRemoteSuccess({ id: videoId, hash: hash }))
    // save the updaded state
    upsertVideo(videoId, {}, getState())

    console.log('TRANSCODER STARTED', hash, author)
    dispatch(
      Notifications.success({
        title: 'Transcoding',
        message: 'The transcoding has started.'
      })
    )
  })

  transcoder.on('transcoding:progress', function (hash, size, percent) {
    console.log('TRANSCODER PROGRESS', percent)
    percent = parseFloat(percent)
    dispatch(transcodingProgress({ id: videoId, progress: percent }))
  })

  transcoder.on('transcoding:downsample:ready', function (hash, size) {
    console.log('TRANSCODER DOWNSAMPLE READY', hash, size)
  })

  transcoder.once('transcoding:done', function (hash, result) {
    // if transcoding is done, apparently we have uploaded the file first
    dispatch(
      Notifications.success({
        title: 'Transcoder done',
        message: 'Your video is ready to be published!'
      })
    )
    dispatch(uploadRemoteSuccess({ id: videoId, hash: hash }))
    dispatch(
      transcodingSuccess({
        id: videoId,
        hash: hash,
        result: result,
        duration: result.duration
      })
    )
    console.log('TRANSCODER DONE', hash, result, videoId)
    upsertVideo(
      videoId,
      {
        ipfsHash: result.master.hash,
        owner: paratii.eth.getAccount(),
        duration: result.duration,
        thumbnails: result.screenshots
      },
      getState()
    )
  })
}

export const transcodeVideo = (videoInfo: Object) => async (
  dispatch: Dispatch<*>,
  getState: () => RootState
) => {
  const transcoder = paratii.transcoder.transcode(videoInfo.hash, {
    author: paratii.eth.getAccount(),
    size: videoInfo.size
  })
  _handleTrancoderEvents(transcoder, videoInfo.id, dispatch, getState)
}

export const saveVideoInfo = (videoInfo: Object) => async (
  dispatch: Dispatch<*>,
  getState: () => RootState
) => {
  // the owner is the user that is logged in
  dispatch(
    Notifications.warning({
      title: 'We are saving your data.'
    })
  )

  let videoId
  videoInfo.owner = paratii.eth.getAccount()
  if (videoInfo.id) {
    videoId = videoInfo.id
  } else {
    videoId = paratii.eth.vids.makeId()
    videoInfo.id = videoId
    dispatch(videoFetchSuccess(new VideoRecord(videoInfo)))
  }
  dispatch(videoDataStart(videoInfo))
  upsertVideo(videoId, videoInfo, getState())
    .then(videoInfo => {
      dispatch(videoDataSaved(videoInfo))
      dispatch(
        Notifications.success({
          title: 'Saved',
          message: 'Data saved!!'
        })
      )
    })
    .catch(error => {
      dispatch(
        Notifications.error({
          title: 'Saving Error',
          message: error.message,
          autoDismiss: 0
        })
      )
      throw error
    })
}

export const saveVideoStaked = (videoInfo: Object) => async (
  dispatch: Dispatch<*>,
  getState: () => RootState
) => {
  console.log(videoInfo)
  dispatch(videoStaked(videoInfo))
}
