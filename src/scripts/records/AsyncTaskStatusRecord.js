/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import { AsyncTaskStatusName } from 'types/ApplicationTypes'

export class DataStatusRecord extends ImmutableRecord({
  id: '',
  title: '',
  description: '',
  owner: '',
  ipfsHash: '',
  ipfsHashOrig: '',
  result: '',
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
  result: Object
  progress: number
  error: string
}

export class AsyncTaskStatusRecord extends ImmutableRecord({
  name: 'idle',
  data: new DataStatusRecord()
}) {
  constructor (properties) {
    console.log(properties)
    if (!properties) {
      properties = {}
    }
    super({
      ...properties,
      name: properties.name,
      data: new DataStatusRecord(properties.data)
    })
  }
  name: AsyncTaskStatusName
  data: DataStatusRecord
}
