/* @flow */

import { createAction } from 'redux-actions'

import paratii from 'utils/ParatiiLib'
import {
  VIDEOFETCH_ERROR,
  VIDEOFETCH_SUCCESS,
  VIDEOS_FETCH_SUCCESS
} from 'constants/ActionConstants'
import { playerVideoSelect } from 'actions/PlayerActions'

import VideoRecord from 'records/VideoRecords'

import type { Dispatch } from 'redux'

export const videoFetchError = createAction(VIDEOFETCH_ERROR)
export const videoFetchSuccess = createAction(VIDEOFETCH_SUCCESS)
export const videosFetchSuccess = createAction(VIDEOS_FETCH_SUCCESS)

// fetch the video data from paratii-db and save it in the redux state
export const fetchVideo = (id: string) => async (dispatch: Dispatch<*>) => {
  let videoInfo
  try {
    videoInfo = await paratii.core.vids.get(id)

    console.log('videoInfo')
    console.log(videoInfo)

    if (videoInfo) {
      videoInfo.id = videoInfo._id
    }
    if (videoInfo && videoInfo.id) {
      const { duration, ...videoInfoToSave } = videoInfo
      dispatch(videoFetchSuccess(new VideoRecord(videoInfoToSave)))
      dispatch(playerVideoSelect(videoInfo.id))
    }
  } catch (error) {
    dispatch(videoFetchError(new VideoRecord({ id: id, error: error })))
  }
  return videoInfo
}

export const fetchOwnedVideos = () => async (dispatch: Dispatch<*>) => {
  const address: string = paratii.config.account.address
  const ownedVideos: Array<Object> = await paratii.core.vids.search({
    owner: address
  })
  dispatch(videosFetchSuccess(ownedVideos))
}
