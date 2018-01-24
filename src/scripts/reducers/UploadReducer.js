/* @flow */

import { handleActions } from 'redux-actions'
import type { Action } from 'types/ApplicationTypes'
import {
  UPLOAD_REQUESTED,
  UPLOAD_PROGRESS,
  UPLOAD_SUCCESS,
  UPDATE_UPLOAD_INFO,
  VIDEO_DATA_START,
  VIDEO_DATA_SAVED
} from 'constants/ActionConstants'
import { fromJS } from 'immutable'
import UploadRecord from 'records/UploadRecords'
import VideoInfoRecord from 'records/VideoInfoRecords'

const reducer = {
  [UPLOAD_REQUESTED]: (
    state: UploadRecord
  ): UploadRecord => {
    return state.mergeDeep({
      uploadStatus: {
        name: 'running',
        data: { progress: 0 }
      }
    })
  },
  [UPLOAD_PROGRESS]: (
    state: UploadRecord,
    { payload }: Action<number>
  ): UploadRecord => {
    return state.mergeDeep({
      uploadStatus: {
        data: { progress: payload }
      }
    })
  },
  [UPLOAD_SUCCESS]: (
    state: UploadRecord,
    { payload }: Action<string>
  ): UploadRecord => {
    return state.mergeDeep({
      uploadStatus: {
        name: 'success',
        data: { ipfsHash: payload }
      }
    })
  },
  [UPDATE_UPLOAD_INFO]: (
    state: UploadRecord,
    { payload }: Action<VideoInfoRecord>
  ): UploadRecord => {
    return state.setIn(['videoInfo'], payload)
  },
  [VIDEO_DATA_START]: (
    state: UploadRecord
  ): UploadRecord => {
    return state.mergeDeep({
      blockchainStatus: {
        name: 'running',
        data: {}
      }
    })
  },
  [VIDEO_DATA_SAVED]: (
    state: UploadRecord
  ): UploadRecord => {
    return state.mergeDeep({
      blockchainStatus: {
        name: 'success',
        data: {}
      }
    })
  }
}

export default handleActions(reducer, fromJS(new UploadRecord()))
