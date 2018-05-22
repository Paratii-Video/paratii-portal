/* @flow */

import { createAction } from 'redux-actions'
import Cookies from 'js-cookie'
import bip39 from 'bip39'

import {
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_WALLET_DATA,
  SET_WALLET_ADDRESS,
  BALANCES_LOADED
} from 'constants/ActionConstants'

import {
  DEFAULT_PASSWORD,
  WALLET_KEY_ANON,
  MNEMONIC_KEY_TEMP,
  PASSWORD_TEMP,
  MNEMONIC_KEY_ANON,
  WALLET_KEY_SECURE,
  ACTIVATE_SECURE_WALLET
} from 'constants/ParatiiLibConstants'

import paratii from 'utils/ParatiiLib'
import { openModal } from 'actions/ModalActions'
import Notifications from 'react-notification-system-redux'
import type { RootState, Dispatch } from 'types/ApplicationTypes'
import { MODAL } from 'constants/ModalConstants'
import UserRecord from 'records/UserRecords'

const loginRequested = createAction(LOGIN_REQUESTED)
const loginSuccess = createAction(LOGIN_SUCCESS)
const logoutAction = createAction(LOGOUT)
const balancesLoaded = createAction(BALANCES_LOADED)
export const setWalletData = createAction(SET_WALLET_DATA)
export const setWalletAddress = createAction(SET_WALLET_ADDRESS)

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

export const checkUserWallet = () => (dispatch: Dispatch) => {
  if (ACTIVATE_SECURE_WALLET) {
    const walletStringSecure: ?string = localStorage.getItem(WALLET_KEY_SECURE)
    if (walletStringSecure) {
      console.log('Try to open encrypted keystore')
      // Need to ask the PIN
      dispatch(openModal(MODAL.ASK_PASSWORD))
    } else {
      dispatch(openModal(MODAL.SECURE))
    }
  }
}

export const loadBalances = () => (dispatch: Dispatch) => {
  const address: string = paratii.eth.getAccount()
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

export const setAddressAndBalance = () => (dispatch: Dispatch) => {
  const address: string = paratii.eth.getAccount()
  dispatch(setWalletAddress({ address: address }))
  dispatch(loadBalances())
  sessionStorage.removeItem(MNEMONIC_KEY_TEMP)
  sessionStorage.removeItem(PASSWORD_TEMP)
}

export const setUserData = () => async (dispatch: Dispatch) => {
  const address: string = paratii.eth.getAccount()
  const user: UserRecord = await paratii.users.get(address)
  if (user) {
    dispatch(
      loginSuccess({
        name: user.name,
        email: user.email
      })
    )
  }
}

export const setupKeystore = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  console.log('Setup Keystore')
  // let walletIsValid: boolean = true
  let mnemonic: ?string = localStorage.getItem(MNEMONIC_KEY_ANON)
  const walletStringSecure: ?string = localStorage.getItem(WALLET_KEY_SECURE)
  const walletStringAnon: ?string = localStorage.getItem(WALLET_KEY_ANON)

  // Case 1: we have anonymous wallet is localStorage
  if (walletStringAnon) {
    try {
      paratii.eth.wallet.decrypt(JSON.parse(walletStringAnon), DEFAULT_PASSWORD)
    } catch (err) {
      // wallet is not valid, we will create a new wallet
      // walletIsValid = false
      // FIXME handle this error
      Notifications.error({
        title: err.message
      })
    }
  }

  // Case 2: we have a secured wallet is localStorage
  if (walletStringSecure && ACTIVATE_SECURE_WALLET) {
    // console.log('Try to open encrypted keystore')
    // Need to ask the PIN
    // dispatch(openModal(MODAL.ASK_PASSWORD))
  }

  // Case 3: there is an account in paratii.eth.wallet but not on localStorage
  // we save the paratii.eth.wallet[0] account in local storage
  if (
    paratii.eth.wallet.length > 0 &&
    !walletStringSecure &&
    !walletStringAnon
  ) {
    const encryptedWallet = paratii.eth.wallet.encrypt(DEFAULT_PASSWORD)
    localStorage.setItem(WALLET_KEY_ANON, JSON.stringify(encryptedWallet))
  }

  // Case 4: we have no wallet in localstorage, and neither do we have one in paratii.eth.wallet:
  // we need to create a new Wallet
  if (
    paratii.eth.wallet.length === 0 &&
    !walletStringSecure &&
    !walletStringAnon
  ) {
    // console.log('Create a new wallet')
    mnemonic = bip39.generateMnemonic()
    await paratii.eth.wallet.create(1, mnemonic)
    const encryptedWallet = paratii.eth.wallet.encrypt(DEFAULT_PASSWORD)
    localStorage.setItem(WALLET_KEY_ANON, JSON.stringify(encryptedWallet))
  }
  dispatch(setAddressAndBalance())
}

