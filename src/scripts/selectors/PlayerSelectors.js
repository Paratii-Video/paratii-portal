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
  (playingVideo: ?VideoRecord): string =>
    TimeFormat.fromS(
      TimeFormat.toS(
        (playingVideo && playingVideo.get('duration')) || '00:00:00.00',
        'hh:mm:ss.sss'
      ),
      'hh:mm:ss'
    )
)

export const getDurationSeconds: (state: RootState) => string = createSelector(
  [getPlayingVideo],
  (playingVideo: ?VideoRecord): number => {
    const duration: ?string = playingVideo && playingVideo.get('duration')

    if (!duration) {
      return 0
    }

    return TimeFormat.toS(duration)
  }
)
