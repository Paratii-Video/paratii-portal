/* @flow */

import { createAction } from 'redux-actions'

import { PLAYER_TOGGLE_PLAYPAUSE } from 'constants/ActionConstants'

export const togglePlayPause = createAction(PLAYER_TOGGLE_PLAYPAUSE)
