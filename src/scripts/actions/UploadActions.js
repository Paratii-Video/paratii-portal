/* @flow */

import { createAction } from 'redux-actions'
import Promise from 'bluebird'

import { UPLOAD_REQUESTED, UPLOAD_PROGRESS, UPLOAD_SUCCESS, UPDATE_UPLOAD_INFO } from 'constants/ActionConstants'

import type { Dispatch } from 'redux'

const uploadRequested = createAction(UPLOAD_REQUESTED)
const uploadProgress = createAction(UPLOAD_PROGRESS)
const uploadSuccess = createAction(UPLOAD_SUCCESS)
export const updateUploadInfo = createAction(UPDATE_UPLOAD_INFO)

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const upload = (file: Object) => (dispatch: Dispatch<*>) => {
  dispatch(uploadRequested())
<<<<<<< HEAD

  console.log(`Uploading file ${file.name}`)
=======
>>>>>>> a418520949bba2953d692ad32c41e13700f41f50
  sleep(0).then(async () => {
    for (let i = 0; i < 100; i++) {
      dispatch(uploadProgress({progress: i}))
      await sleep(100)
    }
    dispatch(uploadSuccess())
  })
}
