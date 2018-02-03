/* @flow */

import { combineReducers } from 'redux'

import selectedVideo from 'reducers/SelectedVideoReducer'
import user from 'reducers/UserReducer'
import player from 'reducers/PlayerReducer'
import videos from 'reducers/VideosReducer'

export default combineReducers({
  selectedVideo,
  user,
  videos,
  player
})
