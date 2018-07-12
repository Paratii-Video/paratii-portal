/* @flow */

import { Map, Record } from 'immutable'

class Tipping extends Record({
  doNotTipVideoIds: Map(),
  userIsTipping: false
}) {
  doNotTipVideoIds: Map<string, boolean>
  userIsTipping: boolean
}

export const _getDoNotTipVideoIds = (state: Tipping): Map<string, boolean> =>
  state.get('doNotTipVideoIds')

export const _getUserIsTipping = (state: Tipping): boolean =>
  state.get('userIsTipping')

export default Tipping
