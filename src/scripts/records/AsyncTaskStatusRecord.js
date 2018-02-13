/* @flow */

import Immutable from 'immutable'
import type { AsyncTaskStatusName } from 'types/ApplicationTypes'

class AsyncTaskStatusRecord extends Immutable.Record({
  name: 'idle',
  data: Immutable.Map({})
}) {
  name: AsyncTaskStatusName
  data: Immutable.Map<string, string | number>
}
export default AsyncTaskStatusRecord
