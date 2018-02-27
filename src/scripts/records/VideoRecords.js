/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import { AsyncTaskStatusRecord } from 'records/AsyncTaskStatusRecord'

class Video extends ImmutableRecord({
  description: '',
  filename: null,
  filesize: null,
  duration: 0,
  id: '',
  ipfsData: '',
  ipfsHashOrig: '',
  ipfsHash: '',
  owner: '',
  price: '',
  thumbnailUrl: '',
  title: '',
  author: '',
  free: '',
  publish: '',
  storageStatus: new AsyncTaskStatusRecord(),
  transcodingStatus: new AsyncTaskStatusRecord(),
  uploadStatus: new AsyncTaskStatusRecord(),
  fetchStatus: new AsyncTaskStatusRecord(),
  url: ''
}) {
  description: string
  filename: string
  filesize: number
  duration: number
  id: string
  ipfsData: string
  ipfsHashOrig: string
  ipfsHash: string
  owner: string
  price: string
  thumbnailUrl: string
  title: string
  author: string
  free: string
  publish: string
  storageStatus: AsyncTaskStatusRecord
  transcodingStatus: AsyncTaskStatusRecord
  uploadStatus: AsyncTaskStatusRecord
  fetchStatus: AsyncTaskStatusRecord
  url: string
}

export default Video
