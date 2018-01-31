/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import VideoInfoRecord from './VideoInfoRecords'
import AsyncTaskStatusRecord from './AsyncTaskStatusRecord'

class Upload extends ImmutableRecord({
  filename: null,
  videoInfo: new VideoInfoRecord(),
  blockchainStatus: new AsyncTaskStatusRecord(),
  uploadStatus: new AsyncTaskStatusRecord(),
  transcodingStatus: new AsyncTaskStatusRecord()
}) {
  filename: string
  blockchainStatus: AsyncTaskStatusRecord
  uploadStatus: AsyncTaskStatusRecord
  transcodingStatus: AsyncTaskStatusRecord
  videoInfo: VideoInfoRecord
}
export default Upload
