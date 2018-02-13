/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import type { AsyncTaskStatusName } from 'types/ApplicationTypes'

export class DataStatusRecord extends ImmutableRecord({
  id: '',
  title: '',
  description: '',
  owner: '',
  ipfsHash: '',
  sizes: '',
  error: ''
}) {
  id: number
  title: string
  description: string
  owner: string
  ipfsHash: string
  sizes: string
  error: string
}

export class AsyncTaskStatusRecord extends ImmutableRecord({
  name: 'idle',
  data: new DataStatusRecord()
}) {
  name: AsyncTaskStatusName
  data: DataStatusRecord
}
