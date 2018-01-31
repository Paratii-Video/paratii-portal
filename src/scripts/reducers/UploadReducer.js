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
import VideoInfoRecord from 'records/VideoInfoRecords'

const reducer = {
  [UPLOAD_REQUESTED]: (
    state: UploadRecord,
    { payload }: Action<{ id: string, filename: string }>
  ): UploadRecord => {
    console.log('00000000000000000')
    console.log(state)
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
    console.log('10000000000000000')
    console.log(state)
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
    console.log('20000000000000000')
    console.log(state)
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
    { payload }: Action<VideoInfoRecord>
  ): UploadRecord => {
    console.log(payload)
    console.log('60000000000000000')
    console.log(state)
    return state.setIn([payload.id, 'videoInfo'], payload)
  },
  [VIDEO_DATA_START]: (state: UploadRecord): UploadRecord => {
    return state.mergeDeep({
      blockchainStatus: {
        name: 'running',
        data: {}
      }
    })
  },
  [VIDEO_DATA_SAVED]: (state: UploadRecord): UploadRecord => {
    return state.mergeDeep({
      blockchainStatus: {
        name: 'success',
        data: {}
      }
    })
  }
}

export default handleActions(reducer, Map({}))
