/* @flow */

import { createAction } from 'redux-actions'

import { paratii } from 'utils/ParatiiLib'
import { VIDEO_SELECT, INIT_VIDEOSTORE } from 'constants/ActionConstants'
import type { Dispatch } from 'redux'

export const selectVideoAction = createAction(VIDEO_SELECT)
export const initVideoStore = createAction(INIT_VIDEOSTORE)

export const fetchVideo = (id: string) => async (dispatch: Dispatch<*>) => {
  let videoInfo = await paratii.eth.vids.get(id)
  // TODO: previous line should be replaced with next line once the db is updated
  // let videoInfo = await paratii.core.vids.get(id)

  // update the global state with the fetched information
  dispatch(selectVideoAction(videoInfo))
  dispatch(initVideoStore(videoInfo))
  return videoInfo
}

export const setSelectedVideo = (id: string) => (dispatch: Dispatch<*>) => {
  dispatch(selectVideoAction({ id: id }))
}
