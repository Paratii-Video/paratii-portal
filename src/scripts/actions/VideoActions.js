/* @flow */

import { createAction } from 'redux-actions'

import paratii from 'utils/ParatiiLib'
import {
  VIDEO_SELECT,
  VIDEOFETCH_ERROR,
  VIDEOFETCH_SUCCESS
} from 'constants/ActionConstants'

import VideoRecord from 'records/VideoRecords'

import type { Dispatch } from 'redux'

export const selectVideoAction = createAction(VIDEO_SELECT)
export const videoFetchError = createAction(VIDEOFETCH_ERROR)
export const videoFetchSuccess = createAction(VIDEOFETCH_SUCCESS)

export const fetchVideo = (id: string) => async (dispatch: Dispatch<*>) => {
  let videoInfo
  // update the global state with the fetched information
  try {
    if (process.env.NODE_ENV === 'development') {
      videoInfo = await paratii.eth.vids.get(id)
    } else {
      videoInfo = await paratii.core.vids.get(id)
    }
    dispatch(selectVideoAction(new VideoRecord(videoInfo)))
    dispatch(videoFetchSuccess(new VideoRecord(videoInfo)))
  } catch (error) {
    dispatch(videoFetchError({ id: id, error: error }))
  }
  return videoInfo
}

export const setSelectedVideo = (id: string) => (dispatch: Dispatch<*>) => {
  dispatch(selectVideoAction({ id: id }))
}
