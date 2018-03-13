/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class ModalRecord extends ImmutableRecord({
  modalContent: '',
  showModal: false
}) {
  modalContent: string
  showModal: boolean
}

export default ModalRecord
