/* @flow */

import { handleActions } from 'redux-actions'

import PlayerRecord from 'records/PlayerRecords'
import { PLAYER_TOGGLE_PLAYPAUSE } from 'constants/ActionConstants'

const reducer = {
  [PLAYER_TOGGLE_PLAYPAUSE]: (state: PlayerRecord) =>
    state.set('isPlaying', !state.get('isPlaying'))
}

export default handleActions(reducer, new PlayerRecord())
