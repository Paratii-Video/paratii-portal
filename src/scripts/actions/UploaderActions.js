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
  TRANSCODING_FAILURE
} from 'constants/ActionConstants'
import VideoRecord from 'records/VideoRecords'
import { videoFetchSuccess } from 'actions/VideoActions'
import type { Dispatch } from 'redux'
import type { RootState } from 'types/ApplicationTypes'

export const selectUploaderVideo = createAction(UPLOAD_VIDEO_SELECT)
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

function upsertVideo (videoId, dataToUpdate, state) {
  const v = state.videos.get(videoId)
  const updatedVideo = Object.assign({}, v.toJS(), dataToUpdate)
  delete updatedVideo.fetchStatus
  if (!updatedVideo.filename) {
    updatedVideo.filename = ''
  }
  console.log('SAVING:')
  console.log(updatedVideo)
  return paratii.core.vids.upsert(updatedVideo)
}

// upload the video to the local ipfs node
export const upload = (file: Object) => (
  dispatch: Dispatch<*>,
  getState: () => RootState
) => {
  const newVideoId = paratii.eth.vids.makeId()
  dispatch(
    videoFetchSuccess(
      new VideoRecord({ id: newVideoId, owner: paratii.config.account.address })
    )
  )
  dispatch(selectUploaderVideo(newVideoId))
  dispatch(
    uploadRequested({
      id: newVideoId,
      filename: file.name,
      filesize: file.size,
      owner: paratii.config.account.address
    })
  )
  const uploader = paratii.ipfs.uploader.add(file)
  uploader.on('error', function (err) {
    console.log('[UPLOAD error]', err)
    throw err
  })
  uploader.on('done', function (files) {
    console.log('[UPLOAD done]', files)
    const file = files[0]

    upsertVideo(
      newVideoId,
      {
        owner: paratii.config.account.address,
        ipfsHashOrig: file.hash,
        filename: file.path,
        filesize: file.size
      },
      getState()
    )
  })
  uploader.on('fileReady', function (file) {
    console.log(file)
    dispatch(
      uploadLocalSuccess({ id: newVideoId, hash: file.hash, size: file.size })
    )
    // now we can start the transcoding
    transcodeVideo({
      id: newVideoId,
      hash: file.hash,
      size: file.size
    })(dispatch, getState)
  })
}

export const transcodeVideo = (videoInfo: Object) => async (
  dispatch: Dispatch<*>,
  getState: () => RootState
) => {
  console.log(
    `Requesting to transcode video ${videoInfo.id} with hash ${videoInfo.hash}`
  )
  dispatch(transcodingRequested(videoInfo))
  const transcoder = paratii.ipfs.uploader.transcode(videoInfo.hash, {
    author: paratii.config.account.address,
    size: videoInfo.size
  })

  transcoder.on('uploader:progress', function (hash, size, percent) {
    console.log('upload progress', percent)
    dispatch(uploadProgress({ id: videoInfo.id, progress: percent }))
  })

  transcoder.on('transcoding:error', function (err) {
    console.log('TRANSCODER ERROR', err)
    dispatch(transcodingFailure(videoInfo, err))
  })

  transcoder.on('transcoding:started', function (hash, author) {
    console.log('TRANSCODER STARTED', hash, author)
  })

  transcoder.once('transcoding:progress', function (hash, size, percent) {
    // Once we have this, the file is fully uploaded to the transcoder
    dispatch(uploadProgress({ id: videoInfo.id, progress: 100 }))
    dispatch(uploadRemoteSuccess({ id: videoInfo.id, hash: videoInfo.hash }))
  })

  transcoder.on('transcoding:progress', function (hash, size, percent) {
    dispatch(transcodingProgress(videoInfo, size, percent))
    console.log('TRANSCODER PROGRES', hash, size, percent)
  })
  transcoder.on('transcoding:downsample:ready', function (hash, size) {
    console.log('TRANSCODER DOWNSAMPLE READY', hash, size)
  })

  transcoder.once('transcoding:done', function (hash, sizes) {
    // if transcoding is done, apparently we have uploaded the file first
    dispatch(uploadRemoteSuccess({ id: videoInfo.id, hash: videoInfo.hash }))
    dispatch(
      transcodingSuccess({
        id: videoInfo.id,
        hash: hash,
        sizes: sizes,
        duration: sizes.duration
      })
    )
    console.log('TRANSCODER DONE', hash, sizes, videoInfo.id)
    upsertVideo(
      videoInfo.id,
      {
        id: videoInfo.id,
        ipfsHash: sizes.master.hash,
        owner: paratii.config.account.address,
        duration: sizes.duration
      },
      getState()
    )
  })
}

export const saveVideoInfo = (videoInfo: Object) => async (
  dispatch: Dispatch<*>,
  getState: () => RootState
) => {
  // the owner is the user that is logged in
  console.log('SAVING VIDEO DATA')
  let videoId
  videoInfo.owner = paratii.config.account.address
  if (videoInfo.id) {
    videoId = videoInfo.id
  } else {
    videoId = paratii.eth.vids.makeId()
    videoInfo.id = videoId
    dispatch(videoFetchSuccess(new VideoRecord(videoInfo)))
    // dispatch(selectVideo(videoInfo.id))
  }
  dispatch(videoDataStart(videoInfo))
  upsertVideo(videoId, videoInfo, getState())
    .then(videoInfo => {
      // console.log('SAVED')
      dispatch(videoDataSaved(videoInfo))
    })
    .catch(error => {
      // console.log(error)
      throw error
    })
}
