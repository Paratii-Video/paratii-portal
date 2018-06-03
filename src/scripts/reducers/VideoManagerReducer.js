/* @flow */

import { handleActions } from 'redux-actions'

import { REQUEST_STATUS } from 'constants/ApplicationConstants'
import VideoManager from 'records/VideoManagerRecords'
import { setVideoRequestStatus } from 'operators/VideoManagerOperators'

import {
  VIDEOS_FETCH_REQUESTED,
  VIDEOS_FETCH_FAILED,
  VIDEOS_FETCH_SUCCESS
} from 'constants/ActionConstants'

const reducer = {
  [VIDEOS_FETCH_REQUESTED]: (state: VideoManager) =>
    setVideoRequestStatus(REQUEST_STATUS.PENDING, state),
  [VIDEOS_FETCH_FAILED]: (state: VideoManager) =>
    setVideoRequestStatus(REQUEST_STATUS.FAILED, state),
  [VIDEOS_FETCH_SUCCESS]: (state: VideoManager) =>
    setVideoRequestStatus(REQUEST_STATUS.SUCCEEDED, state)
}

export default handleActions(reducer, new VideoManager())
