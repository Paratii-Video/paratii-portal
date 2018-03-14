/* @flow */

import { handleActions } from 'redux-actions'
import { List as ImmutableList } from 'immutable'

import PlayerRecord, { PlaybackLevel } from 'records/PlayerRecords'
import {
  PLAYER_TOGGLE_PLAYPAUSE,
  PLAYER_SET_FULLSCREEN,
  PLAYER_ATTEMPT_PLAY,
  PLAYER_VIDEO_SELECT,
  UPDATE_VIDEO_TIME,
  UPDATE_VIDEO_BUFFERED_TIME,
  PLAYER_UPDATE_VOLUME,
  PLAYBACK_LEVELS_LOADED,
  PLAYBACK_LEVEL_SET,
  PLAYER_SET_ACTIVE_PLUGIN,
  PLAYER_RESET
} from 'constants/ActionConstants'

import type { Action, PlayerPlugin } from 'types/ApplicationTypes'

const reducer = {
  [PLAYER_TOGGLE_PLAYPAUSE]: (state: PlayerRecord, action: Action<boolean>) =>
    state.merge({
      isPlaying: action.payload || !state.get('isPlaying'),
      isAttemptingPlay: false
    }),
  [PLAYER_SET_FULLSCREEN]: (state: PlayerRecord, action: Action<boolean>) =>
    state.set('isFullscreen', action.payload),
  [PLAYER_ATTEMPT_PLAY]: (state: PlayerRecord) =>
    state.set('isAttemptingPlay', true),
  [PLAYER_VIDEO_SELECT]: (state: PlayerRecord, action: Action<string>) =>
    state.set('selectedVideoId', action.payload),
  [UPDATE_VIDEO_TIME]: (
    state: PlayerRecord,
    action: Action<{ time: number }>
  ): PlayerRecord => state.set('currentTimeSeconds', action.payload.time),
  [UPDATE_VIDEO_BUFFERED_TIME]: (
    state: PlayerRecord,
    action: Action<{ time: number }>
  ): PlayerRecord =>
    state.set('currentBufferedTimeSeconds', action.payload.time),
  [PLAYER_UPDATE_VOLUME]: (
    state: PlayerRecord,
    action: Action<number>
  ): PlayerRecord => state.set('currentVolume', action.payload),
  [PLAYBACK_LEVELS_LOADED]: (
    state: PlayerRecord,
    action: Action<Array<Object>>
  ): PlayerRecord =>
    state.set(
      'playbackLevels',
      ImmutableList(
        action.payload.map(
          (level: Object): PlaybackLevel => new PlaybackLevel(level)
        )
      )
    ),
  [PLAYBACK_LEVEL_SET]: (
    state: PlayerRecord,
    action: Action<number>
  ): PlayerRecord => state.set('currentPlaybackLevelId', action.payload),
  [PLAYER_SET_ACTIVE_PLUGIN]: (
    state: PlayerRecord,
    action: Action<?PlayerPlugin>
  ): PlayerRecord => state.set('activePlugin', action.payload),
  [PLAYER_RESET]: () => new PlayerRecord()
}

export default handleActions(reducer, new PlayerRecord())
