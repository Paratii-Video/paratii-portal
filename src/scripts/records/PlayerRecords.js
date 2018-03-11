/* @flow */

import { List as ImmutableList, Record as ImmutableRecord } from 'immutable'

export class PlaybackLevel extends ImmutableRecord({
  id: 0,
  bitrate: 0,
  url: '',
  label: ''
}) {
  id: number
  bitrate: number
  url: string
  label: string
}

class Player extends ImmutableRecord({
  isPlaying: false,
  isAttemptingPlay: false,
  isFullscreen: false,
  selectedVideoId: '',
  currentTimeSeconds: 0,
  currentBufferedTimeSeconds: 0,
  currentVolume: 0,
  playbackLevels: ImmutableList(),
  currentPlaybackLevelId: -1
}) {
  isPlaying: boolean
  isAttemptingPlay: boolean
  isFullscreen: boolean
  selectedVideoId: ?string
  currentTimeSeconds: number
  currentBufferedTimeSeconds: number
  currentVolume: number
  availablePlaybackLevels: ImmutableList<PlaybackLevel>
  currentPlaybackLevelId: number
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
export const _getPlayerCurrentBufferedTimeSeconds = (state: Player): number =>
  state.get('currentBufferedTimeSeconds')
export const _getPlayerCurrentVolume = (state: Player): number =>
  state.get('currentVolume')
export const _getPlaybackLevels = (
  state: Player
): ImmutableList<PlaybackLevel> => state.get('playbackLevels')
export const _getCurrentPlaybackLevelId = (state: Player): number =>
  state.get('currentPlaybackLevelId')

export default Player
