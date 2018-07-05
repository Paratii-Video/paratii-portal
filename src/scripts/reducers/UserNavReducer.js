import { handleActions } from 'redux-actions'

import UserNavRecord from 'records/UserNavRecord'
import { OPEN_USERNAV, CLOSE_USERNAV } from 'constants/ActionConstants'

import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [OPEN_USERNAV]: (state: UserNavRecord, action: Action<string>) => {
    return state.merge({
      showUserNav: true
    })
  },
  [CLOSE_USERNAV]: (state: UserNavRecord, action: Action<boolean>) => {
    return state.merge({
      showUserNav: false
    })
  }
}

export default handleActions(reducer, new UserNavRecord())
