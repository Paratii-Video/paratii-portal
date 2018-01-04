/* @flow */

import { handleActions } from 'redux-actions'

import { LOGIN_REQUESTED } from 'constants/ActionConstants'
import UserRecord from 'records/UserRecords'

const reducer = {
  [LOGIN_REQUESTED]: (
    state: UserRecord
  ): UserRecord => {
    console.log('statee:', state)
    return state.set('isLoggingIn', true)
  }
}

export default handleActions(reducer, new UserRecord())
