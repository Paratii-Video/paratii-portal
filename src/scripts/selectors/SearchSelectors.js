/* @flow */

import { createSelector } from 'reselect'

import {
  getSearchRequestStatus,
  getAdditionalSearchRequestStatus
} from 'selectors/index'
import { REQUEST_STATUS } from 'constants/ApplicationConstants'

import type { RootState, RequestStatus } from 'types/ApplicationTypes'

export const getSearchResultsLoading: (
  state: RootState
) => boolean = createSelector(
  [getSearchRequestStatus],
  (requestStatus: RequestStatus): boolean =>
    requestStatus === REQUEST_STATUS.PENDING
)

export const getAdditionalSearchResultsLoading: (
  state: RootState
) => boolean = createSelector(
  [getAdditionalSearchRequestStatus],
  (requestStatus: RequestStatus): boolean =>
    requestStatus === REQUEST_STATUS.PENDING
)
