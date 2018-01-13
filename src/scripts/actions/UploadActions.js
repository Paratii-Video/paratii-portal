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

export const upload = (filename: string) => (dispatch: Dispatch<*>) => {
  dispatch(uploadRequested())

  sleep(0).then(async () => {
    for (let i = 0; i < 100; i++) {
      dispatch(uploadProgress(i))
      await sleep(10)
    }
    dispatch(uploadSuccess())
  })
}
