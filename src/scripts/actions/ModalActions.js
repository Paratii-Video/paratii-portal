/* @flow */

import { createAction } from 'redux-actions'

import {
  OPEN_MODAL
} from 'constants/ActionConstants'

export const openModal = createAction(OPEN_MODAL)
