/* @flow */

import { createAction } from 'redux-actions'

import { paratii } from 'utils/ParatiiLib'
import {
  VIDEO_SELECT,
  INIT_VIDEOSTORE,
  VIDEO_ERROR
} from 'constants/ActionConstants'
import VideoRecord from 'records/VideoRecords'

import type { Dispatch } from 'redux'

export const selectVideoAction = createAction(VIDEO_SELECT)
export const initVideoStore = createAction(INIT_VIDEOSTORE)
export const videoError = createAction(VIDEO_ERROR)

export const fetchVideo = (id: string) => async (dispatch: Dispatch<*>) => {
  let videoInfo
  // update the global state with the fetched information
  try {
    videoInfo = await paratii.eth.vids.get(id)

    // TODO: previous line should be replaced with next line once the db is updated
    // let videoInfo = await paratii.core.vids.get(id)
    dispatch(selectVideoAction(videoInfo))
    dispatch(initVideoStore(new VideoRecord(videoInfo)))
  } catch (error) {
    console.log(error)
    console.log(id)
    dispatch(videoError({ id: id, error: error }))
  }
  return videoInfo
}

export const setSelectedVideo = (id: string) => (dispatch: Dispatch<*>) => {
  dispatch(selectVideoAction({ id: id }))
}
