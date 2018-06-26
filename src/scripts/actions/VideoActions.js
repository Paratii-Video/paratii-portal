/* @flow */

import { createAction } from 'redux-actions'
import type { Dispatch } from 'redux'

import paratii from 'utils/ParatiiLib'
import {
  VIDEOFETCH_ERROR,
  VIDEO_FETCH_SUCCESS,
  VIDEOS_FETCH_REQUESTED,
  VIDEOS_FETCH_FAILED,
  VIDEOS_FETCH_SUCCESS,
  VIDEO_FETCH_WHITELIST
} from 'constants/ActionConstants'
import { playerVideoSelect } from 'actions/PlayerActions'
import { transcodeVideo } from 'actions/UploaderActions'

import VideoRecord from 'records/VideoRecords'
import type { RootState } from 'types/ApplicationTypes'

import Notifications from 'react-notification-system-redux'

export const videoFetchError = createAction(VIDEOFETCH_ERROR)
export const videoFetchSuccess = createAction(VIDEO_FETCH_SUCCESS)

export const videosFetchRequested = createAction(VIDEOS_FETCH_REQUESTED)
export const videosFetchFailed = createAction(VIDEOS_FETCH_FAILED)
export const videosFetchSuccess = createAction(VIDEOS_FETCH_SUCCESS)

export const videoWhitelisted = createAction(VIDEO_FETCH_WHITELIST)

// fetch the video data from paratii-db and save it in the redux state
export const fetchVideo = (id: string) => async (dispatch: Dispatch<*>) => {
  let videoInfo
  try {
    videoInfo = await paratii.vids.get(id)

    if (!videoInfo) {
      dispatch(videoFetchError(new VideoRecord({ id: id, error: 'failed' })))
    }
    if (videoInfo && videoInfo.id) {
      dispatch(videoFetchSuccess(videoInfo))
      dispatch(playerVideoSelect(videoInfo.id))

      // FIXME this infos will be in videoInfo when the db will be listen to TCR events
      const whiteListed = await paratii.eth.tcr.isWhitelisted(id)
      dispatch(
        videoWhitelisted(new VideoRecord({ id: id, whiteListed: whiteListed }))
      )
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
  const address: string = paratii.eth.getAccount()
  dispatch(videosFetchRequested())

  try {
    const ownedVideos: Object = (await paratii.vids.search({
      owner: address
    })).results
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
          console.log('Restarting to transcode' + video.id)
          dispatch(
            Notifications.success({
              title: 'Transcoding',
              message: 'We are transcoding video ' + video.id
            })
          )
          transcodeVideo({
            id: video.id,
            hash: video.ipfsHashOrig,
            size: video.filesize
          })(dispatch, getState)
        }
      }
    }
    dispatch(videosFetchSuccess(filteredOwnedVideos))
  } catch (e) {
    dispatch(videosFetchFailed())
  }
}
