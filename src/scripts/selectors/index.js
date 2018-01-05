/* @flow */

import VideoRecord from 'records/VideoRecords'
import UserRecord from 'records/UserRecords'

import type { RootState } from 'types/ApplicationTypes'

/* Videos */
export const getVideo = (state: RootState): ?VideoRecord => state.video

/* Users */
export const getUser = (state: RootState): ?UserRecord => state.user
export const isLoggingIn = (state: RootState): ?boolean => (state.user) ? state.user.isLoggingIn : false
