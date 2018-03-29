/* @flow */

import { createAction } from 'redux-actions'
import Promise from 'bluebird'
import Cookies from 'js-cookie'

import {
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_WALLET_DATA,
  BALANCES_LOADED
} from 'constants/ActionConstants'
import paratii from 'utils/ParatiiLib'
import { openModal } from 'actions/ModalActions'
import { DEFAULT_PASSWORD } from 'constants/ParatiiLibConstants'
import { getWalletKey, getMnemonicKey } from 'selectors/index'

import Notifications from 'react-notification-system-redux'

import type { RootState, Dispatch } from 'types/ApplicationTypes'

const loginRequested = createAction(LOGIN_REQUESTED)
const loginSuccess = createAction(LOGIN_SUCCESS)
const logoutAction = createAction(LOGOUT)
const setWalletData = createAction(SET_WALLET_DATA)
const balancesLoaded = createAction(BALANCES_LOADED)

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

export const loadBalances = () => (dispatch: Dispatch) => {
  const address: string = paratii.config.account.address

  if (address) {
    paratii.eth.balanceOf(address).then(({ ETH, PTI }) => {
      dispatch(
        balancesLoaded({
          ETH,
          PTI
        })
      )
    })
  }
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
  dispatch: Dispatch<*>,
  getState: () => RootState
) => {
  let wallet: ?Object
  let walletIsValid: boolean = true
  const walletKey: string = getWalletKey(getState())
  const mnemonicKey: string = getMnemonicKey(getState())
  let mnemonic: string = localStorage.getItem(mnemonicKey) || ''
  let walletString: string = localStorage.getItem('keystore') || ''

  if (walletString) {
    console.log('Try to open encrypted keystore')
    // Need to ask the PIN
    dispatch(openModal('ModalAskPin'))
  } else {
    walletString = localStorage.getItem('keystore-anon') || ''
    try {
      wallet = paratii.eth.wallet.decrypt(
        JSON.parse(walletString),
        DEFAULT_PASSWORD
      )
      dispatch(
        Notifications.success({
          title: 'Good',
          message: 'We have created a fresh keystore for you!'
        })
      )
    } catch (err) {
      // wallet is not valid, we will create a new wallet
      walletIsValid = false
      Notifications.error({
        title: err.message
      })
    }

    if (!wallet || !walletIsValid) {
      console.log('Create a new wallet')
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
}

export const secureKeystore = (password: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  console.log('Securing wallet')
  dispatch(
    Notifications.warning({
      title: 'Securing your wallet..'
    })
  )
  const walletKey: string = `keystore`
  const mnemonicKey: string = ''
  const mnemonic: string = ''
  const wallet: ?Object = await paratii.eth.wallet.encrypt(password)
  // Clear Paratii and remove keystore-anon
  dispatch(
    Notifications.success({
      title: 'Your wallet is now secured'
    })
  )
  console.log('Clear Paratii and remove Keystore-anon')
  paratii.eth.wallet.clear()
  localStorage.removeItem('keystore-anon')
  dispatch(
    setAndSyncWalletData({
      wallet,
      walletKey,
      mnemonic,
      mnemonicKey
    })
  )
}
