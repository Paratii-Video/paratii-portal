/* @flow */

import { handleActions } from 'redux-actions'

import { SEARCH_INPUT_CHANGED } from 'constants/ActionConstants'
import Search from 'records/SearchRecords'

import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [SEARCH_INPUT_CHANGED]: (state: Search, action: Action<{ value: string }>) =>
    state.set('currentSearchText', action.payload.value)
}

export default handleActions(reducer, new Search())
