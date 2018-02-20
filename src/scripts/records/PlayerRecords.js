/* @flow */

import { Record as ImmutableRecord } from 'immutable'

export const _getIsPlaying = (state: Player): boolean => state.get('isPlaying')
export const _getIsAttemptingPlay = (state: Player): boolean =>
  state.get('isAttemptingPlay')
export const _getPlayerVideoId = (state: Player): string =>
  state.get('selectedVideoId')

class Player extends ImmutableRecord({
  isPlaying: false,
  isAttemptingPlay: false,
  selectedVideoId: ''
}) {
  isPlaying: boolean
  isAttemptingPlay: boolean
  selectedVideoId: ?string
}

export default Player
