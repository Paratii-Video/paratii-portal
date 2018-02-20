/* @flow */

import { createAction } from 'redux-actions'

import paratii from 'utils/ParatiiLib'
import { VIDEOFETCH_ERROR, VIDEOFETCH_SUCCESS } from 'constants/ActionConstants'
import { playerVideoSelect } from 'actions/PlayerActions'

import VideoRecord from 'records/VideoRecords'

import type { Dispatch } from 'redux'

export const videoFetchError = createAction(VIDEOFETCH_ERROR)
export const videoFetchSuccess = createAction(VIDEOFETCH_SUCCESS)

export const fetchVideo = (id: string) => async (dispatch: Dispatch<*>) => {
  let videoInfo
  try {
    if (process.env.NODE_ENV === 'development') {
      videoInfo = await paratii.eth.vids.get(id)
    } else {
      videoInfo = await paratii.core.vids.get(id)
    }
    dispatch(videoFetchSuccess(new VideoRecord(videoInfo)))
    dispatch(playerVideoSelect(videoInfo.id))
  } catch (error) {
    dispatch(videoFetchError({ id: id, error: error }))
  }
  return videoInfo
}
