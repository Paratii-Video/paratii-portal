/* @flow */

import { handleActions } from 'redux-actions'

import type { Action } from 'types/ApplicationTypes'
import { UPLOAD_REQUESTED, UPLOAD_PROGRESS, UPLOAD_SUCCESS, UPDATE_UPLOAD_INFO } from 'constants/ActionConstants'
import { fromJS } from 'immutable'
import UploadRecord from 'records/UploadRecords'

const reducer = {
  [UPLOAD_REQUESTED]: (
    state: UploadRecord
  ): UploadRecord => {
    return state.merge({
      isUploading: true
    })
  },
  [UPLOAD_PROGRESS]: (
    state: UploadRecord,
    { payload }: Action<{progress: number}>
  ): UploadRecord => {
    return state.mergeDeep({
      progress: { value: payload.progress }
    })
  },
  [UPLOAD_SUCCESS]: (
    state: UploadRecord,
    { payload }
  ): UploadRecord => {
    return state.merge({
      // isUploading: false,
      progress: null,
      ipfsHash: payload.ipfsHash
    })
  },
  [UPDATE_UPLOAD_INFO]: (
    state: UploadRecord,
    { payload }
  ): UploadRecord => {
    return state.merge({
      video: payload
    })
  }
}

export default handleActions(reducer, fromJS(new UploadRecord()))
