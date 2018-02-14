/* @flow */

import { createAction } from 'redux-actions'
import paratii from 'utils/ParatiiLib'

import {
  UPLOAD_REQUESTED,
  UPLOAD_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_LOCAL_SUCCESS,
  VIDEO_DATA_START,
  VIDEO_DATA_SAVED,
  VIDEO_SELECT,
  TRANSCODING_REQUESTED,
  TRANSCODING_PROGRESS,
  TRANSCODING_SUCCESS,
  TRANSCODING_FAILURE
} from 'constants/ActionConstants'
import VideoRecord from 'records/VideoRecords'
import { videoFetchSuccess } from 'actions/VideoActions'

import type { Dispatch } from 'redux'

const uploadRequested = createAction(UPLOAD_REQUESTED)
const uploadProgress = createAction(UPLOAD_PROGRESS)
const uploadSuccess = createAction(UPLOAD_SUCCESS)
const uploadLocalSuccess = createAction(UPLOAD_LOCAL_SUCCESS)
const videoDataStart = createAction(VIDEO_DATA_START)
const videoDataSaved = createAction(VIDEO_DATA_SAVED)
const selectVideo = createAction(VIDEO_SELECT)
const transcodingRequested = createAction(TRANSCODING_REQUESTED)
const transcodingProgress = createAction(TRANSCODING_PROGRESS)
const transcodingSuccess = createAction(TRANSCODING_SUCCESS)
const transcodingFailure = createAction(TRANSCODING_FAILURE)

export const upload = (file: Object) => (dispatch: Dispatch<*>) => {
  const newVideoId = paratii.eth.vids.makeId()
  dispatch(videoFetchSuccess(new VideoRecord({ id: newVideoId })))
  dispatch(selectVideo({ id: newVideoId }))
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
    transcodeVideo({
      id: newVideoId,
      hash: file.hash,
      size: file.size
    })(dispatch)
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
  const transcoder = paratii.ipfs.uploader.transcode(videoInfo.hash, {
    author: paratii.config.account.address,
    size: videoInfo.size
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
  transcoder.on('transcoding:done', function (hash, sizes) {
    // if transcoding is done, apparently we have uploaded the file first
    dispatch(uploadSuccess({ id: videoInfo.id, hash: videoInfo.hash }))
    dispatch(transcodingSuccess({ id: videoInfo.id, hash: hash, sizes: sizes }))
    // console.log('TRANSCODER DONE', hash, sizes)
    // paratii.core.vids.update(videoInfo.id, { ipfsHash: sizes.master.hash })
  })
}

export const saveVideoInfo = (videoInfo: Object) => async (
  dispatch: Dispatch<*>
) => {
  // the owner is the user that is logged in
  videoInfo.owner = paratii.config.account.address
  if (!videoInfo.id) {
    const newVideoId = paratii.eth.vids.makeId()
    videoInfo.id = newVideoId
    dispatch(videoFetchSuccess(new VideoRecord(videoInfo)))
  }
  dispatch(videoDataStart(videoInfo))
  console.log('SAVING', videoInfo)

  paratii.core.vids
    .create(videoInfo)
    .then(videoInfo => {
      // dispatch(updateVideoInfo(new VideoRecord(videoInfo)))
      console.log('SAVED')
      dispatch(videoDataSaved(videoInfo))
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}
