/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import type VideoInfoRecord from './VideoInfoRecords'
import AsyncTaskStatusRecord from './AsyncTaskStatusRecord'

class Upload extends ImmutableRecord({
  filename: 'video_01.mp4',
  videoInfo: {title: null, description: null},
  blockchainStatus: new AsyncTaskStatusRecord(),
  uploadStatus: new AsyncTaskStatusRecord(),
  transcodingStatus: new AsyncTaskStatusRecord()
}) {
  filename: string;
  blockchainStatus: AsyncTaskStatusRecord;
  uploadStatus: AsyncTaskStatusRecord;
  transcodingStatus: AsyncTaskStatusRecord;
  videoInfo: VideoInfoRecord;
}
export default Upload
