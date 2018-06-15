/* @flow */

import { handleActions } from 'redux-actions'

import {
  TIP_VIDEO_COMPLETED,
  SET_USER_IS_TIPPING
} from 'constants/ActionConstants'
import Tipping from 'records/TippingRecords'

import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [TIP_VIDEO_COMPLETED]: (
    state: Tipping,
    action: Action<{ id: string }>
  ): Tipping => state.setIn(['tippedVideoIds', action.payload.id], true),
  [SET_USER_IS_TIPPING]: (
    state: Tipping,
    action: Action<{ isTipping: boolean }>
  ): Tipping => state.set('userIsTipping', action.payload.isTipping)
}

export default handleActions(reducer, new Tipping())
