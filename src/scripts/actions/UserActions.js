/* @flow */

import { createAction } from 'redux-actions'
import Promise from 'bluebird'
import Cookies from 'js-cookie'

import {
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_WALLET_DATA
} from 'constants/ActionConstants'
import paratii from 'utils/ParatiiLib'
import { DEFAULT_PASSWORD } from 'constants/ParatiiLibConstants'
import { getWalletKey, getMnemonicKey } from 'selectors/index'

import type { RootState, Dispatch } from 'types/ApplicationTypes'

const loginRequested = createAction(LOGIN_REQUESTED)
const loginSuccess = createAction(LOGIN_SUCCESS)
const logoutAction = createAction(LOGOUT)
const setWalletData = createAction(SET_WALLET_DATA)

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const login = (email: string, password: string) => (
  dispatch: Dispatch
) => {
  dispatch(loginRequested())
  sleep(200).then(() => {
    Cookies.set('email', email)
    dispatch(loginSuccess({ email }))
  })
}

export const logout = () => (dispatch: Dispatch) => {
  Cookies.remove('email')
  dispatch(logoutAction())
}

const setAndSyncWalletData = ({
  walletKey,
  wallet,
  mnemonic,
  mnemonicKey
}: {
  walletKey: string,
  wallet: Object,
  mnemonicKey: string,
  mnemonic: string
}) => (dispatch: Dispatch): void => {
  dispatch(
    setWalletData({
      walletKey,
      mnemonicKey
    })
  )
  localStorage.setItem(walletKey, JSON.stringify(wallet))

  // TODO: needs to be encrypted
  localStorage.setItem(mnemonicKey, mnemonic)
}

export const setupKeystore = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  paratii.eth.wallet.clear()
  const walletKey: string = getWalletKey(getState())
  const mnemonicKey: string = getMnemonicKey(getState())
  const walletString: string = localStorage.getItem(walletKey) || ''
  let wallet: ?Object
  let mnemonic: string = localStorage.getItem(mnemonicKey) || ''
  let walletIsValid: boolean = true
  if (walletString) {
    try {
      wallet = paratii.eth.wallet.decrypt(
        JSON.parse(walletString),
        DEFAULT_PASSWORD
      )
      console.log('we have a wallet now!')
      console.log(paratii.config.account)
      paratii.eth.setAccount(
        paratii.eth.config.account.address,
        paratii.eth.config.account.privateKey
      )
    } catch (err) {
      walletIsValid = false
    }
  }
  if (!wallet || !walletIsValid) {
    paratii.eth.wallet.create()
    mnemonic = await paratii.eth.wallet.getMnemonic()
    wallet = paratii.eth.wallet.encrypt(DEFAULT_PASSWORD)
    dispatch(
      setAndSyncWalletData({
        wallet,
        walletKey,
        mnemonic,
        mnemonicKey
      })
    )
  }
}
