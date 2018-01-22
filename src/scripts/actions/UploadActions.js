/* @flow */

import { createAction } from 'redux-actions'
import { paratii } from 'utils/ParatiiLib'

import { UPLOAD_REQUESTED, UPLOAD_PROGRESS, UPLOAD_SUCCESS, UPDATE_UPLOAD_INFO } from 'constants/ActionConstants'

import type { Dispatch } from 'redux'

const uploadRequested = createAction(UPLOAD_REQUESTED)
const uploadProgress = createAction(UPLOAD_PROGRESS)
const uploadSuccess = createAction(UPLOAD_SUCCESS)
const updateUploadInfo = createAction(UPDATE_UPLOAD_INFO)

export const upload = (file: Object) => (dispatch: Dispatch<*>) => {
  dispatch(uploadRequested())

  console.log(`Uploading file ${file.name}`)

  // the next call dispatches an asynchronous request to upload the file to ipfs
  // (the API will change and become paratii.ipfs.add(..) and return an EventEmitter)
  // it is not completely functional yet, but paratii.ipfs will have a number of events to subscribe to
  // that will allow use to track the progress that can be used for the next lines of code
  //
  paratii.ipfs.uploader.upload([file], {
    onStart: function () {
      dispatch(uploadRequested())
      console.log('Upload started')
    },
    onError: function (err) {
      throw err
    },
    onProgress: function (chunkLength, progress) {
      // TODO: we really need progress updates until the file is pinned in the network...
      dispatch(uploadProgress({progress: progress}))
    },
    onFileReady: function (file) {
      // this event happens when the file has been uploaded to the local ipfs-node
      // TODO: save the hash
      dispatch(uploadSuccess({ipfsHash: file.hash}))
    }, // function(file)
    onDone: function (file) {
    }
  })
}

export const saveVideoInfo = (videoInfo: Object) => (dispatch: Dispatch<*>) => {
  console.log('Saving video info')
  // TODO: paratii-lib shoudl generate a fresh id, we now use a placeholder
  videoInfo.id = `foo_${Math.floor(Math.random() * 100000)}`
  // the owner is the user that is logged in
  videoInfo.owner = paratii.config.account.address
  // TODO: paratii-lib has no support for the description yet (there is an issue)
  // TODO: once that support is there, the following line should be deleted
  delete videoInfo.description
  console.log(videoInfo)
  paratii.core.vids.create(videoInfo).then(function (videoInfo) {
    console.log('Video information saved..!')
    dispatch(updateUploadInfo(videoInfo))
  })
}
