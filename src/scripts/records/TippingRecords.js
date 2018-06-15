/* @flow */

import { Map, Record } from 'immutable'

class Tipping extends Record({
  tippedVideoIds: Map()
}) {
  tippedVideoIds: Map<string, boolean>
}

export const _getTippedVideoIds = (state: Tipping): Map<string, boolean> =>
  state.get('tippedVideoIds')

export default Tipping
