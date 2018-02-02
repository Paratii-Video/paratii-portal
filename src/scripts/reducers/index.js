/* @flow */

import { combineReducers } from 'redux'

import selectedVideo from 'reducers/SelectedVideoReducer'
import user from 'reducers/UserReducer'
import videos from 'reducers/VideosReducer'

export default combineReducers({
  selectedVideo: selectedVideo,
  user: user,
  videos: videos
})
