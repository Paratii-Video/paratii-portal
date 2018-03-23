import { handleActions } from 'redux-actions'

import ModalRecord from 'records/ModalRecord'
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  DISABLE_MODAL
} from 'constants/ActionConstants'

import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [OPEN_MODAL]: (state: ModalRecord, action: Action<string>) => {
    return state.merge({
      modalContent: action.payload,
      showModal: true
    })
  },
  [CLOSE_MODAL]: (state: ModalRecord, action: Action<boolean>) => {
    return state.merge({
      showModal: !!state.modalIsDisabled
    })
  },
  [DISABLE_MODAL]: (state: ModalRecord, action: Action<boolean>) => {
    return state.merge({
      modalIsDisabled: action.payload
    })
  }
}

export default handleActions(reducer, new ModalRecord())
