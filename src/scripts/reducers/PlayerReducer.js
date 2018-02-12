/* @flow */

import { handleActions } from 'redux-actions'

import PlayerRecord from 'records/PlayerRecords'
import { PLAYER_TOGGLE_PLAYPAUSE } from 'constants/ActionConstants'

import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [PLAYER_TOGGLE_PLAYPAUSE]: (state: PlayerRecord, action: Action<boolean>) =>
    state.merge({
      isPlaying: action.payload || !state.get('isPlaying')
    })
}

export default handleActions(reducer, new PlayerRecord())
