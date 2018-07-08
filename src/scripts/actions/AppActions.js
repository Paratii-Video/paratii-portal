import { createAction } from 'redux-actions'

import { INITIALIZE, SET_CONTEXT } from 'constants/ActionConstants'
import { BALANCE_LOAD_INTERVAL_MS } from 'constants/UserConstants'
import {
  setupKeystore,
  setAddressAndBalance,
  loadBalancesOnInterval
} from 'actions/UserActions'

export const initializeWithData = createAction(INITIALIZE)

export const initializeApp = () => (dispatch, getState) => {
  dispatch(setupKeystore())
  dispatch(setAddressAndBalance())
  dispatch(loadBalancesOnInterval(BALANCE_LOAD_INTERVAL_MS))
}

export const setContext = createAction(SET_CONTEXT)
