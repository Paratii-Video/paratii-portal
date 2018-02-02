/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import AsyncTaskStatusRecord from './AsyncTaskStatusRecord'

class Video extends ImmutableRecord({
  blockchainStatus: new AsyncTaskStatusRecord(),
  description: '',
  filename: null,
  id: '',
  ipfsData: '',
  ipfsHash: '',
  owner: '',
  price: '',
  thumbnailUrl: '',
  title: '',
  transcodingStatus: new AsyncTaskStatusRecord(),
  uploadStatus: new AsyncTaskStatusRecord(),
  url: ''
}) {
  blockchainStatus: AsyncTaskStatusRecord
  description: string
  filename: string
  id: string
  ipfsData: string
  ipfsHash: string
  owner: string
  price: string
  thumbnailUrl: string
  title: string
  transcodingStatus: AsyncTaskStatusRecord
  uploadStatus: AsyncTaskStatusRecord
  url: string
}

export default Video
