/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class Notification extends ImmutableRecord({
  title: '',
  message: '',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: '',
    callback: null
  }
}) {
  title: string
  message: string
  position: string
  autoDismiss: number
  action: {
    label: '',
    callback: () => void
  }
}

export default Notification
