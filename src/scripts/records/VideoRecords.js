/* @flow */

import { List as ImmutableList, Record as ImmutableRecord } from 'immutable'
import {
  AsyncTaskStatusRecord,
  DataStatusRecord
} from 'records/AsyncTaskStatusRecord'

export type TcrStatusName = 'notInTcr' | 'appWasMade'

class TcrStakedRecord extends ImmutableRecord({
  id: null,
  deposit: '',
  appEndDate: null,
  blockNumber: null,
  applicant: null
}) {
  id: string
  deposit: string
  appEndDate: number
  blockNumber: number
  applicant: string
}

class TcrChallengeRecord extends ImmutableRecord({
  voteQuorum: null,
  blockNumber: null,
  challenger: '',
  commitEndDate: null,
  commitStartDate: null,
  listingHash: '',
  revealEndDate: null,
  rewardPool: null,
  totalTokens: null,
  id: null,
  votesFor: null,
  totalVotes: null,
  votesAgainst: null
}) {
  voteQuorum: number
  blockNumber: number
  challenger: string
  commitEndDate: number
  commitStartDate: number
  listingHash: string
  revealEndDate: number
  rewardPool: number
  totalTokens: number
  id: string
  votesFor: number
  totalVotes: number
  votesAgainst: number
}

export class TcrDataRecord extends ImmutableRecord({
  staked: new TcrStakedRecord(),
  challenge: new TcrChallengeRecord()
}) {
  staked: TcrStakedRecord
  challenge: TcrChallengeRecord
  constructor ({ staked, challenge, ...rest }: Object = {}) {
    super({
      ...rest,
      staked: new TcrStakedRecord(staked),
      challenge: new TcrChallengeRecord(challenge)
    })
  }
}

export class TcrStatusRecord extends ImmutableRecord({
  name: 'notInTcr',
  data: new TcrDataRecord()
}) {
  name: TcrStatusName
  data: DataStatusRecord

  constructor ({ data, ...rest }: Object = {}) {
    super({
      ...rest,
      data: new TcrDataRecord(data)
    })
  }
}

class Video extends ImmutableRecord({
  author: '',
  description: '',
  duration: '',
  filename: null,
  filesize: null,
  free: '',
  id: '',
  ipfsHashOrig: '',
  ipfsHash: '',
  owner: '',
  ownershipProof: '',
  price: 0,
  thumbnails: ImmutableList(),
  title: '',
  tcrStatus: new TcrStatusRecord(),
  vote: null,
  voteStatus: '',
  storageStatus: new AsyncTaskStatusRecord(),
  transcodingStatus: new AsyncTaskStatusRecord(),
  uploadStatus: new AsyncTaskStatusRecord(),
  fetchStatus: new AsyncTaskStatusRecord()
}) {
  // challengeExists: boolean
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
  tcrStatus: TcrStatusRecord
  // whiteListed: boolean
  // challengeExists: boolean
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
      tcrStatus: new TcrStatusRecord(staked),
      storageStatus: new AsyncTaskStatusRecord(storageStatus),
      transcodingStatus: new AsyncTaskStatusRecord(transcodingStatus),
      uploadStatus: new AsyncTaskStatusRecord(uploadStatus),
      fetchStatus: new AsyncTaskStatusRecord(fetchStatus)
    })
  }
}

export default Video
