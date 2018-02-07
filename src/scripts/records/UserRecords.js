/* @flow */

import Immutable from 'immutable'

import { REQUEST_STATUS } from 'constants/ApplicationConstants'

import type { RequestStatus } from 'types/ApplicationTypes'

export const _getWalletKey = (state: User): string => state.get('walletKey')
export const _getMnemonicKey = (state: User): string => state.get('mnemonicKey')
export const _getLoginRequestStatus = (state: User): RequestStatus =>
  state.get('loginRequestStatus')

class User extends Immutable.Record({
  email: '',
  name: '',
  keepUrl: true,
  walletKey: 'keystore-anon',
  mnemonicKey: 'mnemonic-anon',
  loginRequestStatus: REQUEST_STATUS.NOT_STARTED
}) {
  email: string
  name: string
  keepUrl: boolean
  walletKey: string
  mnemonicKey: string
  loginRequestStatus: RequestStatus
}

export default User
