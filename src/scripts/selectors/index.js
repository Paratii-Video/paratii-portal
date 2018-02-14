/* @flow */

import Immutable from 'immutable'

import VideoRecord from 'records/VideoRecords'
import UserRecord, {
  Balances,
  _getWalletKey,
  _getMnemonicKey,
  _getLoginRequestStatus,
  _getBalances
} from 'records/UserRecords'
import { _getIsPlaying, _getIsAttemptingPlay } from 'records/PlayerRecords'

import type { RootState, RequestStatus } from 'types/ApplicationTypes'

/* Videos */
export const getVideo = (state: RootState): ?VideoRecord => {
  const videoId: ?string = state.selectedVideo
  const video = videoId && state.videos.get(videoId)
  console.log('selector', video)
  return video || null
}

/* Users */
export const getUser = (state: RootState): UserRecord => state.user
export const getWalletKey = (state: RootState): string =>
  _getWalletKey(getUser(state))
export const getMnemonicKey = (state: RootState): string =>
  _getMnemonicKey(getUser(state))
export const getBalances = (state: RootState): Balances =>
  _getBalances(getUser(state))

export const getLoginRequestStatus = (state: RootState): RequestStatus =>
  _getLoginRequestStatus(state.user)

export const getShouldKeepUrl = (state: RootState): boolean =>
  !!(state.user && state.user.keepUrl)

/* Player */
export const getIsPlaying = (state: RootState): boolean =>
  _getIsPlaying(state.player)
export const getIsAttemptingPlay = (state: RootState): boolean =>
  _getIsAttemptingPlay(state.player)

// get the files to be shown in the upload manager
export const getUploads = (
  state: RootState
): Immutable.Map<string, VideoRecord> => {
  // we just return all videos, but in the future this will be a subset
  return state.videos
}
