/* @flow */

import { handleActions } from 'redux-actions'

import { REQUEST_STATUS } from 'constants/ApplicationConstants'
import {
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_WALLET_DATA,
  SET_WALLET_ADDRESS,
  BALANCES_LOADED,
  STAKED_PTI
} from 'constants/ActionConstants'
import UserRecord, { Balances } from 'records/UserRecords'

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
    {
      payload
    }: Action<{ name: string, email: string, emailIsVerified: string }>
  ): UserRecord => {
    return state.merge({
      loginRequestStatus: REQUEST_STATUS.SUCCEEDED,
      name: payload.name,
      email: payload.email,
      emailIsVerified: payload.emailIsVerified
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
    { payload: { walletKey } }
  ): UserRecord =>
    state.merge({
      walletKey
    }),
  [SET_WALLET_ADDRESS]: (
    state: UserRecord,
    { payload: { address } }
  ): UserRecord =>
    state.merge({
      address
    }),
  [BALANCES_LOADED]: (
    state: UserRecord,
    { payload: { ETH, PTI } }
  ): UserRecord =>
    state.set(
      'balances',
      new Balances({
        ETH,
        PTI
      })
    ),
  [STAKED_PTI]: (state: UserRecord, { payload: { totalStaked } }): UserRecord =>
    state.merge({
      totalStaked
    })
}

export default handleActions(reducer, new UserRecord())
