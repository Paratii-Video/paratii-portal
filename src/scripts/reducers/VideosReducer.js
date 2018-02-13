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
    { payload }: Action<{ id: string, filename: string, filesize: number }>
  ): VideoRecordMap => {
    state = state.mergeDeep({
      [payload.id]: {
        filename: payload.filename,
        filesize: payload.filesize,
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
  [UPLOAD_LOCAL_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, hash: string }>
  ): VideoRecordMap => {
    if (!state.get(payload.id)) {
      throw Error(`Unknown id: ${payload.id}`)
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
    if (!state.get(payload.id)) {
      throw Error(`Unknown id: ${payload.id}`)
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
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    state = state.setIn([payload.id, 'title'], payload.title)
    state = state.setIn([payload.id, 'description'], payload.description)
    return state
  },
  [VIDEO_DATA_START]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    state = state.setIn([payload.id, 'blockchainStatus'], {
      name: 'running',
      data: {
        id: payload.id,
        title: payload.title,
        description: payload.description,
        owner: payload.owner
      }
    })
    return state
  },
  [VIDEO_DATA_SAVED]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    state = state.setIn([payload.id, 'blockchainStatus'], {
      name: 'success',
      data: {
        id: payload.id,
        title: payload.title,
        description: payload.description,
        owner: payload.owner
      }
    })
    state = state.setIn([payload.id, 'title'], payload.title)
    state = state.setIn([payload.id, 'description'], payload.description)
    return state
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
    { payload }: Action<{ id: string, sizes: Object }>
  ): VideoRecordMap => {
    const ipfsHash = payload.sizes.master.hash
    state = state.mergeDeep({
      [payload.id]: {
        ipfsHash: ipfsHash,
        transcodingStatus: {
          name: 'success',
          data: {
            ipfsHash: ipfsHash,
            sizes: payload.sizes
          }
        }
      }
    })
    return state
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
  },
  [VIDEOFETCH_ERROR]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, error: Object }>
  ): VideoRecordMap => {
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
    return state.mergeDeep({
      [payload.id]: new VideoRecord(
        state.merge(payload, {
          fetchStatus: new AsyncTaskStatusRecord({ name: 'success' })
        })
      )
    })
  }
}

export default handleActions(reducer, Immutable.Map({}))
