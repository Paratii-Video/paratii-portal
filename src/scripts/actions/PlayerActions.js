/* @flow */

import { createAction } from 'redux-actions'

import {
  PLAYER_TOGGLE_PLAYPAUSE,
  PLAYER_SET_FULLSCREEN,
  PLAYER_ATTEMPT_PLAY,
  PLAYER_VIDEO_SELECT,
  UPDATE_VIDEO_TIME,
  UPDATE_VIDEO_BUFFERED_TIME,
  PLAYER_UPDATE_VOLUME,
  PLAYBACK_LEVELS_LOADED,
  PLAYBACK_LEVEL_SET
} from 'constants/ActionConstants'

export const togglePlayPause = createAction(PLAYER_TOGGLE_PLAYPAUSE)
export const setFullscreen = createAction(PLAYER_SET_FULLSCREEN)
export const attemptPlay = createAction(PLAYER_ATTEMPT_PLAY)
export const playerVideoSelect = createAction(PLAYER_VIDEO_SELECT)
export const updateVideoTime = createAction(UPDATE_VIDEO_TIME)
export const updateVideoBufferedTime = createAction(UPDATE_VIDEO_BUFFERED_TIME)
export const updateVolume = createAction(PLAYER_UPDATE_VOLUME)
export const playbackLevelsLoaded = createAction(PLAYBACK_LEVELS_LOADED)
export const playbackLevelSet = createAction(PLAYBACK_LEVEL_SET)
