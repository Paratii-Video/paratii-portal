/* @flow */

import { createSelector } from 'reselect'
import TimeFormat from 'hh-mm-ss'
import { List as ImmutableList } from 'immutable'

import {
  getVideos,
  getPlayerVideoId,
  getPlayerCurrentTimeSeconds,
  getPlaybackLevels,
  getCurrentPlaybackLevelId
} from 'selectors/index'

import type { RootState, VideoRecordMap } from 'types/ApplicationTypes'
import type VideoRecord, { PlaybackLevel } from 'records/VideoRecords'

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
    const roundedTime: number = Math.floor(
      TimeFormat.toS(
        (playingVideo && playingVideo.get('duration')) || '00:00:00.00',
        'hh:mm:ss.sss'
      )
    )

    return TimeFormat.fromS(
      roundedTime,
      roundedTime >= 3600 ? 'hh:mm:ss' : 'mm:ss'
    )
  }
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

export const getCurrentPlaybackLevel: (
  state: RootState
) => ?PlaybackLevel = createSelector(
  [getPlaybackLevels, getCurrentPlaybackLevelId],
  (
    levels: ImmutableList<PlaybackLevel>,
    currentLevelId: number
  ): ?PlaybackLevel =>
    levels.find(
      (level: PlaybackLevel): boolean => level.get('id') === currentLevelId
    )
)
