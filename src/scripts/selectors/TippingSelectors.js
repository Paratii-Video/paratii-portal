/* @flow */

import { createSelector } from 'reselect'
import { Map } from 'immutable'

import {
  getPlayerCurrentTimeSeconds,
  getDoNotTipVideoIds
} from 'selectors/index'
import { getPlayingVideo } from 'selectors/PlayerSelectors'

import Video from 'records/VideoRecords'

import type { RootState } from 'types/ApplicationTypes'

export const askForTip: (state: RootState) => boolean = createSelector(
  [getPlayerCurrentTimeSeconds, getDoNotTipVideoIds, getPlayingVideo],
  (
    currentTimeSeconds: number,
    doNotTipVideoIds: Map<string, boolean>,
    video: Video
  ) => currentTimeSeconds > 3 && !doNotTipVideoIds.get(video.get('id'))
)
