/* @flow */

import { createAction } from 'redux-actions'

import { SEARCH_INPUT_CHANGED } from 'constants/ActionConstants'

export const searchInputChanged = createAction(SEARCH_INPUT_CHANGED)
