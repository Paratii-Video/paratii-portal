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
  TRANSCODING_REQUESTED,
  TRANSCODING_PROGRESS,
  TRANSCODING_SUCCESS,
  TRANSCODING_FAILURE,
  VIDEOFETCH_ERROR,
  VIDEOFETCH_SUCCESS
} from 'constants/ActionConstants'
import VideoRecord from 'records/VideoRecords'
import {
  AsyncTaskStatusRecord,
  DataStatusRecord
} from 'records/AsyncTaskStatusRecord'
import type { Action, VideoRecordMap } from 'types/ApplicationTypes'

const reducer = {
  [UPLOAD_REQUESTED]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, filename: string }> = {}
  ): VideoRecordMap => {
    if (!payload || !payload.id) {
      return state
    }
    const videoRecord: VideoRecord = state.get(payload.id) || new VideoRecord()
    return state.set(
      payload.id,
      videoRecord.merge({
        filename: payload.filename,
        uploadStatus: videoRecord.get('uploadStatus').merge({
          name: 'running',
          data: videoRecord.getIn(['uploadStatus', 'data']).merge({
            progress: 0
          })
        })
      })
    )
  },
  [UPLOAD_PROGRESS]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, progress: number }> = {}
  ): VideoRecordMap => {
    if (!payload || !state.get(payload.id)) {
      throw Error(`Unknown id: ${(payload && payload.id) || 'undefined'}`)
    }
    return state.mergeDeep({
      [payload.id]: {
        uploadStatus: {
          data: { progress: payload.progress }
        }
      }
    })
  },
  [UPLOAD_LOCAL_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, hash: string }> = {}
  ): VideoRecordMap => {
    if (!payload || !state.get(payload.id)) {
      throw Error(`Unknown id: ${(payload && payload.id) || 'undefined'}`)
    }
    const ipfsHashOrig = payload.hash
    state = state.mergeDeep({
      [payload.id]: {
        ipfsHashOrig: ipfsHashOrig,
        uploadStatus: {
          name: 'uploaded to local node',
          data: {
            ipfsHashOrig: ipfsHashOrig
          }
        }
      }
    })
    return state
  },
  [UPLOAD_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, hash: string }>
  ): VideoRecordMap => {
    if (!payload || !state.get(payload.id)) {
      throw Error(`Unknown id: ${(payload && payload.id) || 'undefined'}`)
    }
    const ipfsHashOrig = payload.hash
    return state.mergeDeep({
      [payload.id]: {
        ipfsHashOrig: ipfsHashOrig,
        uploadStatus: {
          name: 'uploaded to transcoder node',
          data: {
            ipfsHashOrig: ipfsHashOrig
          }
        }
      }
    })
  },
  [UPDATE_VIDEO_INFO]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, title: string, description: string }> = {}
  ): VideoRecordMap => {
    if (!payload || !payload.id || !state.get(payload.id)) {
      return state
    }
    return state
      .setIn([payload.id, 'title'], payload.title)
      .setIn([payload.id, 'description'], payload.description)
  },
  [VIDEO_DATA_START]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord> = {}
  ): VideoRecordMap => {
    if (!payload || !payload.id || !state.get(payload.id)) {
      return state
    }

    state = state.setIn(
      [payload.id, 'blockchainStatus'],
      new AsyncTaskStatusRecord({
        name: 'running',
        data: new DataStatusRecord({
          id: payload.id,
          title: payload.title,
          description: payload.description,
          owner: payload.owner
        })
      })
    )
    return state
  },
  [VIDEO_DATA_SAVED]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord> = {}
  ): VideoRecordMap => {
    if (!payload || !payload.id || !state.get(payload.id)) {
      return state
    }
    state = state.setIn(
      [payload.id, 'blockchainStatus'],
      new AsyncTaskStatusRecord({
        name: 'success',
        data: new DataStatusRecord({
          id: payload.id,
          title: payload.title,
          description: payload.description,
          owner: payload.owner
        })
      })
    )
    state = state.setIn([payload.id, 'title'], payload.title)
    state = state.setIn([payload.id, 'description'], payload.description)
    return state
  },
  [TRANSCODING_REQUESTED]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    if (!payload || !payload.id || !state.get(payload.id)) {
      return state
    }
    return state.setIn(
      [payload.id, 'transcodingStatus'],
      new AsyncTaskStatusRecord({
        name: 'requested',
        data: new DataStatusRecord({})
      })
    )
  },
  [TRANSCODING_PROGRESS]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    if (!payload || !payload.id || !state.get(payload.id)) {
      return state
    }
    return state.setIn(
      [payload.id, 'transcodingStatus'],
      new AsyncTaskStatusRecord({
        name: 'progress'
      })
    )
  },
  [TRANSCODING_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, sizes: Object }>
  ): VideoRecordMap => {
    if (!payload || !payload.id || !state.get(payload.id)) {
      return state
    }
    const ipfsHash =
      payload.sizes && payload.sizes.master && payload.sizes.master.hash
    if (!ipfsHash) {
      return state
    }

    return state.setIn([payload.id, 'ipfsHash'], ipfsHash).setIn(
      [payload.id, 'transcodingStatus'],
      new AsyncTaskStatusRecord({
        name: 'success',
        data: new DataStatusRecord({
          ipfsHash,
          sizes: Immutable.Map(payload.sizes)
        })
      })
    )
  },
  [TRANSCODING_FAILURE]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    if (!payload || !payload.id || !state.get(payload.id)) {
      return state
    }
    return state.setIn(
      [payload.id, 'transcodingStatus'],
      new AsyncTaskStatusRecord({
        name: 'failed'
      })
    )
  },
  [VIDEOFETCH_ERROR]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, error: Object }>
  ): VideoRecordMap => {
    if (!payload || !payload.id) {
      return state
    }
    return state.mergeDeep({
      [payload.id]: new VideoRecord({
        fetchStatus: new AsyncTaskStatusRecord({
          name: 'failed',
          data: new DataStatusRecord({ error: payload.error.message })
        })
      })
    })
  },
  [VIDEOFETCH_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    if (!payload || !payload.get('id')) {
      return state
    }
    return state.set(
      payload.id,
      payload.set('fetchStatus', new AsyncTaskStatusRecord({ name: 'success' }))
    )
  }
}

export default handleActions(reducer, Immutable.Map({}))
