/* @flow */

import { List as ImmutableList, Record as ImmutableRecord } from 'immutable'
import {
  AsyncTaskStatusRecord,
  DataStatusRecord
} from 'records/AsyncTaskStatusRecord'

type TcrStatusName = 'notInTcr' | 'appWasMade'
type VoteStatusName = 'inCommit' | 'inReveal'

export class TcrStakedRecord extends ImmutableRecord({
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

export class TcrChallengeRecord extends ImmutableRecord({
  blockNumber: null,
  challenger: '',
  commitEndDate: null,
  commitStartDate: null,
  id: null,
  listingHash: '',
  revealEndDate: null,
  rewardPool: null,
  totalVotes: null,
  totalTokens: null,
  voteQuorum: null,
  votesAgainst: null,
  votesFor: null
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
  data: new TcrDataRecord(),
  dummy: null
}) {
  name: TcrStatusName
  data: DataStatusRecord
  dummy: number

  constructor ({ data, ...rest }: Object = {}) {
    super({
      ...rest,
      data: new TcrDataRecord(data)
    })
  }
}

export class VoteDataRecord extends ImmutableRecord({
  numTokens: null,
  vote: null,
  voter: null
}) {
  vote: number
  numTokens: number
  voter: string
}
export class VoteStatusRecord extends ImmutableRecord({
  name: null,
  data: new VoteDataRecord()
}) {
  name: VoteStatusName
  data: VoteDataRecord

  constructor ({ data, ...rest }: Object = {}) {
    super({
      ...rest,
      data: new VoteDataRecord(data)
    })
  }
}

export default class Video extends ImmutableRecord({
  author: '',
  description: '',
  duration: '',
  fetchStatus: new AsyncTaskStatusRecord(),
  filename: null,
  filesize: null,
  free: '',
  id: '',
  ipfsHashOrig: '',
  ipfsHash: '',
  owner: '',
  ownershipProof: '',
  price: 0,
  storageStatus: new AsyncTaskStatusRecord(),
  thumbnails: ImmutableList(),
  title: '',
  tcrStatus: new TcrStatusRecord(),
  transcodingStatus: new AsyncTaskStatusRecord(),
  uploadStatus: new AsyncTaskStatusRecord(),
  vote: null,
  voteStatus: new VoteStatusRecord()
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
  vote: VoteStatusRecord
  voteStatus: string
  storageStatus: AsyncTaskStatusRecord
  transcodingStatus: AsyncTaskStatusRecord
  uploadStatus: AsyncTaskStatusRecord
  fetchStatus: AsyncTaskStatusRecord

  constructor ({
    thumbnails,
    storageStatus,
    transcodingStatus,
    uploadStatus,
    fetchStatus,
    tcrStatus,
    ...rest
  }: Object = {}) {
    super({
      ...rest,
      thumbnails: ImmutableList(thumbnails),
      tcrStatus: new TcrStatusRecord(tcrStatus),
      voteStatus: new VoteStatusRecord(tcrStatus),
      storageStatus: new AsyncTaskStatusRecord(storageStatus),
      transcodingStatus: new AsyncTaskStatusRecord(transcodingStatus),
      uploadStatus: new AsyncTaskStatusRecord(uploadStatus),
      fetchStatus: new AsyncTaskStatusRecord(fetchStatus)
    })
  }
}
