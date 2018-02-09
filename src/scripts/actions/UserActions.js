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
  wallet: Array<Object>,
  mnemonicKey: string,
  mnemonic: string
}) => (dispatch: Dispatch): void => {
  dispatch(
    setWalletData({
      walletKey,
      mnemonicKey,
      wallet: (wallet || [])[0] || {},
      mnemonic
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
  let decryptedWallet: ?Object
  let mnemonic: string = localStorage.getItem(mnemonicKey) || ''
  let walletIsValid: boolean = true
  let walletToSave: ?Array<Object>
  if (walletString) {
    try {
      walletToSave = JSON.parse(walletString)
      decryptedWallet = paratii.eth.wallet.decrypt(
        walletToSave,
        DEFAULT_PASSWORD
      )
      paratii.eth.setAccount(
        paratii.config.account.address,
        paratii.config.account.privateKey
      )
    } catch (err) {
      walletIsValid = false
    }
  }
  if (!decryptedWallet || !walletIsValid) {
    paratii.eth.wallet.create()
    mnemonic = await paratii.eth.wallet.getMnemonic()
    walletToSave = paratii.eth.wallet.encrypt(DEFAULT_PASSWORD)
  }
  dispatch(
    setAndSyncWalletData({
      wallet: walletToSave || [],
      walletKey,
      mnemonic,
      mnemonicKey
    })
  )
}
