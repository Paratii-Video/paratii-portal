/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class ModalRecord extends ImmutableRecord({
  showUserNav: false
}) {
  showUserNav: Boolean
}

export default ModalRecord
