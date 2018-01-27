/* @flow */

import { createAction } from 'redux-actions'
import { paratii } from 'utils/ParatiiLib'
import UUID from 'uuid-js'

import {
  UPLOAD_REQUESTED,
  UPLOAD_PROGRESS,
  UPLOAD_SUCCESS,
  UPDATE_UPLOAD_INFO
  // VIDEO_DATA_START,
  // VIDEO_DATA_SAVED
} from 'constants/ActionConstants'

import type { Dispatch } from 'redux'

import VideoInfoRecord from 'records/VideoInfoRecords'

const uploadRequested = createAction(UPLOAD_REQUESTED)
const uploadProgress = createAction(UPLOAD_PROGRESS)
const uploadSuccess = createAction(UPLOAD_SUCCESS)
const updateUploadInfo = createAction(UPDATE_UPLOAD_INFO)
// const videoDataStart = createAction(VIDEO_DATA_START)
// const videoDataSaved = createAction(VIDEO_DATA_SAVED)

export const upload = (files: Array<Object>) => (dispatch: Dispatch<*>) => {
  // the next call dispatches an asynchronous request to upload the file to ipfs
  // (the API will change and become paratii.ipfs.add(..))
  files.map(file => uploadFile(file, dispatch))
}

const uploadFile = (file: Object, dispatch: Dispatch<*>) => {
  const uuid = UUID.create()
  dispatch(uploadRequested({id: uuid, filename: file.name}))
  paratii.ipfs.uploader.upload([file], {
    onStart: () => {
      console.log('Uploading file', file)
    },
    onProgress: (chunkLength, progress) => {
      console.log('progress: ', progress)
      dispatch(uploadProgress({id: uuid, progress: progress}))
    },
    onError: (err) => {
      console.log('[UPLOAD error]', err)
    },
    onDone: (file) => {
      console.log('[UPLOAD done]', file)
    },
    onFileReady: (file) => {
      dispatch(uploadSuccess({id: uuid, hash: file.hash}))
    }
  })
}

export const saveVideoInfo = (id: string, videoInfo: Object) => async (dispatch: Dispatch<*>) => {
  // console.log('Saving video info')
  // the owner is the user that is logged in
  videoInfo.owner = paratii.config.account.address
  dispatch(updateUploadInfo({id: id, videoInfo: new VideoInfoRecord(videoInfo)}))
  // dispatch(videoDataStart())
  // paratii.core.vids.create(videoInfo)
  //   .then((videoInfo) => {
  //     console.log('Video successfully saved on blockchain!')
  //     dispatch(updateUploadInfo(new VideoInfoRecord(videoInfo)))
  //     dispatch(videoDataSaved())
  //   })
  //   .catch((error) => {
  //     console.log('-------------------')
  //     console.log(error)
  //   })
}
