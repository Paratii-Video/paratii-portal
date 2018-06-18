/* @flow */

import { createSelector } from 'reselect'
import { Map } from 'immutable'

import {
  getDoNotTipVideoIds,
  getPlayerTotalTimeViewedSeconds
} from 'selectors/index'
import { getPlayingVideo } from 'selectors/PlayerSelectors'

import Video from 'records/VideoRecords'

import { MINIMUM_VIEWED_SECONDS_FOR_TIP_PROMPT } from 'constants/TippingConstants'

import type { RootState } from 'types/ApplicationTypes'

export const askForTip: (state: RootState) => boolean = createSelector(
  [getPlayerTotalTimeViewedSeconds, getDoNotTipVideoIds, getPlayingVideo],
  (
    totalTimeViewedSeconds: number,
    doNotTipVideoIds: Map<string, boolean>,
    video: Video
  ) =>
    totalTimeViewedSeconds > MINIMUM_VIEWED_SECONDS_FOR_TIP_PROMPT &&
    !doNotTipVideoIds.get(video.get('id'))
)
