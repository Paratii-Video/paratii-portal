/* @flow */

import { createSelector } from 'reselect'
import { Map } from 'immutable'

import {
  getPlayerCurrentTimeSeconds,
  getDoNotTipVideoIds
} from 'selectors/index'
import { getPlayingVideo } from 'selectors/PlayerSelectors'
import { getIsSecure } from 'selectors/UserSelectors'

import Video from 'records/VideoRecords'

import type { RootState } from 'types/ApplicationTypes'

export const askForTip: (state: RootState) => boolean = createSelector(
  [
    getIsSecure,
    getPlayerCurrentTimeSeconds,
    getDoNotTipVideoIds,
    getPlayingVideo
  ],
  (
    isSecure: boolean,
    currentTimeSeconds: number,
    doNotTipVideoIds: Map<string, boolean>,
    video: Video
  ) =>
    isSecure && currentTimeSeconds > 3 && !doNotTipVideoIds.get(video.get('id'))
)
