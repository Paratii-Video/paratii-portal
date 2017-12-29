/* @flow */

import { handleActions } from 'redux-actions'

import { VIDEO_DATA_LOADED } from 'constants/ActionConstants'
import VideoRecord from 'records/VideoRecords'

import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [VIDEO_DATA_LOADED]: (
    state: VideoRecord,
    { payload }: Action<string>
  ): VideoRecord => new VideoRecord(payload)
}

export default handleActions(reducer, null)
