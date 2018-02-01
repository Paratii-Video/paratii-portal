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
import { Map } from 'immutable'
import UploadRecord from 'records/UploadRecords'

const reducer = {
  [UPLOAD_REQUESTED]: (
    state: UploadRecord,
    { payload }: Action<{ id: string, filename: string }>
  ): UploadRecord => {
    state = state
      .mergeDeep({
        [payload.id]: new UploadRecord()
      })
      .mergeDeep({
        [payload.id]: {
          filename: payload.filename,
          uploadStatus: {
            name: 'running',
            data: { progress: 0 }
          }
        }
      })
    return state
  },
  [UPLOAD_PROGRESS]: (
    state: UploadRecord,
    { payload }: Action<{ id: string, progress: number }>
  ): UploadRecord => {
    if (!state.get(payload.id)) {
      throw Error(`Unknown id: ${payload.id}`)
    }
    return state.mergeDeep({
      [payload.id]: {
        uploadStatus: {
          data: { progress: payload.progress }
        }
      }
    })
  },
  [UPLOAD_SUCCESS]: (
    state: UploadRecord,
    { payload }: Action<{ id: string, hash: string }>
  ): UploadRecord => {
    if (!state.get(payload.id)) {
      throw Error(`Unknown id: ${payload.id}`)
    }
    return state.mergeDeep({
      [payload.id]: {
        uploadStatus: {
          name: 'success...',
          data: { ipfsHash: payload.hash }
        }
      }
    })
  },
  [UPDATE_UPLOAD_INFO]: (
    state: UploadRecord,
    { payload }: Action<UploadRecord>
  ): UploadRecord => {
    return state.setIn([payload.id, 'videoInfo'], payload)
  },
  [VIDEO_DATA_START]: (
    state: UploadRecord,
    { payload }: Action<UploadRecord>
  ): UploadRecord => {
    return state.setIn([payload.id, 'blockchainStatus'], {
      name: 'running',
      data: {}
    })
  },
  [VIDEO_DATA_SAVED]: (
    state: UploadRecord,
    { payload }: Action<UploadRecord>
  ): UploadRecord => {
    return state.setIn([payload.id, 'blockchainStatus'], {
      name: 'success',
      data: {}
    })
  }
}

export default handleActions(reducer, Map({}))
