/* @flow */

import { createAction } from 'redux-actions'
import Promise from 'bluebird'
import { paratii } from 'utils/ParatiiLib'

import { UPLOAD_REQUESTED, UPLOAD_PROGRESS, UPLOAD_SUCCESS, UPDATE_UPLOAD_INFO } from 'constants/ActionConstants'

import type { Dispatch } from 'redux'

const uploadRequested = createAction(UPLOAD_REQUESTED)
const uploadProgress = createAction(UPLOAD_PROGRESS)
const uploadSuccess = createAction(UPLOAD_SUCCESS)
const updateUploadInfo = createAction(UPDATE_UPLOAD_INFO)

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const upload = (file: Object) => (dispatch: Dispatch<*>) => {
  dispatch(uploadRequested())

  console.log(`Uploading file ${file.name}`)

  // the next call dispatches an asynchronous request to upload the file to ipfs
  // (the API will change and become paratii.ipfs.add(..))
  paratii().ipfs.uploader.upload([file]).then(function (ipfsHash) {
    // the resulting hash will have to be saved to the blockchain
    dispatch(uploadSuccess({ipfsHash: ipfsHash}))
  })

  // it is not completely functional yet, but paratii.ipfs will have a number of events to subscribe to
  // that will allow use to track the progress that can be used for the next lines of code
  //   onStart: () => {}, // function()
  // onError: (err) => { if (err) throw err }, // function (err)
  // onFileReady: (file) => {}, // function(file)
  // onProgress: (chunkLength, progress) => {}, // function(chunkLength)
  // onDone: (file) => {} // function(file)
  //
  // These can be passed like this "paratii.ipfs.uploader.upload([file], { onProgress: function...})"
  // **PLEASE GIVE FEEDBACK ABOUT THIS - we are also thinkig of other options to handle the events
  sleep(0).then(async () => {
    for (let i = 0; i < 100; i++) {
      dispatch(uploadProgress({progress: i}))
      await sleep(100)
    }
    // dispatch(uploadSuccess())
  })
}

export const saveVideoInfo = (videoInfo: Object) => (dispatch: Dispatch<*>) => {
  console.log('Saving video info')
  // TODO: paratii-lib shoudl generate a fresh id, we now use a placeholder
  videoInfo.id = `foo_${Math.floor(Math.random() * 100000)}`
  // the owner is the user that is logged in
  videoInfo.owner = paratii().config.account.address
  // TODO: paratii-lib has no support for the description yet (there is an issue)
  // TODO: once that support is there, the following line should be deleted
  delete videoInfo.description
  console.log(videoInfo)
  paratii().core.vids.create(videoInfo).then(function (videoInfo) {
    console.log('Video successfully uploaded!')
    dispatch(updateUploadInfo(videoInfo))
  })
}
