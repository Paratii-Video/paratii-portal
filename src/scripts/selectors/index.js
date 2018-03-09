/* @flow */

import UserRecord, {
  Balances,
  _getWalletKey,
  _getMnemonicKey,
  _getLoginRequestStatus,
  _getBalances
} from 'records/UserRecords'
import {
  _getIsPlaying,
  _getIsAttemptingPlay,
  _getPlayerVideoId
} from 'records/PlayerRecords'
import { _getSelectedUploaderVideoId } from 'records/UploaderRecords'

import type {
  RootState,
  RequestStatus,
  VideoRecordMap
} from 'types/ApplicationTypes'

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
export const getPlayerVideoId = (state: RootState): string =>
  _getPlayerVideoId(state.player)

/* Videos */
export const getVideos = (state: RootState): VideoRecordMap => {
  return state.videos
}

/* Uploader */
export const getSelectedUploaderVideoId = (state: RootState): string =>
  _getSelectedUploaderVideoId(state.uploader)
