/* @flow */

import { Map, Record as ImmutableRecord } from 'immutable'
import type { AsyncTaskStatusName } from 'types/ApplicationTypes'

class AsyncTaskStatus extends ImmutableRecord({
  name: 'idle',
  data: new Map()
}) {
  name: AsyncTaskStatusName;
  data: typeof Map
}
export default AsyncTaskStatus
