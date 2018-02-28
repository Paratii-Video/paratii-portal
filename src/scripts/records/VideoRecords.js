/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import { AsyncTaskStatusRecord } from 'records/AsyncTaskStatusRecord'

class Video extends ImmutableRecord({
  description: '',
  filename: null,
  filesize: null,
  duration: 0,
  id: '',
  ipfsHashOrig: '',
  ipfsHash: '',
  owner: '',
  price: '',
  thumbnails: [],
  title: '',
  author: '',
  free: '',
  published: null,
  storageStatus: new AsyncTaskStatusRecord(),
  transcodingStatus: new AsyncTaskStatusRecord(),
  uploadStatus: new AsyncTaskStatusRecord(),
  fetchStatus: new AsyncTaskStatusRecord()
}) {
  description: string
  filename: string
  filesize: string
  duration: string
  id: string
  ipfsHashOrig: string
  ipfsHash: string
  owner: string
  price: string
  thumbnails: [string]
  title: string
  author: string
  free: string
  published: boolean
  storageStatus: AsyncTaskStatusRecord
  transcodingStatus: AsyncTaskStatusRecord
  uploadStatus: AsyncTaskStatusRecord
  fetchStatus: AsyncTaskStatusRecord
}

export default Video
