/* @flow */

import { createSelector } from 'reselect'

import { getVideoManager } from 'selectors/index'
import VideoManager from 'records/VideoManagerRecords'
import { getVideoRequestStatus } from 'operators/VideoManagerOperators'
import { REQUEST_STATUS } from 'constants/ApplicationConstants'

import type { RequestStatus, RootState } from 'types/ApplicationTypes'

export const getVideosAreBeingFetched: (
  state: RootState
) => boolean = createSelector(
  [getVideoManager],
  (videoManager: VideoManager): boolean => {
    const requestStatus: RequestStatus = getVideoRequestStatus(videoManager)

    return requestStatus === REQUEST_STATUS.PENDING
  }
)
