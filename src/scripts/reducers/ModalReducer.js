import { handleActions } from 'redux-actions'

import ModalRecord from 'records/ModalRecord'
import { OPEN_MODAL, CLOSE_MODAL } from 'constants/ActionConstants'

import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [OPEN_MODAL]: (state: ModalRecord, action: Action<boolean>) => {
    // content
    // type?
    // buttons?
    return state.set('showModal', true)
  },
  [CLOSE_MODAL]: (state: ModalRecord, action: Action<boolean>) => {
    return state.set('showModal', false)
  }
}

export default handleActions(reducer, new ModalRecord())
