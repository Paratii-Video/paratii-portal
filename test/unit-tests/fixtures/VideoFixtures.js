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

export const getDefaultVideo = () => ({
  author: '',
  challengeExists: null,
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
  staked: getDefaultStakingStatus(),
  storageStatus: getDefaultAsyncTaskStatus(),
  title: '',
  transcodingStatus: getDefaultAsyncTaskStatus(),
  uploadStatus: getDefaultAsyncTaskStatus(),
  vote: null,
  voteStatus: '',
  whiteListed: null
})
