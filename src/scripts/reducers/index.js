/* @flow */

import { combineReducers } from 'redux'
import global from 'reducers/GlobalReducer'
import modal from 'reducers/ModalReducer'
import player from 'reducers/PlayerReducer'
import { reducer as notifications } from 'react-notification-system-redux'
import uploader from 'reducers/UploaderReducer'
import user from 'reducers/UserReducer'
import videos from 'reducers/VideosReducer'
import search from 'reducers/SearchReducer'
import tipping from 'reducers/TippingReducer'
import userNav from 'reducers/UserNavReducer'
import videoManager from 'reducers/VideoManagerReducer'

export default combineReducers({
  global,
  uploader,
  user,
  videos,
  player,
  modal,
  notifications,
  search,
  tipping,
  userNav,
  videoManager
})
