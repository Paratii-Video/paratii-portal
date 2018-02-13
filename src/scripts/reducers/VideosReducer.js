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
import AsyncTaskStatusRecord from 'records/AsyncTaskStatusRecord'

import type { Action, VideoRecordMap } from 'types/ApplicationTypes'

const reducer = {
  [UPLOAD_REQUESTED]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, filename: string }>
  ): VideoRecordMap => {
    const videoUpload: ?VideoRecord = state.get(payload.id)
    if (!videoUpload) {
      return state
    }
    return state.mergeDeep({
      [payload.id]: new VideoRecord({
        filename: payload.filename,
        uploadStatus: new AsyncTaskStatusRecord({
          name: 'running',
          data: Immutable.Map({ progress: 0 })
        })
      })
    })
  },
  [UPLOAD_PROGRESS]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, progress: number }>
  ): VideoRecordMap => {
    if (!state.get(payload.id)) {
      throw Error(`Unknown id: ${payload.id}`) // TODO: move this to an action
    }
    return state.mergeDeep({
      [payload.id]: {
        uploadStatus: {
          data: Immutable.Map({ progress: payload.progress })
        }
      }
    })
  },
  [UPLOAD_LOCAL_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, hash: string }>
  ): VideoRecordMap => {
    if (!state.get(payload.id)) {
      throw Error(`Unknown id: ${payload.id}`) // TODO: move this to an action
    }
    const ipfsHashOrig = payload.hash
    state = state.set(
      `${payload.id}`,
      state.get(payload.id).merge({
        ipfsHashOrig: ipfsHashOrig,
        uploadStatus: new AsyncTaskStatusRecord({
          name: 'uploaded to local node',
          data: Immutable.Map({
            ipfsHashOrig: ipfsHashOrig
          })
        })
      })
    )
    return state
  },
  [UPLOAD_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, hash: string }>
  ): VideoRecordMap => {
    if (!state.get(payload.id)) {
      throw Error(`Unknown id: ${payload.id}`) // TODO: move this to an action
    }
    const ipfsHashOrig = payload.hash
    return state.mergeDeep({
      [payload.id]: {
        ipfsHashOrig: ipfsHashOrig,
        uploadStatus: new AsyncTaskStatusRecord({
          name: 'uploaded to transcoder node',
          data: Immutable.Map({
            ipfsHashOrig: ipfsHashOrig
          })
        })
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
  ): VideoRecordMap =>
    state.setIn(
      [payload.id, 'blockchainStatus'],
      new AsyncTaskStatusRecord({
        name: 'running',
        data: Immutable.Map({
          id: payload.id,
          title: payload.title,
          description: payload.description,
          owner: payload.owner
        })
      })
    ),
  [VIDEO_DATA_SAVED]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    state = state.setIn(
      [payload.id, 'blockchainStatus'],
      new AsyncTaskStatusRecord({
        name: 'success',
        data: Immutable.Map({
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
    return state.setIn(
      [payload.id, 'transcodingStatus'],
      new AsyncTaskStatusRecord({
        name: 'requested',
        data: Immutable.Map({})
      })
    )
  },
  [TRANSCODING_PROGRESS]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    return state.setIn(
      [payload.id, 'transcodingStatus'],
      new AsyncTaskStatusRecord({
        name: 'progress',
        data: Immutable.Map({})
      })
    )
  },
  [TRANSCODING_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, sizes: Object }>
  ): VideoRecordMap => {
    const ipfsHash = payload.sizes.master.hash
    state = state.mergeDeep({
      [payload.id]: {
        ipfsHash: ipfsHash,
        transcodingStatus: new AsyncTaskStatusRecord({
          name: 'success',
          data: Immutable.Map({
            ipfsHash: ipfsHash,
            sizes: payload.sizes
          })
        })
      }
    })
    return state
  },
  [TRANSCODING_FAILURE]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    return state.setIn(
      [payload.id, 'transcodingStatus'],
      new AsyncTaskStatusRecord({
        name: 'failed',
        data: Immutable.Map({})
      })
    )
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
    return state.setIn(
      [payload.id, 'fecthStatus'],
      new AsyncTaskStatusRecord({
        name: 'failed',
        data: Immutable.Map({
          error: payload.error.message
        })
      })
    )
  },
  [VIDEOFETCH_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap =>
    state.set(
      `${payload.id}`,
      new VideoRecord({
        ...payload,
        fecthStatus: new AsyncTaskStatusRecord({
          name: 'success',
          data: Immutable.Record({})
        })
      })
    )
}

export default handleActions(reducer, Immutable.Map({}))