export const secureKeystore = (password: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  // save paratii.eth.wallet in localstorage, encrypted with password
  // console.log('Securing wallet')
  let newWalletAddress: ?string
  let encryptedSecuredWallet: ?Object
  const walletStringAnon: ?string = localStorage.getItem(WALLET_KEY_ANON)
  const mnemonicFromSession = sessionStorage.getItem(MNEMONIC_KEY_TEMP)

  const secureWallet = async () => {
    if (!mnemonicFromSession) {
      encryptedSecuredWallet = await paratii.eth.wallet.encrypt(password)
      if (encryptedSecuredWallet) {
        console.log('--- restore secure wallet')
        localStorage.setItem(
          WALLET_KEY_SECURE,
          JSON.stringify(encryptedSecuredWallet)
        )
        // Change the name of keystore used by the application
        dispatch(setWalletData({ walletKey: WALLET_KEY_SECURE }))
        // Open Notification
        dispatch(
          Notifications.success({
            title: 'Your wallet is now secured'
          })
        )
      }
    } else {
      // Here we want to secure and migrate
      try {
        // Create the new wallet based on the generated mnemonic
        paratii.eth.wallet.clear()
        await paratii.eth.wallet.create(1, mnemonicFromSession)
        newWalletAddress = paratii.eth.wallet[0].address
        encryptedSecuredWallet = await paratii.eth.wallet.encrypt(password)
        if (encryptedSecuredWallet) {
          localStorage.setItem(
            WALLET_KEY_SECURE,
            JSON.stringify(encryptedSecuredWallet)
          )
          // Change the name of keystore used by the application
          dispatch(setWalletData({ walletKey: WALLET_KEY_SECURE }))
        }
        // Clear wallet because then we recreate from localStorage
        paratii.eth.wallet.clear()
      } catch (error) {
        dispatch(
          Notifications.error({
            title: error.message
          })
        )
        throw error
      }

      if (walletStringAnon) {
        try {
          // Restore anonymous account to sign the migration
          paratii.eth.wallet.decrypt(
            JSON.parse(walletStringAnon),
            DEFAULT_PASSWORD
          )
          console.log('--- migrate account')
          await paratii.users.migrateAccount(newWalletAddress)
          paratii.eth.wallet.clear()
        } catch (error) {
          // In case of error, clear the secure keystore from localstorage
          localStorage.removeItem(WALLET_KEY_SECURE)
          // error opening the anonymous wallet
          Notifications.error({
            title: error.message
          })
          throw error
        }
      }

      if (encryptedSecuredWallet) {
        try {
          // Reload the new secure wallet from localStorage
          console.log('--- restore secure wallet')
          paratii.eth.wallet.decrypt(encryptedSecuredWallet, password)
          dispatch(
            Notifications.success({
              title: 'Your wallet is now secured'
            })
          )
        } catch (error) {
          // error opening the secure wallet
          Notifications.error({
            title: error.message
          })
          throw error
        }
      }
    }
    dispatch(setAddressAndBalance())
  }

  dispatch(
    Notifications.warning({
      title: 'Securing your wallet..',
      onAdd: setTimeout(secureWallet, 500)
    })
  )
}

export const restoreKeystore = (mnemonic: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  console.log('--- Restoring wallet')
  dispatch(
    Notifications.warning({
      title: 'Trying to restore your wallet..'
    })
  )
  try {
    sessionStorage.removeItem(MNEMONIC_KEY_TEMP)
    paratii.eth.wallet.clear()
    await paratii.eth.wallet.create(1, mnemonic)
    // Notification
    dispatch(
      Notifications.success({
        title: 'Your wallet has been created'
      })
    )
  } catch (error) {
    dispatch(
      Notifications.error({
        title: error.message,
        autoDismiss: 0
      })
    )
  }
}
