/* @flow */

import { createSelector } from 'reselect'
import TimeFormat from 'hh-mm-ss'

import {
  getVideos,
  getPlayerVideoId,
  getPlayerCurrentTimeSeconds
} from 'selectors/index'

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

export const getFormattedCurrentTime: (
  state: RootState
) => string = createSelector(
  [getPlayerCurrentTimeSeconds],
  (currentTimeSeconds: number): string => {
    const roundedTime: number = Math.floor(currentTimeSeconds)
    return TimeFormat.fromS(
      roundedTime,
      roundedTime >= 3600 ? 'hh:mm:ss' : 'mm:ss'
    )
  }
)

export const getFormattedDuration: (
  state: RootState
) => string = createSelector(
  [getPlayingVideo],
  (playingVideo: ?VideoRecord): string => {
    const rawDuration: number =
      (playingVideo && playingVideo.get('duration')) || 0
    const roundedDuration: number = Math.floor(rawDuration)
    return (
      (playingVideo &&
        TimeFormat.fromS(
          roundedDuration,
          roundedDuration >= 3600 ? 'hh:mm:ss' : 'mm:ss'
        )) ||
      ''
    )
  }
)
