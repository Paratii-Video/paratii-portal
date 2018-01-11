/* @flow */

import { combineReducers } from 'redux'

import video from 'reducers/VideoReducer'
import user from 'reducers/UserReducer'

export default combineReducers({
  video,
  user
})
