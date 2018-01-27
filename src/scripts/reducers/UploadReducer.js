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
    { payload }: Action<{id: string, filename: string}>
  ): UploadRecord => {
    return state
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
  },
  [UPLOAD_PROGRESS]: (
    state: UploadRecord,
    { payload }: Action<{id: string, progress: number}>
  ): UploadRecord => {
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
    { payload }: Action<{id: string, hash: string}>
  ): UploadRecord => {
    return state.mergeDeep({
      [payload.id]: {
        uploadStatus: {
          name: 'success',
          data: { ipfsHash: payload.hash }
        }
      }
    })
  },
  [UPDATE_UPLOAD_INFO]: (
    state: UploadRecord,
    { payload }: Action<{id: string, videoInfo: VideoInfoRecord}>
  ): UploadRecord => {
    return state.setIn([payload.id, 'videoInfo'], payload.videoInfo)
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

export default handleActions(reducer, Map({}))
