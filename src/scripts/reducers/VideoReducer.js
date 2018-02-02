// /* @flow */
//
// import { handleActions } from 'redux-actions'
// import {
//   VIDEO_SELECT,
//   VIDEO_DATA_PROGRESS,
//   VIDEO_DATA_SAVED
// } from 'constants/ActionConstants'
// import VideoRecord from 'records/VideoRecords'
// import type { Action } from 'types/ApplicationTypes'
//
// const reducer = {
//   [VIDEO_SELECT]: (
//     state: VideoRecord,
//     { payload }: Action<{ id: string }>
//   ): VideoRecord => {
//     return new VideoRecord(payload)
//   },
//   [VIDEO_DATA_PROGRESS]: (
//     state: VideoRecord,
//     { payload }: Action<string>
//   ): VideoRecord => new VideoRecord(payload),
//   [VIDEO_DATA_SAVED]: (
//     state: VideoRecord,
//     { payload }: Action<string>
//   ): VideoRecord => new VideoRecord(payload)
// }
//
// export default handleActions(reducer, null)
