/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class ModalRecord extends ImmutableRecord({
  showUserNav: false
}) {
  showUserNav: boolean
}

export default ModalRecord
