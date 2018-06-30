/* @flow */

import { createAction } from 'redux-actions'

import { OPEN_USERNAV, CLOSE_USERNAV } from 'constants/ActionConstants'

export const openUserNav = createAction(OPEN_USERNAV)
export const closeUserNav = createAction(CLOSE_USERNAV)
