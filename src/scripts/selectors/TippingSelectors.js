/* @flow */

import { createSelector } from 'reselect'
import { Map } from 'immutable'
import ParatiiLib from 'utils/ParatiiLib'

import {
  getDoNotTipVideoIds,
  getPlayerTotalTimeViewedSeconds
} from 'selectors/index'
import { getPlayingVideo } from 'selectors/PlayerSelectors'
import { getPtiBalance } from 'selectors/UserSelectors'

import Video from 'records/VideoRecords'

import {
  MINIMUM_VIEWED_SECONDS_FOR_TIP_PROMPT,
  TIPPING_PTI_AMOUNTS
} from 'constants/TippingConstants'

import type { RootState } from 'types/ApplicationTypes'

const getTippingAmounts = (): Array<number> => TIPPING_PTI_AMOUNTS

const getSortedTippingAmounts: (
  state: RootState
) => Array<number> = createSelector(
  [getTippingAmounts],
  (amounts: Array<number>): Array<number> => amounts.sort()
)

const userHasEnoughPtiToTip: (state: RootState) => boolean = createSelector(
  [getSortedTippingAmounts, getPtiBalance],
  (amounts: Array<number>, ptiBalance: string) =>
    `${amounts[0]}` <= ParatiiLib.eth.web3.utils.fromWei(ptiBalance)
)

export const askForTip: (state: RootState) => boolean = createSelector(
  [
    getPlayerTotalTimeViewedSeconds,
    getDoNotTipVideoIds,
    getPlayingVideo,
    userHasEnoughPtiToTip
  ],
  (
    totalTimeViewedSeconds: number,
    doNotTipVideoIds: Map<string, boolean>,
    video: Video,
    userHasEnoughPtiToTip: boolean
  ) =>
    userHasEnoughPtiToTip &&
    totalTimeViewedSeconds > MINIMUM_VIEWED_SECONDS_FOR_TIP_PROMPT &&
    !doNotTipVideoIds.get(video.get('id'))
)