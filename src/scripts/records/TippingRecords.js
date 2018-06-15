/* @flow */

import { Map, Record } from 'immutable'

class Tipping extends Record({
  userIsTipping: false,
  doNotTipVideoIds: Map()
}) {
  userIsTipping: boolean
  doNotTipVideoIds: Map<string, boolean>
}

export const _getDoNotTipVideoIds = (state: Tipping): Map<string, boolean> =>
  state.get('doNotTipVideoIds')

export const _getUserIsTipping = (state: Tipping): boolean =>
  state.get('userIsTipping')

export default Tipping
