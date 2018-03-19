/* @flow */

import { Record as ImmutableRecord } from 'immutable'

export class StakingRecord extends ImmutableRecord({
  id: '',
  deposit: ''
}) {
  id: string
  deposit: string

  constructor ({ ...rest }: Object = {}) {
    // console.log(id)
    super({
      ...rest
      // id: _id || ''
    })
  }
}
