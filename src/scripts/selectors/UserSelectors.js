/* @flow */

import { createSelector } from 'reselect'

import { getLoginRequestStatus, getUser, getWallet } from 'selectors/index'
import User, { Wallet } from 'records/UserRecords'
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

export const getAddress = (state: RootState): string =>
  createSelector([getWallet], (wallet: Wallet): string => wallet.get('address'))
