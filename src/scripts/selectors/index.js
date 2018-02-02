/* @flow */

import VideoRecord from 'records/VideoRecords'
import UserRecord from 'records/UserRecords'
import type { RootState } from 'types/ApplicationTypes'

/* Videos */
export const getVideo = (state: RootState): ?VideoRecord => {
  let videoId = state.selectedVideo
  let video = state.videos.get(videoId)
  return video
}

/* Users */
export const getUser = (state: RootState): ?UserRecord => state.user

export const getIsLoggingIn = (state: RootState): boolean =>
  !!(state.user && state.user.isLoggingIn)

export const getShouldKeepUrl = (state: RootState): boolean =>
  !!(state.user && state.user.keepUrl)

/* Upload */
// get the files to be shown in the upload manager
export const getUploads = (state: RootState): ?VideoRecord => {
  // we just return all videos, but in the future this will be a subset
  return state.videos
}
