/* @flow */

import { createAction } from 'redux-actions'

import { OPEN_MODAL, CLOSE_MODAL } from 'constants/ActionConstants'

export const openModal = createAction(OPEN_MODAL, (modalName, modalProps) => {
  modalProps = modalProps || {}
  return {
    modalName,
    modalProps
  }
})
export const closeModal = createAction(CLOSE_MODAL)
