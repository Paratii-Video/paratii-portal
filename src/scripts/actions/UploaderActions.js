/* @flow */

import React from 'react'
import { createAction } from 'redux-actions'
import Notifications from 'react-notification-system-redux'

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
import TranslatedText from 'components/translations/TranslatedText'

import type { RootState } from 'types/ApplicationTypes'
import type { Dispatch } from 'redux'

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
  delete updatedVideo.vote
  delete updatedVideo.whiteListed
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
      title: <TranslatedText message="uploader.notifications.starting.title" />,
      message: (
        <TranslatedText message="uploader.notifications.starting.description" />
      )
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
        title: (
          <TranslatedText message="uploader.notifications.uploadError.title" />
        ),
        message: (
          <TranslatedText message="uploader.notifications.uploadError.description" />
        ),
        autoDismiss: 0
      })
    )
    throw error
  })
  uploader.on('done', function (files) {
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
        title: (
          <TranslatedText message="uploader.notifications.uploaded.title" />
        ),
        message: (
          <TranslatedText message="uploader.notifications.uploaded.description" />
        )
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
        title: (
          <TranslatedText message="uploader.notifications.transcodeError.title" />
        ),
        message: (
          <TranslatedText message="uploader.notifications.transcodeError.description" />
        ),
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
        title: (
          <TranslatedText message="uploader.notifications.transcoding.title" />
        ),
        message: (
          <TranslatedText message="uploader.notifications.transcoding.description" />
        )
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
        title: (
          <TranslatedText message="uploader.notifications.transcoded.title" />
        ),
        message: (
          <TranslatedText message="uploader.notifications.transcoded.description" />
        )
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
      title: <TranslatedText message="uploader.notifications.saving.title" />
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
          title: (
            <TranslatedText message="uploader.notifications.saved.title" />
          ),
          message: (
            <TranslatedText message="uploader.notifications.saved.description" />
          )
        })
      )
    })
    .catch(error => {
      dispatch(
        Notifications.error({
          title: (
            <TranslatedText message="uploader.notifications.saveError.title" />
          ),
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
