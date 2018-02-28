/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class ModalRecord extends ImmutableRecord({
  modalContent: {},
  showModal: false
}) {
  modalContent: Object
  showModal: boolean
}

export default ModalRecord
