import { handleActions } from 'redux-actions'

import GlobalRecord from 'records/GlobalRecord'
import { SET_CONTEXT } from 'constants/ActionConstants'

import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [SET_CONTEXT]: (state: GlobalRecord, action: Action<string>) => {
    return state.merge({
      context: action.payload
    })
  }
}

export default handleActions(reducer, new GlobalRecord())
