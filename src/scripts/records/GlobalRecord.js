/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class GlobalRecord extends ImmutableRecord({
  context: ''
}) {
  context: string
}

export default GlobalRecord
