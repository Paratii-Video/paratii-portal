/* @flow */

import { createAction } from 'redux-actions'
import type { Dispatch } from 'redux'

import paratii from 'utils/ParatiiLib'
import {
  VIDEOFETCH_ERROR,
  VIDEO_FETCH_SUCCESS,
  VIDEOS_FETCH_SUCCESS
} from 'constants/ActionConstants'
import { playerVideoSelect } from 'actions/PlayerActions'
import { transcodeVideo } from 'actions/UploaderActions'

import VideoRecord from 'records/VideoRecords'
import type { RootState } from 'types/ApplicationTypes'

import Notifications from 'react-notification-system-redux'

export const videoFetchError = createAction(VIDEOFETCH_ERROR)
export const videoFetchSuccess = createAction(VIDEO_FETCH_SUCCESS)
export const videosFetchSuccess = createAction(VIDEOS_FETCH_SUCCESS)

// fetch the video data from paratii-db and save it in the redux state
export const fetchVideo = (id: string) => async (dispatch: Dispatch<*>) => {
  console.log('FETCH VIDEO: ' + id)
  let videoInfo
  try {
    videoInfo = await paratii.core.vids.get(id)

    if (videoInfo) {
      videoInfo.id = videoInfo._id
    } else {
      dispatch(videoFetchError(new VideoRecord({ id: id, error: 'failed' })))
    }
    if (videoInfo && videoInfo.id) {
      dispatch(videoFetchSuccess(videoInfo))
      dispatch(playerVideoSelect(videoInfo.id))
    }
  } catch (error) {
    dispatch(videoFetchError(new VideoRecord({ id: id, error: error })))
  }
  return videoInfo
}

// fetch all videos owned by the current user from paratii-db
export const fetchOwnedVideos = () => async (
  dispatch: Dispatch<*>,
  getState: () => RootState
) => {
  const address: string = paratii.config.account.address
  const ownedVideos: Array<Object> = await paratii.core.vids.search({
    owner: address
  })
  const filteredOwnedVideos = []
  for (let i = 0; i < ownedVideos.length; i++) {
    const video = ownedVideos[i]
    // only show videos that have been uploaded
    // FIXME: use status codes or constants, not strings like 'success'
    if (
      video.transcodingStatus &&
      (video.uploadStatus.name === 'success' ||
        video.uploadStatus.name === 'uploaded to remote')
    ) {
      filteredOwnedVideos.push(video)
      if (
        video.transcodingStatus.name !== 'success' ||
        video.transcodingStatus.data.progress !== 100
      ) {
        console.log('Restarting to transcode' + video._id)
        dispatch(
          Notifications.success({
            title: 'Transcoding',
            message: 'We are transcoding video ' + video._id
          })
        )
        transcodeVideo({
          id: video._id,
          hash: video.ipfsHashOrig,
          size: video.filesize
        })(dispatch, getState)
      }
    }
  }
  dispatch(videosFetchSuccess(filteredOwnedVideos))
}
