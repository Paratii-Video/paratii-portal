/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class UserNavRecord extends ImmutableRecord({
  showUserNav: false
}) {
  showUserNav: boolean
}

export default UserNavRecord
