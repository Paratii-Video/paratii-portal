/* @flow */

import { createAction } from 'redux-actions'
import { paratii } from 'utils/ParatiiLib'

import {
  UPLOAD_REQUESTED,
  UPLOAD_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_LOCAL_SUCCESS,
  UPDATE_VIDEO_INFO,
  VIDEO_DATA_START,
  VIDEO_DATA_SAVED,
  VIDEO_SELECT,
  TRANSCODING_REQUESTED,
  TRANSCODING_PROGRESS,
  TRANSCODING_SUCCESS,
  TRANSCODING_FAILURE
} from 'constants/ActionConstants'

import type { Dispatch } from 'redux'

import VideoInfoRecord from 'records/VideoRecords'

const uploadRequested = createAction(UPLOAD_REQUESTED)
const uploadProgress = createAction(UPLOAD_PROGRESS)
const uploadSuccess = createAction(UPLOAD_SUCCESS)
const uploadLocalSuccess = createAction(UPLOAD_LOCAL_SUCCESS)
const updateVideoInfo = createAction(UPDATE_VIDEO_INFO)
const videoDataStart = createAction(VIDEO_DATA_START)
const videoDataSaved = createAction(VIDEO_DATA_SAVED)
const videoDataLoaded = createAction(VIDEO_SELECT)
const transcodingRequested = createAction(TRANSCODING_REQUESTED)
const transcodingProgress = createAction(TRANSCODING_PROGRESS)
const transcodingSuccess = createAction(TRANSCODING_SUCCESS)
const transcodingFailure = createAction(TRANSCODING_FAILURE)

export const upload = (file: Object) => (dispatch: Dispatch<*>) => {
  // the next call dispatches an asynchronous request to upload the file to ipfs
  // (the API will change and become paratii.ipfs.add(..))
  let newVideoId = paratii.eth.vids.makeId()
  // set the selectedVideo
  dispatch(videoDataLoaded({ id: newVideoId }))
  dispatch(uploadRequested({ id: newVideoId, filename: file.name }))
  const uploader = paratii.ipfs.uploader.add(file)
  uploader.on('error', function (err) {
    console.log('[UPLOAD error]', err)
    throw err
  })
  uploader.on('progress', function (chunkLength, progressPercent) {
    dispatch(uploadProgress({ id: newVideoId, progress: progressPercent }))
  })
  uploader.on('fileReady', function (file) {
    dispatch(uploadLocalSuccess({ id: newVideoId, hash: file.hash }))
    // now we can start the transcoding
    transcodeVideo({ id: newVideoId, hash: file.hash })(dispatch)
  })
  uploader.on('done', function (files) {
    console.log('[UPLOAD done]', files)
  })
}

export const transcodeVideo = (videoInfo: Object) => async (
  dispatch: Dispatch<*>
) => {
  console.log(
    `Requesting to transcode video ${videoInfo.id} with hash ${videoInfo.hash}`
  )
  dispatch(transcodingRequested(videoInfo))
  console.log(videoInfo)
  let transcoder = paratii.ipfs.uploader.transcode(videoInfo.hash, {
    author: paratii.config.account.address
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
    dispatch(uploadSuccess({ id: videoInfo.id, hash: videoInfo.hash }))
  })
  transcoder.on('transcoding:progress', function (hash, size, percent) {
    // Once we have this, the file is fully uploaded to the transcoder
    dispatch(transcodingProgress(videoInfo, size, percent))
    console.log('TRANSCODER PROGRES', hash, size, percent)
  })
  transcoder.on('transcoding:downsample:ready', function (hash, size) {
    console.log('TRANSCODER DOWNSAMPLE READY', hash, size)
  })
  transcoder.on('transcoding:done', function (hash, size) {
    // if transcoding is done, apparently we have uploaded the file first
    dispatch(uploadSuccess({ id: videoInfo.id, hash: videoInfo.hash }))
    dispatch(transcodingSuccess(videoInfo))
    console.log('TRANSCODER DOWNSAMPLE READY', hash, size)
  })
}

export const saveVideoInfo = (videoInfo: Object) => async (
  dispatch: Dispatch<*>
) => {
  // the owner is the user that is logged in
  videoInfo.owner = paratii.config.account.address
  if (!videoInfo.id) {
    videoInfo.id = paratii.eth.vids.makeId()
  }
  // console.log('SAVING', videoInfo)
  dispatch(updateVideoInfo(new VideoInfoRecord(videoInfo)))
  dispatch(videoDataStart(new VideoInfoRecord(videoInfo)))
  paratii.core.vids
    .create(videoInfo)
    .then(videoInfo => {
      dispatch(updateVideoInfo(new VideoInfoRecord(videoInfo)))
      dispatch(videoDataSaved(new VideoInfoRecord(videoInfo)))
    })
    .catch(error => {
      console.log('-------------------')
      console.log(error)
    })
}
