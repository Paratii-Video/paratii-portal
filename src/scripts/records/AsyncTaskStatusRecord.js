/* @flow */

import { Map, Record as ImmutableRecord } from 'immutable'
import type { AsyncTaskStatusName } from 'types/ApplicationTypes'

class AsyncTaskStatusRecord extends ImmutableRecord({
  name: 'idle',
  data: new Map()
}) {
  name: AsyncTaskStatusName;
  data: typeof Map
}
export default AsyncTaskStatusRecord
