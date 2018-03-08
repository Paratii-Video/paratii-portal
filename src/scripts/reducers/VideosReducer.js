/* @flow */

import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import {
  UPLOAD_REQUESTED,
  UPLOAD_PROGRESS,
  UPLOAD_REMOTE_SUCCESS,
  UPLOAD_LOCAL_SUCCESS,
  UPDATE_VIDEO_TIME,
  UPDATE_VIDEO_INFO,
  VIDEO_DATA_START,
  VIDEO_DATA_SAVED,
  TRANSCODING_REQUESTED,
  TRANSCODING_PROGRESS,
  TRANSCODING_SUCCESS,
  TRANSCODING_FAILURE,
  VIDEOFETCH_ERROR,
  VIDEO_FETCH_SUCCESS,
  VIDEOS_FETCH_SUCCESS
} from 'constants/ActionConstants'
import VideoRecord from 'records/VideoRecords'
import { AsyncTaskStatusRecord } from 'records/AsyncTaskStatusRecord'
import type { Action, VideoRecordMap } from 'types/ApplicationTypes'

const reducer = {
  [UPLOAD_REQUESTED]: (
    state: VideoRecordMap,
    {
      payload
    }: Action<{
      id: string,
      filename: string,
      filesize: number,
      owner: string,
      author: string
    }>
  ): VideoRecordMap => {
    if (!payload || !payload.id) {
      return state
    }
    const videoRecord: VideoRecord = state.get(payload.id) || new VideoRecord()
    return state.set(
      payload.id,
      videoRecord.merge({
        filename: payload.filename,
        filesize: payload.filesize,
        uploadStatus: videoRecord.get('uploadStatus').merge({
          name: 'running'
          // data: videoRecord.getIn(['uploadStatus', 'data']).merge({
          //   progress: 0
          // })
        }),
        author: payload.author,
        owner: payload.owner
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
    return state.setIn(
      [payload.id, 'uploadStatus', 'data', 'progress'],
      payload.progress
    )
  },
  [UPLOAD_LOCAL_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, hash: string }> = {}
  ): VideoRecordMap => {
    if (!payload || !state.get(payload.id)) {
      throw Error(`Unknown id: ${(payload && payload.id) || 'undefined'}`)
    }
    const ipfsHashOrig = payload.hash
    return state.withMutations(
      (mutableState: VideoRecordMap): VideoRecordMap => {
        mutableState.setIn([payload.id, 'ipfsHashOrig'], ipfsHashOrig)
        mutableState.setIn(
          [payload.id, 'uploadStatus', 'name'],
          'uploaded to local node'
        )
        mutableState.setIn(
          [payload.id, 'uploadStatus', 'data', 'ipfsHashOrig'],
          ipfsHashOrig
        )
        return mutableState
      }
    )
  },
  [UPLOAD_REMOTE_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, hash: string }>
  ): VideoRecordMap => {
    if (!payload || !state.get(payload.id)) {
      throw Error(`Unknown id: ${(payload && payload.id) || 'undefined'}`)
    }
    const ipfsHashOrig = payload.hash
    return state.withMutations(
      (mutableState: VideoRecordMap): VideoRecordMap => {
        mutableState.setIn([payload.id, 'ipfsHashOrig'], ipfsHashOrig)
        mutableState.setIn([payload.id, 'uploadStatus', 'name'], 'success')
        mutableState.setIn(
          [payload.id, 'uploadStatus', 'data', 'ipfsHashOrig'],
          ipfsHashOrig
        )
        mutableState.setIn(
          [payload.id, 'uploadStatus', 'data', 'progress'],
          100
        )
        return mutableState
      }
    )
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
      [payload.id, 'storageStatus'],
      new AsyncTaskStatusRecord({
        name: 'running',
        data: {
          id: payload.id,
          title: payload.title,
          description: payload.description,
          author: payload.author,
          owner: payload.owner
        }
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
    return state
      .setIn(
        [payload.id, 'storageStatus'],
        new AsyncTaskStatusRecord({
          name: 'success',
          data: {
            id: payload.id,
            title: payload.title,
            description: payload.description,
            author: payload.author,
            owner: payload.owner,
            progress: 100
          }
        })
      )
      .setIn([payload.id, 'title'], payload.title)
      .setIn([payload.id, 'description'], payload.description)
      .setIn([payload.id, 'author'], payload.author)
      .setIn([payload.id, 'published'], payload.published)
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
        data: {}
      })
    )
  },
  [TRANSCODING_PROGRESS]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, progress: number }> = {}
  ): VideoRecordMap => {
    console.log('TRANSCODING_PROGRESS reducer')
    console.log(payload)
    if (!payload || !payload.id || !state.get(payload.id)) {
      return state
    }
    return state
      .setIn(
        [payload.id, 'transcodingStatus', 'data', 'progress'],
        payload.progress
      )
      .setIn([payload.id, 'transcodingStatus', 'name'], 'running')
  },
  [TRANSCODING_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<VideoRecord>
  ): VideoRecordMap => {
    if (!payload || !payload.id || !state.get(payload.id)) {
      return state
    }
    const ipfsHash =
      payload.result && payload.result.master && payload.result.master.hash

    if (!ipfsHash) {
      return state
    }
    return state
      .setIn([payload.id, 'ipfsHash'], ipfsHash)
      .setIn(
        [payload.id, 'transcodingStatus'],
        new AsyncTaskStatusRecord({
          name: 'success',
          data: {
            ipfsHash,
            result: payload.result,
            // result: Immutable.fromJS(payload.result),
            progress: 100
          }
        })
      )
      .setIn(
        [payload.id, 'thumbnails'],
        Immutable.List(payload.result.screenshots || [])
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
    return state.set(
      payload.id,
      new VideoRecord({
        fetchStatus: {
          name: 'failed',
          data: {
            error: (payload.error && payload.error.message) || ''
          }
        }
      })
    )
  },
  // VIDEO_FETCH_SUCCESS is called when fetching a single video from the db
  [VIDEO_FETCH_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<Object>
  ): VideoRecordMap => {
    if (!payload || !payload.id) {
      return state
    }
    let fetchedVideo = new VideoRecord(payload).merge({
      fetchStatus: new AsyncTaskStatusRecord({ name: 'success' })
    })

    fetchedVideo = fixOldVideoThumbnails(fetchedVideo, payload)
    return state.set(payload.id, fetchedVideo)
  },
  // VIDEOS_FETCH_SUCCESS is called when fetching a list of videos from the db
  [VIDEOS_FETCH_SUCCESS]: (
    state: VideoRecordMap,
    { payload }: Action<Array<Object>>
  ): VideoRecordMap =>
    state.merge(
      payload.reduce(
        (mergingVideos: Object, { _id, ...videoPayload }: Object): Object => {
          videoPayload.id = _id
          let fetchedVideo = new VideoRecord(videoPayload)
          fetchedVideo = fixOldVideoThumbnails(fetchedVideo, videoPayload)
          mergingVideos[_id] = fetchedVideo
          return mergingVideos
        },
        {}
      )
    ),
  [UPDATE_VIDEO_TIME]: (
    state: VideoRecordMap,
    { payload }: Action<{ id: string, duration: string }>
  ): VideoRecordMap => {
    if (!payload || !payload.id || !payload.duration) {
      return state
    }

    const video: ?VideoRecord = state.get(payload.id)

    if (!video) {
      return state
    }

    return state.set(payload.id, video.set('duration', payload.duration))
  }
}

export default handleActions(reducer, Immutable.Map({}))

// This is a functino to fix a legacy bug in which the thumbnails where not
// saved in  the "thumbnails" property, as they should
const fixOldVideoThumbnails = (video: VideoRecord, payload): VideoRecord => {
  if (video.get('thumbnails').size === 0) {
    return video.set(
      'thumbnails',
      Immutable.List(
        (payload.transcodingStatus &&
          payload.transcodingStatus.data.result &&
          payload.transcodingStatus.data.result.screenshots) ||
          []
      )
    )
  } else {
    return video
  }
}
