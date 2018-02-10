import { createAction } from 'redux-actions'

import { INITIALIZE } from 'constants/ActionConstants'
import { setupKeystore, loadBalances } from 'actions/UserActions'

export const initializeWithData = createAction(INITIALIZE)

export const initializeApp = () => (dispatch, getState) => {
  dispatch(setupKeystore())
  dispatch(loadBalances())
}
