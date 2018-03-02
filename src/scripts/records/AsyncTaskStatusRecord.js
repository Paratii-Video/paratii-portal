/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import { type AsyncTaskStatusName } from 'types/ApplicationTypes'

export class ResultStatusRecord extends ImmutableRecord({
  root: '',
  duration: '',
  screenshots: []
}) {
  root: string
  duration: string
  screenshots: [string]
}

export class DataStatusRecord extends ImmutableRecord({
  id: '',
  title: '',
  description: '',
  owner: '',
  ipfsHash: '',
  ipfsHashOrig: '',
  result: new ResultStatusRecord(),
  progress: 0,
  error: '',
  author: ''
}) {
  id: number
  author: string
  title: string
  description: string
  owner: string
  ipfsHash: string
  ipfsHashOrig: string
  result: ResultStatusRecord
  progress: number
  error: string
}

export class AsyncTaskStatusRecord extends ImmutableRecord({
  name: 'idle',
  data: new DataStatusRecord()
}) {
  name: AsyncTaskStatusName
  data: DataStatusRecord
}
