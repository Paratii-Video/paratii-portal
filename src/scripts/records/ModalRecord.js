/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class ModalRecord extends ImmutableRecord({
  modalContent: '',
  previousModalContent: '',
  showModal: false
}) {
  modalContent: string
  previousModalContent: string
  showModal: boolean
}

export default ModalRecord
