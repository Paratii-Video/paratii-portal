/* @flow */

import { createAction } from 'redux-actions'

import { INITIALIZE } from 'constants/ActionConstants'
import { setupKeystore } from 'actions/UserActions'

import type { Dispatch } from 'redux'
import type { RootState } from 'types/ApplicationTypes'

export const initializeWithData = createAction(INITIALIZE)

export const initializeApp = () => (
  dispatch: Dispatch<*>,
  getState: RootState
): void => {
  dispatch(setupKeystore())
}
