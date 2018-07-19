/* @flow */

import { createSelector } from 'reselect'

import { getVideos, getPlayerVideoId } from 'selectors/index'
import VideoRecord from 'records/VideoRecords'

import type { RootState, VideoRecordMap } from 'types/ApplicationTypes'

export const isVideoWhiteListed: (
  state: RootState
) => ?VideoRecord = createSelector(
  [getVideos, getPlayerVideoId],
  (videos: VideoRecordMap, playerVideoId: string) => {
    if (playerVideoId) {
      const playerVideo: ?VideoRecord = videos.get(playerVideoId)
      if (playerVideo) {
        return (
          playerVideo.getIn(['tcrStatus', 'data', 'staked', 'deposit']) !== ''
        )
      }
    }
    return null
  }
)

export const videoChallengeExists: (
  state: RootState
) => ?VideoRecord = createSelector(
  [getVideos, getPlayerVideoId],
  (videos: VideoRecordMap, playerVideoId: string) => {
    if (playerVideoId) {
      const playerVideo: ?VideoRecord = videos.get(playerVideoId)
      if (playerVideo) {
        return playerVideo.get('challengeExists')
      }
    }
    return null
  }
)
