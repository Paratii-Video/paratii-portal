/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class Notification extends ImmutableRecord({
  title: '',
  message: '',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: '',
    onPerformAction: null
  }
}) {
  title: string
  message: string
  position: string
  autoDismiss: number
  action: {
    label: '',
    onPerformAction: () => void
  }
}

export default Notification
