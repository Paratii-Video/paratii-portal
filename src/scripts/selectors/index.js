/* @flow */

import Immutable from 'immutable'

import VideoRecord from 'records/VideoRecords'
import UserRecord, { _getWalletKey, _getMnemonicKey } from 'records/UserRecords'
import { _getIsPlaying, _getIsAttemptingPlay } from 'records/PlayerRecords'

import type { RootState } from 'types/ApplicationTypes'

/* Videos */
export const getVideo = (state: RootState): ?VideoRecord => {
  const videoId: ?string = state.selectedVideo
  const video = videoId && state.videos.get(videoId)
  return video || null
}

/* Users */
export const getUser = (state: RootState): UserRecord => state.user
export const getWalletKey = (state: RootState): string =>
  _getWalletKey(getUser(state))
export const getMnemonicKey = (state: RootState): string =>
  _getMnemonicKey(getUser(state))

export const getIsLoggingIn = (state: RootState): boolean =>
  !!(state.user && state.user.isLoggingIn)

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
