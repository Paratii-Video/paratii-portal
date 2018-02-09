/* @flow */

import { handleActions } from 'redux-actions'

import { REQUEST_STATUS } from 'constants/ApplicationConstants'
import {
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_WALLET_DATA
} from 'constants/ActionConstants'
import UserRecord, { Wallet as WalletRecord } from 'records/UserRecords'

import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [LOGIN_REQUESTED]: (state: UserRecord): UserRecord => {
    return state.merge({
      loginRequestStatus: REQUEST_STATUS.PENDING,
      email: null,
      name: null
    })
  },
  [LOGIN_SUCCESS]: (
    state: UserRecord,
    { payload }: Action<{ email: string }>
  ): UserRecord => {
    return state.merge({
      loginRequestStatus: REQUEST_STATUS.SUCCEEDED,
      email: payload.email
    })
  },
  [LOGOUT]: (state: UserRecord): UserRecord => {
    return state.merge({
      loginRequestStatus: REQUEST_STATUS.NOT_STARTED,
      email: null,
      name: null,
      keepUrl: false
    })
  },
  [SET_WALLET_DATA]: (
    state: UserRecord,
    { payload: { walletKey, mnemonicKey, wallet, mnemonic } }
  ): UserRecord =>
    state.merge({
      walletKey,
      mnemonicKey,
      wallet: new WalletRecord(wallet),
      mnemonic
    })
}

export default handleActions(reducer, new UserRecord())
