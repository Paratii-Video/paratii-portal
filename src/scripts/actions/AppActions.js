import { createAction } from 'redux-actions'

import { INITIALIZE, SET_CONTEXT } from 'constants/ActionConstants'
import { setupKeystore, setAddressAndBalance } from 'actions/UserActions'

export const initializeWithData = createAction(INITIALIZE)

export const initializeApp = () => (dispatch, getState) => {
  dispatch(setupKeystore())
  dispatch(setAddressAndBalance())
}

export const setContext = createAction(SET_CONTEXT)
