/* @flow */

import { createAction } from 'redux-actions'

import { paratii } from 'utils/ParatiiLib'
import { VIDEO_DATA_LOADED } from 'constants/ActionConstants'

import type { Dispatch } from 'redux'

export const videoDataLoaded = createAction(VIDEO_DATA_LOADED)

export const fetchVideo = (id: string) => async (dispatch: Dispatch<*>) => {
  let videoInfo = await paratii.eth.vids.get(id)
  // TODO: previous line should be replaced with next line once the db is updated
  // let videoInfo = await paratii.core.vids.get(id)
  dispatch(videoDataLoaded(videoInfo))
}

export const setSelectedVideo = (id: string) => (dispatch: Dispatch<*>) => {
  console.log(`set current video to ${id}`)
  dispatch(videoDataLoaded({ id: id }))
}
