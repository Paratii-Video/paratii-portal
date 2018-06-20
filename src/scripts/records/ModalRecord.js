/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class ModalRecord extends ImmutableRecord({
  name: '',
  previousModalName: '',
  modalProps: {},
  showModal: false
}) {
  name: string
  previousModalName: string
  modalProps: Object
  showModal: boolean
}

export default ModalRecord
