/* @flow */

import { createAction } from 'redux-actions'

import {
  PLAYER_TOGGLE_PLAYPAUSE,
  PLAYER_ATTEMPT_PLAY
} from 'constants/ActionConstants'

export const togglePlayPause = createAction(PLAYER_TOGGLE_PLAYPAUSE)

export const attemptPlay = createAction(PLAYER_ATTEMPT_PLAY)
