/* @flow */

import { createAction } from 'redux-actions'

import { paratii } from 'utils/ParatiiLib'
import {
  VIDEO_SELECT,
  INIT_VIDEOSTORE,
  VIDEOFECTH_ERROR,
  VIDEOFECTH_SUCCESS
} from 'constants/ActionConstants'
import VideoRecord from 'records/VideoRecords'

import type { Dispatch } from 'redux'

export const selectVideoAction = createAction(VIDEO_SELECT)
export const initVideoStore = createAction(INIT_VIDEOSTORE)
export const videoFetchError = createAction(VIDEOFECTH_ERROR)
export const videoFetchSuccess = createAction(VIDEOFECTH_SUCCESS)

export const fetchVideo = (id: string) => async (dispatch: Dispatch<*>) => {
  let videoInfo
  // update the global state with the fetched information
  try {
    videoInfo = await paratii.eth.vids.get(id)

    // TODO: previous line should be replaced with next line once the db is updated
    // let videoInfo = await paratii.core.vids.get(id)
    dispatch(selectVideoAction(videoInfo))
    dispatch(initVideoStore(new VideoRecord(videoInfo)))
    dispatch(videoFetchSuccess(videoInfo))
  } catch (error) {
    console.log(error)
    console.log(id)
    dispatch(videoFetchError({ id: id, error: error }))
  }
  return videoInfo
}

export const setSelectedVideo = (id: string) => (dispatch: Dispatch<*>) => {
  dispatch(selectVideoAction({ id: id }))
}
