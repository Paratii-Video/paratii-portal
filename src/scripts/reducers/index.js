/* @flow */

import { combineReducers } from 'redux'

import video from 'reducers/VideoReducer'
import user from 'reducers/UserReducer'
import uploads from 'reducers/UploadReducer'
import player from 'reducers/PlayerReducer'

export default combineReducers({
  selectedVideo: video,
  user,
  uploads,
  player
})
