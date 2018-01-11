/* @flow */

import { handleActions } from 'redux-actions'

import type { Action } from 'types/ApplicationTypes'
import { LOGIN_REQUESTED, LOGIN_SUCCESS, LOGOUT } from 'constants/ActionConstants'
import UserRecord from 'records/UserRecords'

const reducer = {
  [LOGIN_REQUESTED]: (
    state: UserRecord
  ): UserRecord => {
    return state.merge({
      isLoggingIn: true,
      email: null,
      name: null
    })
  },
  [LOGIN_SUCCESS]: (
    state: UserRecord,
    { payload }: Action<{email: string}>
  ): UserRecord => {
    return state.merge({
      isLoggingIn: false,
      email: payload.email
    })
  },
  [LOGOUT]: (
    state: UserRecord
  ): UserRecord => {
    return state.merge({
      isLoggingIn: false,
      email: null,
      name: null,
      keepUrl: false
    })
  }
}

export default handleActions(reducer, UserRecord.fromCookies())
