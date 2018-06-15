/* @flow */

import { handleActions } from 'redux-actions'

import {
  ADD_DO_NOT_TIP_VIDEO,
  SET_USER_IS_TIPPING
} from 'constants/ActionConstants'
import Tipping from 'records/TippingRecords'

import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [ADD_DO_NOT_TIP_VIDEO]: (
    state: Tipping,
    action: Action<{ id: string }>
  ): Tipping => state.setIn(['doNotTipVideoIds', action.payload.id], true),
  [SET_USER_IS_TIPPING]: (
    state: Tipping,
    action: Action<{ isTipping: boolean }>
  ): Tipping => state.set('userIsTipping', action.payload.isTipping)
}

export default handleActions(reducer, new Tipping())
