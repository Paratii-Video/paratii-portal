/* @flow */

import { Record as ImmutableRecord } from 'immutable'

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

class Player extends ImmutableRecord({
  isPlaying: false,
  isAttemptingPlay: false,
  isFullscreen: false,
  selectedVideoId: '',
  currentTimeSeconds: 0,
  currentBufferedTimeSeconds: 0,
  currentVolume: 0
}) {
  isPlaying: boolean
  isAttemptingPlay: boolean
  isFullscreen: boolean
  selectedVideoId: ?string
  currentTimeSeconds: number
  currentBufferedTimeSeconds: number
  currentVolume: number
}

export default Player
