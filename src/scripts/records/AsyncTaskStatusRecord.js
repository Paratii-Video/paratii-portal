/* @flow */

import { List as ImmutableList, Record as ImmutableRecord } from 'immutable'
import type { AsyncTaskStatusName } from 'types/ApplicationTypes'

export class ResultStatusRecord extends ImmutableRecord({
  root: '',
  duration: '',
  screenshots: ImmutableList()
}) {
  root: string
  duration: string
  screenshots: ImmutableList<string>

  constructor ({ screenshots, ...rest }: Object = {}) {
    super({
      ...rest,
      screenshots: ImmutableList(screenshots)
    })
  }
}

export class DataStatusRecord extends ImmutableRecord({
  id: '',
  title: '',
  description: '',
  owner: '',
  ipfsHash: '',
  ipfsHashOrig: '',
  result: new ResultStatusRecord(),
  progress: 0,
  error: '',
  author: ''
}) {
  id: number
  author: string
  title: string
  description: string
  owner: string
  ipfsHash: string
  ipfsHashOrig: string
  result: ResultStatusRecord
  progress: number
  error: string

  constructor ({ result, ...rest }: Object = {}) {
    super({
      ...rest,
      result: new ResultStatusRecord(result)
    })
  }
}

export class AsyncTaskStatusRecord extends ImmutableRecord({
  name: 'idle',
  data: new DataStatusRecord()
}) {
  name: AsyncTaskStatusName
  data: DataStatusRecord

  constructor ({ data, ...rest }: Object = {}) {
    super({
      ...rest,
      data: new DataStatusRecord(data)
    })
  }
}

export type TcrStatusName = 'notInTcr' | 'appWasMade'

class TcrDataStakedRecord extends ImmutableRecord({
  id: null,
  deposit: '',
  appEndDate: null,
  blockNumber: null,
  applicant: null
  //   "_id":"0x6dc38d8e8609f4de580b2b9b38a2e519004e78602715ad7fca73dc8d3446f02e",
  // "deposit":"10000000000000000000",
  // "appEndDate":"1532011049",
  // "blockNumber":10405,
  // "data":null,
  // "applicant":"0x9e2d04eef5b16CFfB4328Ddd027B55736407B275"
}) {
  id: string
  deposit: string
  appEndDate: number
  blockNumber: number
  applicant: string
}
class TcrDataChallengeRecord extends ImmutableRecord({
  // "__v":0,

  // "voteQuorum":50,
  // "blockNumber":10406,
  // "challenger":"0x9e2d04eef5b16CFfB4328Ddd027B55736407B275",
  // "commitEndDate":1532011070,
  // "commitStartDate":1532011045,
  // "data":"",
  // "listingHash":"0x6dc38d8e8609f4de580b2b9b38a2e519004e78602715ad7fca73dc8d3446f02e",
  // "revealEndDate":1532011105,
  // "rewardPool":null,
  // "totalTokens":null,
  // "id":"1",
  // "votesFor":2,
  // "totalVotes":3,
  // "votesAgainst":1
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
  staked: new TcrDataStakedRecord(),
  challenge: new TcrDataChallengeRecord()
}) {
  staked: TcrDataStakedRecord
  challenge: TcrDataChallengeRecord
  constructor ({ staked, challenge, ...rest }: Object = {}) {
    super({
      ...rest,
      staked: new TcrDataStakedRecord(staked),
      challenge: new TcrDataChallengeRecord(challenge)
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
