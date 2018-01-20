/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import type { VideoInfo } from 'types/ApplicationTypes'
import AsyncTaskStatusRecord from './AsyncTaskStatusRecord'

class Upload extends ImmutableRecord({
  uploadStatus: new AsyncTaskStatusRecord(),
  videoInfo: {title: null, description: null},
  blockchainStatus: new AsyncTaskStatusRecord()
}) {
  uploadStatus: AsyncTaskStatusRecord;
  videoInfo: VideoInfo;
  blockchainStatus: AsyncTaskStatusRecord;
}
export default Upload
