/* @flow */

import { combineReducers } from 'redux'

import uploader from 'reducers/UploaderReducer'
import user from 'reducers/UserReducer'
import player from 'reducers/PlayerReducer'
import videos from 'reducers/VideosReducer'

export default combineReducers({
  uploader,
  user,
  videos,
  player
})
