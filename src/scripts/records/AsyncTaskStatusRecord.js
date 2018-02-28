/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import { AsyncTaskStatusName } from 'types/ApplicationTypes'

export class ResultStatusRecord extends ImmutableRecord({
  root: '',
  duration: '',
  screenshots: []
}) {
  constructor (properties = {}) {
    super({
      root: properties.root,
      duration: properties.duration,
      screenshots: properties.screenshots
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
  constructor (properties = {}) {
    super({
      ...properties,
      result: new ResultStatusRecord(properties.result)
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
  constructor (properties = {}) {
    super({
      ...properties,
      data: new DataStatusRecord(properties.data)
    })
  }
  name: AsyncTaskStatusName
  data: DataStatusRecord
}
