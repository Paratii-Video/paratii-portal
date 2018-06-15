/* @flow */

import { Map, Record } from 'immutable'

class Tipping extends Record({
  tippedVideoIds: Map()
}) {
  tippedVideoIds: Map<string, boolean>
}

export default Tipping
