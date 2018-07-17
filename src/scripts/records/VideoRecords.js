/* @flow */

import { List as ImmutableList, Record as ImmutableRecord } from 'immutable'
import { AsyncTaskStatusRecord } from 'records/AsyncTaskStatusRecord'
import { StakingRecord } from 'records/StakingRecord'

class Video extends ImmutableRecord({
  description: '',
  filename: null,
  filesize: null,
  challengeExists: null,
  duration: '',
  id: '',
  ipfsHashOrig: '',
  ipfsHash: '',
  owner: '',
  ownershipProof: '',
  price: 0,
  thumbnails: ImmutableList(),
  title: '',
  author: '',
  free: '',
  staked: new StakingRecord(),
  whiteListed: null,
  vote: null,
  voteStatus: '',
  storageStatus: new AsyncTaskStatusRecord(),
  transcodingStatus: new AsyncTaskStatusRecord(),
  uploadStatus: new AsyncTaskStatusRecord(),
  fetchStatus: new AsyncTaskStatusRecord()
}) {
  challengeExists: boolean
  description: string
  filename: string
  filesize: ?number
  duration: string
  id: string
  ipfsHashOrig: string
  ipfsHash: string
  owner: string
  ownershipProof: string
  price: number
  thumbnails: ImmutableList<string>
  title: string
  author: string
  free: string
  staked: StakingRecord
  whiteListed: boolean
  challengeExists: boolean
  vote: number
  voteStatus: string
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
