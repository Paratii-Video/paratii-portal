/* @flow */

import { handleActions } from 'redux-actions'
import {
  VIDEO_SELECT
  // VIDEO_DATA_PROGRESS,
  // VIDEO_DATA_SAVED
} from 'constants/ActionConstants'
// import VideoRecord from 'records/VideoRecords'
import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [VIDEO_SELECT]: (
    state: string,
    { payload }: Action<{ id: string }>
  ): string => {
    console.log('Setting selected video to:' + payload.id)
    return payload.id
    // return new VideoRecord(payload)
  }
  // ,
  // [VIDEO_DATA_PROGRESS]: (
  //   state: string,
  //   { payload }: Action<string>
  // ): string => {
  //   return payload.id
  //   // new VideoRecord(payload),
  // }
  // [VIDEO_DATA_SAVED]: (
  //   state: string,
  //   { payload }: Action<string>
  // ): VideoRecord => new VideoRecord(payload)
}

export default handleActions(reducer, null)
