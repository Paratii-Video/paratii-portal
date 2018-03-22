/* @flow */

import { List as ImmutableList, Record as ImmutableRecord } from 'immutable'
import { AsyncTaskStatusRecord } from 'records/AsyncTaskStatusRecord'
import { StakingRecord } from 'records/StakingRecord'

class Video extends ImmutableRecord({
  description: '',
  filename: null,
  filesize: null,
  duration: '',
  id: '',
  ipfsHashOrig: '',
  ipfsHash: '',
  owner: '',
  price: '',
  thumbnails: ImmutableList(),
  title: '',
  author: '',
  free: '',
  // published: '',
  staked: new StakingRecord(),
  storageStatus: new AsyncTaskStatusRecord(),
  transcodingStatus: new AsyncTaskStatusRecord(),
  uploadStatus: new AsyncTaskStatusRecord(),
  fetchStatus: new AsyncTaskStatusRecord()
}) {
  description: string
  filename: string
  filesize: ?number
  duration: string
  id: string
  ipfsHashOrig: string
  ipfsHash: string
  owner: string
  price: string
  thumbnails: ImmutableList<string>
  title: string
  author: string
  free: string
  // published: string
  staked: StakingRecord
  storageStatus: AsyncTaskStatusRecord
  transcodingStatus: AsyncTaskStatusRecord
  uploadStatus: AsyncTaskStatusRecord
  fetchStatus: AsyncTaskStatusRecord

  constructor ({
    thumbnails,
    staked,
    storageStatus,
    transcodingStatus,
    uploadStatus,
    fetchStatus,
    ...rest
  }: Object = {}) {
    super({
      ...rest,
      thumbnails: ImmutableList(thumbnails),
      staked: new StakingRecord(staked),
      storageStatus: new AsyncTaskStatusRecord(storageStatus),
      transcodingStatus: new AsyncTaskStatusRecord(transcodingStatus),
      uploadStatus: new AsyncTaskStatusRecord(uploadStatus),
      fetchStatus: new AsyncTaskStatusRecord(fetchStatus)
    })
  }
}

export default Video
