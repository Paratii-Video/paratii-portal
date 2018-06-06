import { handleActions } from 'redux-actions'

import ModalRecord from 'records/ModalRecord'
import { OPEN_MODAL, CLOSE_MODAL } from 'constants/ActionConstants'

import type { Action } from 'types/ApplicationTypes'
import type { ModalPayload } from 'types/ModalTypes'

const reducer = {
  [OPEN_MODAL]: (state: ModalRecord, action: Action<ModalPayload>) => {
    return state.withMutations((mutableState: ModalRecord) => {
      mutableState.merge({
        name: action.payload.modalName,
        previousModalName: state.get('name'),
        showModal: true
      })
      mutableState.set('modalProps', action.payload.modalProps)
    })
  },
  [CLOSE_MODAL]: (state: ModalRecord, action: Action<boolean>) => {
    return new ModalRecord({ showModal: false })
  }
}

export default handleActions(reducer, new ModalRecord())
