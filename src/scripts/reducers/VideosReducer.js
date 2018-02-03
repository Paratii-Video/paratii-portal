/* @flow */

import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import {
  UPLOAD_REQUESTED,
  UPLOAD_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_LOCAL_SUCCESS,
  UPDATE_VIDEO_INFO,
  VIDEO_DATA_START,
  VIDEO_DATA_SAVED,
  VIDEO_LOADED,
  TRANSCODING_REQUESTED,
  TRANSCODING_PROGRESS,
  TRANSCODING_SUCCESS,
  TRANSCODING_FAILURE
} from 'constants/ActionConstants'
import VideoRecord from 'records/VideoRecords'
import type { Action, VideoRecordMap } from 'types/ApplicationTypes'

const reducer = {
  [UPLOAD_REQUESTED]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, filename: string }>
  ): VideoRecordMap => {
    state = state
      .mergeDeep({
        [payload.id]: new VideoRecord()
      })
      .mergeDeep({
        [payload.id]: {
          id: payload.id,
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
    state: VideoRecordMap,
    { payload }: Action<{ id: string, progress: number }>
  ): VideoRecordMap => {
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
    state: VideoRecordMap,
    { payload }: Action<{ id: string, hash: string }>
  ): VideoRecordMap => {
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
  [UPLOAD_LOCAL_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, hash: string }>
  ): VideoRecordMap => {
    if (!state.get(payload.id)) {
      throw Error(`Unknown id: ${payload.id}`)
    }
    return state.mergeDeep({
      [payload.id]: {
        uploadStatus: {
          name: 'uploaded to local ipfs node',
          data: { ipfsHash: payload.hash }
        }
      }
    })
  },
  [UPDATE_VIDEO_INFO]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    return state.setIn([payload.id], payload)
  },
  [VIDEO_DATA_START]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    return state.setIn([payload.id, 'blockchainStatus'], {
      name: 'running',
      data: {}
    })
  },
  [VIDEO_DATA_SAVED]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    return state.setIn([payload.id, 'blockchainStatus'], {
      name: 'success',
      data: {}
    })
  },
  [TRANSCODING_REQUESTED]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    return state.setIn([payload.id, 'transcodingStatus'], {
      name: 'requested',
      data: {}
    })
  },
  [TRANSCODING_PROGRESS]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    return state.setIn([payload.id, 'transcodingStatus'], {
      name: 'progress',
      data: {}
    })
  },
  [TRANSCODING_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    return state.setIn([payload.id, 'transcodingStatus'], {
      name: 'success',
      data: {}
    })
  },
  [TRANSCODING_FAILURE]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    return state.setIn([payload.id, 'transcodingStatus'], {
      name: 'failed',
      data: {}
    })
  },
  [VIDEO_LOADED]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    return state.set(payload.get('id'), payload)
  }
}

export default handleActions(reducer, Immutable.Map({}))
