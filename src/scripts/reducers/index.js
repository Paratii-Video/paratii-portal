/* @flow */

import { combineReducers } from 'redux'

import modal from 'reducers/ModalReducer'
import player from 'reducers/PlayerReducer'
import uploader from 'reducers/UploaderReducer'
import user from 'reducers/UserReducer'
import videos from 'reducers/VideosReducer'

export default combineReducers({
  uploader,
  user,
  videos,
  player,
  modal
})
