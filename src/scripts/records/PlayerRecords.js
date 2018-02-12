/* @flow */

import { Record as ImmutableRecord } from 'immutable'

export const _getIsPlaying = (state: Player): boolean => state.get('isPlaying')
export const _getIsAttemptingPlay = (state: Player): boolean =>
  state.get('isAttemptingPlay')

class Player extends ImmutableRecord({
  isPlaying: false
}) {
  isPlaying: boolean
}

export default Player
