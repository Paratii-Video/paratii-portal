/* @flow */

import VideoRecord from 'records/VideoRecords'
import UserRecord from 'records/UserRecords'
import type { RootState, UploadProgress } from 'types/ApplicationTypes'

/* Videos */
export const getVideo = (state: RootState): ?VideoRecord => state.video

/* Users */
export const getUser = (state: RootState): ?UserRecord => state.user

export const getIsLoggingIn = (state: RootState): boolean => !!(state.user && state.user.isLoggingIn)

export const getShouldKeepUrl = (state: RootState): boolean => !!((state.user) && (state.user.keepUrl))

/* Upload */
export const getProgress = (state: RootState): UploadProgress => state.upload.progress

export const getIsUploading = (state: RootState): boolean => state.upload.isUploading

export const getHasUploadInfo = (state: RootState): boolean => !!(state.upload.video)
