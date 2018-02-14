/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import { AsyncTaskStatusRecord } from 'records/AsyncTaskStatusRecord'

class Video
  extends ImmutableRecord({
    description: '',
    filename: null,
    id: '',
    ipfsData: '',
    ipfsHashOrig: '',
    ipfsHash: '',
    owner: '',
    price: '',
    thumbnailUrl: '',
    title: '',
    blockchainStatus: new AsyncTaskStatusRecord(),
    transcodingStatus: new AsyncTaskStatusRecord(),
    uploadStatus: new AsyncTaskStatusRecord(),
    fetchStatus: new AsyncTaskStatusRecord(),
    url: ''
  }) {
  description: string
  filename: string
  id: string
  ipfsData: string
  ipfsHashOrig: string
  ipfsHash: string
  owner: string
  price: string
  thumbnailUrl: string
  title: string
  blockchainStatus: AsyncTaskStatusRecord
  transcodingStatus: AsyncTaskStatusRecord
  uploadStatus: AsyncTaskStatusRecord
  fetchStatus: AsyncTaskStatusRecord
  url: string
}

export default Video
