/* @flow */

import { handleActions } from 'redux-actions'

import { TIP_VIDEO_COMPLETED } from 'constants/ActionConstants'
import Tipping from 'records/TippingRecords'

import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [TIP_VIDEO_COMPLETED]: (
    state: Tipping,
    action: Action<{ id: string }>
  ): Tipping => state.setIn(['tippedVideoIds', action.payload.id], true)
}

export default handleActions(reducer, new Tipping())
