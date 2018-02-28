
import { handleActions } from 'redux-actions'

import ModalRecord from 'records/ModalRecord'
import {
  OPEN_MODAL,
  CLOSE_MODAL
} from 'constants/ActionConstants'

import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [OPEN_MODAL]: (state: ModalRecord, action: Action<boolean>) => {
    // content
    // type?
    // buttons?
    console.log(state)
    return state.set('showModal', true)
  //   state.merge({
  //     isPlaying: action.payload || !state.get('isPlaying'),
  //     isAttemptingPlay: false
  }
  // [PLAYER_ATTEMPT_PLAY]: (staecote: PlayerRecord) =>
  //   state.set('isAttemptingPlay', true),
  // [PLAYER_VIDEO_SELECT]: (state: PlayerRecord, action: Action<string>) =>
  //   state.set('selectedVideoId', action.payload)
}

export default handleActions(reducer, new ModalRecord())
