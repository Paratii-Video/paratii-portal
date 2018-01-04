/* @flow */

import VideoRecord from 'records/VideoRecords'

import type { RootState } from 'types/ApplicationTypes'

/* Videos */
export const getVideo = (state: RootState): ?VideoRecord => state.video

/* Users */
export const isLoggingIn = (state: RootState): ?boolean => (state.user) ? state.user.isLoggingIn : false
