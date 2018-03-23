/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class ModalRecord extends ImmutableRecord({
  modalContent: '',
  showModal: false,
  modalIsDisabled: false
}) {
  modalContent: string
  showModal: boolean
  modalIsDisabled: boolean
}

export default ModalRecord
