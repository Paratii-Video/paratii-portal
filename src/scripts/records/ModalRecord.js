/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class ModalRecord extends ImmutableRecord({
  modalContent: '',
  modalCallback: () => null,
  showModal: false
}) {
  modalContent: string
  modalCallback: () => any
  showModal: boolean
}

export default ModalRecord
