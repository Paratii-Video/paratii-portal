/* @flow */

import VideoRecord from 'records/VideoRecords'

import type { RootState } from 'types/ApplicationTypes'

export const getVideo = (state: RootState): ?VideoRecord => state.video
