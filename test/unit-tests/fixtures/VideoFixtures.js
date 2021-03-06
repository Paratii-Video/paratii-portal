export const getDefaultStakingStatus = () => ({
  id: '',
  deposit: ''
})

export const getDefaultResultStatus = () => ({
  root: '',
  duration: '',
  screenshots: []
})

export const getDefaultDataStatus = () => ({
  id: '',
  title: '',
  description: '',
  owner: '',
  ipfsHash: '',
  ipfsHashOrig: '',
  result: getDefaultResultStatus(),
  progress: 0,
  error: '',
  author: ''
})

export const getDefaultAsyncTaskStatus = () => ({
  name: 'idle',
  data: getDefaultDataStatus()
})

export const getDefaultTcrStatus = () => ({
  name: 'notInTcr',
  dummy: null,
  data: {
    challenge: {
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
    },
    staked: {
      id: null,
      deposit: '',
      appEndDate: null,
      blockNumber: null,
      applicant: null
    }
  }
})
export const getDefaultVideo = () => ({
  author: '',
  description: '',
  duration: '',
  fetchStatus: getDefaultAsyncTaskStatus(),
  filename: null,
  filesize: null,
  free: '',
  id: '',
  ipfsHashOrig: '',
  ipfsHash: '',
  owner: '',
  ownershipProof: '',
  price: 0,
  thumbnails: [],
  storageStatus: getDefaultAsyncTaskStatus(),
  tcrStatus: getDefaultTcrStatus(),
  title: '',
  transcodingStatus: getDefaultAsyncTaskStatus(),
  uploadStatus: getDefaultAsyncTaskStatus(),
  vote: null,
  voteStatus: {
    name: null,
    data: {
      numTokens: null,
      vote: null,
      voter: null
    }
  }
})
