/* @flow */

import { createSelector } from 'reselect'
import { Map } from 'immutable'

import {
  getDoNotTipVideoIds,
  getPlayerTotalTimeViewedSeconds
} from 'selectors/index'
import { getPlayingVideo } from 'selectors/PlayerSelectors'
import { getIsSecure } from 'selectors/UserSelectors'

import Video from 'records/VideoRecords'

import type { RootState } from 'types/ApplicationTypes'

export const askForTip: (state: RootState) => boolean = createSelector(
  [
    getIsSecure,
    getPlayerTotalTimeViewedSeconds,
    getDoNotTipVideoIds,
    getPlayingVideo
  ],
  (
    isSecure: boolean,
    totalTimeViewedSeconds: number,
    doNotTipVideoIds: Map<string, boolean>,
    video: Video
  ) =>
    isSecure &&
    totalTimeViewedSeconds > 3 &&
    !doNotTipVideoIds.get(video.get('id'))
)
