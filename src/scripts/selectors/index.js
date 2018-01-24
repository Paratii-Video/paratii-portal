/* @flow */

import VideoRecord from 'records/VideoRecords'
import UploadRecord from 'records/UploadRecords'
import UserRecord from 'records/UserRecords'
import type { RootState } from 'types/ApplicationTypes'

/* Videos */
export const getVideo = (state: RootState): ?VideoRecord => state.video

/* Users */
export const getUser = (state: RootState): ?UserRecord => state.user

export const getIsLoggingIn = (state: RootState): boolean => !!(state.user && state.user.isLoggingIn)

export const getShouldKeepUrl = (state: RootState): boolean => !!((state.user) && (state.user.keepUrl))

/* Upload */
export const getUpload = (state: RootState): ?UploadRecord => state.upload
