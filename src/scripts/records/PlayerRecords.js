/* @flow */

import { Record as ImmutableRecord } from 'immutable'

export const _getIsPlaying = (state: Player): boolean => state.get('isPlaying')
export const _getIsAttemptingPlay = (state: Player): boolean =>
  state.get('isAttemptingPlay')

class Player extends ImmutableRecord({
  isPlaying: false,
  isAttemptingPlay: false
}) {
  isPlaying: boolean
  isAttemptingPlay: boolean
}

export default Player
