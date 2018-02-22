export const getDefaultDataStatus = () => ({
  id: '',
  title: '',
  description: '',
  owner: '',
  ipfsHash: '',
  ipfsHashOrig: '',
  sizes: '',
  progress: 0,
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
  duration: null,
  id: '',
  ipfsData: '',
  ipfsHashOrig: '',
  ipfsHash: '',
  owner: '',
  price: '',
  thumbnailUrl: '',
  title: '',
  storageStatus: getDefaultAsyncTaskStatus(),
  transcodingStatus: getDefaultAsyncTaskStatus(),
  uploadStatus: getDefaultAsyncTaskStatus(),
  fetchStatus: getDefaultAsyncTaskStatus(),
  url: ''
})
