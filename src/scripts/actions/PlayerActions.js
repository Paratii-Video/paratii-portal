/* @flow */

import { createAction } from 'redux-actions'

import {
  PLAYER_TOGGLE_PLAYPAUSE,
  PLAYER_ATTEMPT_PLAY,
  PLAYER_VIDEO_SELECT,
  UPDATE_VIDEO_TIME,
  UPDATE_VIDEO_BUFFERED_TIME
} from 'constants/ActionConstants'

export const togglePlayPause = createAction(PLAYER_TOGGLE_PLAYPAUSE)
export const attemptPlay = createAction(PLAYER_ATTEMPT_PLAY)
export const playerVideoSelect = createAction(PLAYER_VIDEO_SELECT)
export const updateVideoTime = createAction(UPDATE_VIDEO_TIME)
export const updateVideoBufferedTime = createAction(UPDATE_VIDEO_BUFFERED_TIME)
