export const getDefaultDataStatus = () => ({
  id: '',
  title: '',
  description: '',
  owner: '',
  ipfsHash: '',
  ipfsHashOrig: '',
  sizes: '',
  progress: '',
  error: ''
})

export const getDefaultAsyncTaskStatus = () => ({
  name: 'idle',
  data: getDefaultDataStatus()
})

export const getDefaultVideo = () => ({
  description: '',
  filename: null,
  filesize: null,
  id: '',
  ipfsData: '',
  ipfsHashOrig: '',
  ipfsHash: '',
  owner: '',
  price: '',
  thumbnailUrl: '',
  title: '',
  blockchainStatus: getDefaultAsyncTaskStatus(),
  transcodingStatus: getDefaultAsyncTaskStatus(),
  uploadStatus: getDefaultAsyncTaskStatus(),
  fetchStatus: getDefaultAsyncTaskStatus(),
  url: ''
})
