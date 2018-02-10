/* @flow */

import { createSelector } from 'reselect'

import { getLoginRequestStatus, getUser, getBalances } from 'selectors/index'
import User, { Balances } from 'records/UserRecords'
import { REQUEST_STATUS } from 'constants/ApplicationConstants'

import type { RootState, RequestStatus } from 'types/ApplicationTypes'

export const getIsLoggingIn: (state: RootState) => boolean = createSelector(
  [getLoginRequestStatus],
  (loginRequestStatus: RequestStatus): boolean =>
    loginRequestStatus === REQUEST_STATUS.PENDING
)

export const getIsLoggedIn: (state: RootState) => boolean = createSelector(
  [getUser, getIsLoggingIn],
  (user: User, isLoggingIn: boolean): boolean =>
    !!(user.get('email') && !isLoggingIn)
)

export const getEthBalance: (state: RootState) => number = createSelector(
  [getBalances],
  (balances: Balances): number => balances.get('ETH')
)

export const getPtiBalance: (state: RootState) => number = createSelector(
  [getBalances],
  (balances: Balances): number => balances.get('PTI')
)
