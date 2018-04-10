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
  description: '',
  filename: null,
  filesize: null,
  duration: '',
  author: '',
  free: '',
  // published: null,
  id: '',
  ipfsHashOrig: '',
  ipfsHash: '',
  owner: '',
  price: 0,
  thumbnails: [],
  title: '',
  staked: getDefaultStakingStatus(),
  storageStatus: getDefaultAsyncTaskStatus(),
  transcodingStatus: getDefaultAsyncTaskStatus(),
  uploadStatus: getDefaultAsyncTaskStatus(),
  fetchStatus: getDefaultAsyncTaskStatus()
})
