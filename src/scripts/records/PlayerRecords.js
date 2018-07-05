/* @flow */

import { List as ImmutableList, Record as ImmutableRecord } from 'immutable'

import type { PlayerPlugin } from 'types/ApplicationTypes'

export class PlaybackLevel extends ImmutableRecord({
  id: 0,
  label: ''
}) {
  id: number
  label: string
}

class Player extends ImmutableRecord({
  isPlaying: false,
  isAttemptingPlay: false,
  isFullscreen: false,
  selectedVideoId: '',
  latestPlaybackTimestamp: 0,
  currentTimeSeconds: 0,
  totalTimeViewedSeconds: 0,
  currentBufferedTimeSeconds: 0,
  currentVolume: 0,
  playbackLevels: ImmutableList(),
  currentPlaybackLevelId: -1,
  activePlugin: null
}) {
  isPlaying: boolean
  isAttemptingPlay: boolean
  isFullscreen: boolean
  selectedVideoId: ?string
  latestPlaybackTimestamp: number
  currentTimeSeconds: number
  totalTimeViewedSeconds: number
  currentBufferedTimeSeconds: number
  currentVolume: number
  availablePlaybackLevels: ImmutableList<PlaybackLevel>
  currentPlaybackLevelId: number
  activePlugin: ?PlayerPlugin
}

export const _getIsPlaying = (state: Player): boolean => state.get('isPlaying')
export const _getIsAttemptingPlay = (state: Player): boolean =>
  state.get('isAttemptingPlay')
export const _getIsFullscreen = (state: Player): boolean =>
  state.get('isFullscreen')
export const _getPlayerVideoId = (state: Player): string =>
  state.get('selectedVideoId')
export const _getPlayerCurrentTimeSeconds = (state: Player): number =>
  state.get('currentTimeSeconds')
export const _getPlayerTotalTimeViewedSeconds = (state: Player): number =>
  state.get('totalTimeViewedSeconds')
export const _getPlayerCurrentBufferedTimeSeconds = (state: Player): number =>
  state.get('currentBufferedTimeSeconds')
export const _getPlayerCurrentVolume = (state: Player): number =>
  state.get('currentVolume')
export const _getPlaybackLevels = (
  state: Player
): ImmutableList<PlaybackLevel> => state.get('playbackLevels')
export const _getCurrentPlaybackLevelId = (state: Player): number =>
  state.get('currentPlaybackLevelId')
export const _getActivePlugin = (state: Player): ?PlayerPlugin =>
  state.get('activePlugin')

export default Player
