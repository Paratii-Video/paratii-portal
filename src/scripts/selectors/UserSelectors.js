/* @flow */

import { createSelector } from 'reselect'

import { getLoginRequestStatus, getUser, getWalletKey } from 'selectors/index'
import User from 'records/UserRecords'
import { REQUEST_STATUS } from 'constants/ApplicationConstants'

import type { RootState, RequestStatus, Wallet } from 'types/ApplicationTypes'

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

const getWallet = (state: RootState): ?Wallet => {
  const walletKey: string = getWalletKey(state)

  const walletString: ?string = localStorage.getItem(walletKey)

  if (walletString) {
    try {
      const wallet: Wallet = JSON.parse(walletString)
      return wallet
    } catch (e) {}
  }

  return null
}

export const getAddress = (state: RootState): string =>
  createSelector([getWallet], (wallet: ?Wallet) => {
    return (wallet && wallet.address) || ''
  })
