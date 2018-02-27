/* @flow */

import { Record as ImmutableRecord } from 'immutable'

export const _getIsPlaying = (state: Player): boolean => state.get('isPlaying')
export const _getIsAttemptingPlay = (state: Player): boolean =>
  state.get('isAttemptingPlay')
export const _getPlayerVideoId = (state: Player): string =>
  state.get('selectedVideoId')
export const _getPlayerCurrentTimeSeconds = (state: Player): number =>
  state.get('currentTimeSeconds')
export const _getPlayerCurrentBufferedTimeSeconds = (state: Player): number =>
  state.get('currentBufferedTimeSeconds')

class Player extends ImmutableRecord({
  isPlaying: false,
  isAttemptingPlay: false,
  selectedVideoId: '',
  currentTimeSeconds: 0,
  currentBufferedTimeSeconds: 0
}) {
  isPlaying: boolean
  isAttemptingPlay: boolean
  selectedVideoId: ?string
  currentTimeSeconds: number
  currentBufferedTimeSeconds: number
}

export default Player
