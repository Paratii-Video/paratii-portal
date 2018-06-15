/* @flow */

import { createSelector } from 'reselect'
import { Map } from 'immutable'

import { getPlayerCurrentTimeSeconds, getTippedVideoIds } from 'selectors/index'
import { getPlayingVideo } from 'selectors/PlayerSelectors'

import Video from 'records/VideoRecords'

import type { RootState } from 'types/ApplicationTypes'

export const askForTip: (state: RootState) => boolean = createSelector(
  [getPlayerCurrentTimeSeconds, getTippedVideoIds, getPlayingVideo],
  (
    currentTimeSeconds: number,
    tippedVideoIds: Map<string, boolean>,
    video: Video
  ) => currentTimeSeconds > 3 && !tippedVideoIds.get(video.get('id'))
)
