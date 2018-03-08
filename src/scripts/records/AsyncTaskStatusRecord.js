/* @flow */

import { List as ImmutableList, Record as ImmutableRecord } from 'immutable'
import type { AsyncTaskStatusName } from 'types/ApplicationTypes'

export class ResultStatusRecord extends ImmutableRecord({
  root: '',
  duration: '',
  screenshots: ImmutableList()
}) {
  root: string
  duration: string
  screenshots: ImmutableList<string>

  constructor ({ screenshots, ...rest }: Object = {}) {
    super({
      ...rest,
      screenshots: ImmutableList(screenshots)
    })
  }
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

  constructor ({ result, ...rest }: Object = {}) {
    super({
      ...rest,
      result: new ResultStatusRecord(result)
    })
  }
}

export class AsyncTaskStatusRecord extends ImmutableRecord({
  name: 'idle',
  data: new DataStatusRecord()
}) {
  name: AsyncTaskStatusName
  data: DataStatusRecord

  constructor ({ data, ...rest }: Object = {}) {
    super({
      ...rest,
      data: new DataStatusRecord(data)
    })
  }
}
