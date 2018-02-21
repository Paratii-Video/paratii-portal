/* @flow */

import { createSelector } from 'reselect'

import { getLoginRequestStatus, getUser, getBalances } from 'selectors/index'
import User, { Balances } from 'records/UserRecords'
import { REQUEST_STATUS } from 'constants/ApplicationConstants'
import paratii from 'utils/ParatiiLib'
import { formatBalance } from 'utils/AppUtils'

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

const getEthBalance: (state: RootState) => string = createSelector(
  [getBalances],
  (balances: Balances): string => balances.get('ETH')
)

export const getFormattedEthBalance: (
  state: RootState
) => string = createSelector([getEthBalance], (ethBalance: string): string => {
  const balance: number = parseInt(
    paratii.eth.web3.utils.fromWei(ethBalance, 'ether'),
    10
  )
  return (!isNaN(balance) && formatBalance(balance)) || '0'
})

const getPtiBalance: (state: RootState) => string = createSelector(
  [getBalances],
  (balances: Balances): string => balances.get('PTI')
)

export const getFormattedPtiBalance: (
  state: RootState
) => string = createSelector([getPtiBalance], (ptiBalance: string): string => {
  const balance: number = parseInt(
    paratii.eth.web3.utils.fromWei(ptiBalance, 'ether'),
    10
  )
  return (!isNaN(balance) && formatBalance(balance)) || '0'
})
