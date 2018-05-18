/* @flow */

import { List as ImmutableList } from 'immutable'

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
  _getIsFullscreen,
  _getPlayerVideoId,
  _getPlayerCurrentTimeSeconds,
  _getPlayerCurrentBufferedTimeSeconds,
  _getPlayerCurrentVolume,
  _getPlaybackLevels,
  _getCurrentPlaybackLevelId,
  _getActivePlugin,
  PlaybackLevel
} from 'records/PlayerRecords'
import { _getSelectedUploaderVideoId } from 'records/UploaderRecords'
import {
  _getCurrentSearchText,
  _getHasNext,
  _getLastSearchedForText,
  _getNextSearchOffset,
  _getSearchResults,
  _getSearchRequestStatus,
  _getAdditionalSearchRequestStatus
} from 'records/SearchRecords'
import Video from 'records/VideoRecords'

import type {
  RootState,
  RequestStatus,
  VideoRecordMap,
  PlayerPlugin
} from 'types/ApplicationTypes'

/* Global */
export const getContext = (state: RootState): string => state.global.context

/* Modal */
export const getModalStatus = (state: RootState): boolean =>
  state.modal.showModal
export const getModalContent = (state: RootState): string =>
  state.modal.modalContent
export const getPreviousModal = (state: RootState): string =>
  state.modal.previousModalContent

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
export const getIsFullscreen = (state: RootState): boolean =>
  _getIsFullscreen(state.player)
export const getPlayerVideoId = (state: RootState): string =>
  _getPlayerVideoId(state.player)
export const getPlayerCurrentTimeSeconds = (state: RootState): number =>
  _getPlayerCurrentTimeSeconds(state.player)
export const getPlayerCurrentBufferedTimeSeconds = (state: RootState): number =>
  _getPlayerCurrentBufferedTimeSeconds(state.player)
export const getPlayerCurrentVolume = (state: RootState): number =>
  _getPlayerCurrentVolume(state.player)
export const getPlaybackLevels = (
  state: RootState
): ImmutableList<PlaybackLevel> => _getPlaybackLevels(state.player)
export const getCurrentPlaybackLevelId = (state: RootState): number =>
  _getCurrentPlaybackLevelId(state.player)
export const getActivePlugin = (state: RootState): ?PlayerPlugin =>
  _getActivePlugin(state.player)

/* Videos */
export const getVideos = (state: RootState): VideoRecordMap => {
  return state.videos
}

/* Uploader */
export const getSelectedUploaderVideoId = (state: RootState): string =>
  _getSelectedUploaderVideoId(state.uploader)

/* Search */
export const getCurrentSearchText = (state: RootState): string =>
  _getCurrentSearchText(state.search)
export const getHasNext = (state: RootState): boolean =>
  _getHasNext(state.search)
export const getLastSearchedForText = (state: RootState): string =>
  _getLastSearchedForText(state.search)
export const getNextSearchOffset = (state: RootState): number =>
  _getNextSearchOffset(state.search)
export const getSearchResults = (state: RootState): ImmutableList<Video> =>
  _getSearchResults(state.search)
export const getSearchRequestStatus = (state: RootState): RequestStatus =>
  _getSearchRequestStatus(state.search)
export const getAdditionalSearchRequestStatus = (
  state: RootState
): RequestStatus => _getAdditionalSearchRequestStatus(state.search)

/* UserNav */
export const getUserNavStatus = (state: RootState): boolean =>
  state.userNav.showUserNav
