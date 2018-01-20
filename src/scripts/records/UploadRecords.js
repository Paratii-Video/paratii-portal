/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import type VideoInfoRecord from './VideoInfoRecords'
import AsyncTaskStatusRecord from './AsyncTaskStatusRecord'

class Upload extends ImmutableRecord({
  uploadStatus: new AsyncTaskStatusRecord(),
  videoInfo: {title: null, description: null},
  blockchainStatus: new AsyncTaskStatusRecord()
}) {
  uploadStatus: AsyncTaskStatusRecord;
  videoInfo: VideoInfoRecord;
  blockchainStatus: AsyncTaskStatusRecord;
}
export default Upload
