/* @flow */

import { createAction } from 'redux-actions'

import { OPEN_MODAL, CLOSE_MODAL } from 'constants/ActionConstants'

export const openModal = createAction(OPEN_MODAL, (modal, modalProps) => ({
  modal,
  modalProps
}))
export const closeModal = createAction(CLOSE_MODAL)
