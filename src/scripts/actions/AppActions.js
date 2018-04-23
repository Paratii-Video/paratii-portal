import { createAction } from 'redux-actions'

import { INITIALIZE, SET_CONTEXT } from 'constants/ActionConstants'
import { setupKeystore, setAddressAndBalance } from 'actions/UserActions'
import { fetchOwnedVideos } from 'actions/VideoActions'

export const initializeWithData = createAction(INITIALIZE)

export const initializeApp = () => (dispatch, getState) => {
  dispatch(setupKeystore())
  dispatch(setAddressAndBalance())
  dispatch(fetchOwnedVideos())
}

export const setContext = createAction(SET_CONTEXT)
