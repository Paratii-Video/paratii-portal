/* @flow */

import { createSelector } from 'reselect'

import { getVideos, getPlayerVideoId } from 'selectors/index'

import type { RootState, VideoRecordMap } from 'types/ApplicationTypes'
import type VideoRecord from 'records/VideoRecords'

export const getPlayingVideo: (
  state: RootState
) => ?VideoRecord = createSelector(
  [getVideos, getPlayerVideoId],
  (videos: VideoRecordMap, playerVideoId: string) => {
    if (playerVideoId) {
      const playerVideo: ?VideoRecord = videos.get(playerVideoId)
      if (playerVideo) {
        return playerVideo
      }
    }

    return null
  }
)
