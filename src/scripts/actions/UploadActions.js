/* @flow */

import { createAction } from 'redux-actions'
import { paratii } from 'utils/ParatiiLib'

import {
  UPLOAD_REQUESTED,
  UPLOAD_PROGRESS,
  UPLOAD_SUCCESS,
  UPDATE_UPLOAD_INFO,
  VIDEO_DATA_START,
  VIDEO_DATA_SAVED,
  VIDEO_SELECT
} from 'constants/ActionConstants'

import type { Dispatch } from 'redux'

import VideoInfoRecord from 'records/VideoInfoRecords'

const uploadRequested = createAction(UPLOAD_REQUESTED)
const uploadProgress = createAction(UPLOAD_PROGRESS)
const uploadSuccess = createAction(UPLOAD_SUCCESS)
const updateUploadInfo = createAction(UPDATE_UPLOAD_INFO)
const videoDataStart = createAction(VIDEO_DATA_START)
const videoDataSaved = createAction(VIDEO_DATA_SAVED)
const videoDataLoaded = createAction(VIDEO_SELECT)

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
    dispatch(uploadSuccess({ id: newVideoId, hash: file.hash }))
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
  console.log(`Transcoding video ${videoInfo.id} with hash ${videoInfo.hash}`)
  let transcoder = paratii.ipfs.uploader.transcode(videoInfo.hash)
  transcoder.on('transcoding:error', function (err) {
    console.log('TRANSCODER ERROR', err)
    throw err
  })
  transcoder.on('transcoding:started', function (hash, author) {
    console.log('TRANSCODER COMMAND', hash, author)
  })
  // *    - 'transcoding:progress': (hash, size, percent)
  // *    - 'transcoding:downsample:ready' (hash, size)
  // *    - 'transcoding:done': (hash, transcoderResult) triggered when the transcoder is done - returns the hash of the transcoded file
  //
}

export const saveVideoInfo = (videoInfo: Object) => async (
  dispatch: Dispatch<*>
) => {
  console.log('Saving video info')
  // the owner is the user that is logged in
  videoInfo.owner = paratii.config.account.address
  if (!videoInfo.id) {
    videoInfo.id = paratii.eth.vids.makeId()
  }
  console.log('SAVING', videoInfo)
  dispatch(updateUploadInfo(new VideoInfoRecord(videoInfo)))
  dispatch(videoDataStart(new VideoInfoRecord(videoInfo)))
  paratii.core.vids
    .create(videoInfo)
    .then(videoInfo => {
      console.log('Video successfully saved on blockchain!')
      dispatch(updateUploadInfo(new VideoInfoRecord(videoInfo)))
      dispatch(videoDataSaved(new VideoInfoRecord(videoInfo)))
    })
    .catch(error => {
      console.log('-------------------')
      console.log(error)
    })
}
