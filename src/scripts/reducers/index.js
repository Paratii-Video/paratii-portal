/* @flow */

import { combineReducers } from 'redux'

import video from 'reducers/VideoReducer'
import user from 'reducers/UserReducer'
import upload from 'reducers/UploadReducer'

export default combineReducers({
  video,
  user,
  upload
})
