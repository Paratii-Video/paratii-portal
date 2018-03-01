/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import { type AsyncTaskStatusName } from 'types/ApplicationTypes'

export class ResultStatusRecord extends ImmutableRecord({
  root: '',
  duration: '',
  screenshots: []
}) {
  constructor (properties) {
    super({
      root: properties ? properties.root : '',
      duration: properties ? properties.duration : '',
      screenshots: properties ? properties.screenshots : []
    })
  }
  root: string
  duration: string
  screenshots: Array
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
  constructor (properties) {
    super({
      ...properties,
      result: properties
        ? new ResultStatusRecord(properties.result)
        : new ResultStatusRecord()
    })
  }
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
  constructor (properties) {
    super({
      name: properties ? properties.name : 'idle',
      data: properties
        ? new DataStatusRecord(properties.data)
        : new DataStatusRecord()
    })
  }
  name: AsyncTaskStatusName
  data: DataStatusRecord
}
