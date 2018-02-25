/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import type { AsyncTaskStatusName } from 'types/ApplicationTypes'

export class DataStatusRecord extends ImmutableRecord({
  id: '',
  title: '',
  description: '',
  owner: '',
  ipfsHash: '',
  ipfsHashOrig: '',
  sizes: '',
  progress: 0,
  error: '',
  author: ''
}) {
  id: number
  title: string
  description: string
  owner: string
  ipfsHash: string
  ipfsHashOrig: string
  sizes: string
  progress: number
  error: string
  author: string
}

export class AsyncTaskStatusRecord extends ImmutableRecord({
  name: 'idle',
  data: new DataStatusRecord()
}) {
  name: AsyncTaskStatusName
  data: DataStatusRecord
}
