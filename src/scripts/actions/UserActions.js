/* @flow */

import React from 'react'
import { createAction } from 'redux-actions'
import bip39 from 'bip39'

import {
  LOGIN_SUCCESS,
  SET_WALLET_DATA,
  SET_WALLET_ADDRESS,
  LOAD_BALANCES_STARTED,
  BALANCES_LOADED,
  WALLET_SECURED,
  STAKED_PTI
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
import { NOTIFICATION_DELAY_MS } from 'constants/ApplicationConstants'

import TranslatedText from 'components/translations/TranslatedText'
import paratii from 'utils/ParatiiLib'
import { openModal } from 'actions/ModalActions'
import Notifications from 'react-notification-system-redux'
import type { RootState, Dispatch } from 'types/ApplicationTypes'
import { MODAL } from 'constants/ModalConstants'
import UserRecord from 'records/UserRecords'

const loginSuccess = createAction(LOGIN_SUCCESS)
const balancesLoaded = createAction(BALANCES_LOADED)
const walletSecured = createAction(WALLET_SECURED)
const totalStaked = createAction(STAKED_PTI)
export const setWalletData = createAction(SET_WALLET_DATA)
export const setWalletAddress = createAction(SET_WALLET_ADDRESS)

export const checkUserWallet = ({
  onClose = () => {},
  onComplete = () => {}
}: Object = {}) => (dispatch: Dispatch) => {
  const completeCallback = (...args) => {
    dispatch(walletSecured())
    onComplete(...args)
  }

  if (ACTIVATE_SECURE_WALLET) {
    const walletStringSecure: ?string = localStorage.getItem(WALLET_KEY_SECURE)
    if (walletStringSecure) {
      console.log('Try to open encrypted keystore')
      // Need to ask the PIN
      dispatch(
        openModal(MODAL.ASK_PASSWORD, { onClose, onComplete: completeCallback })
      )
    } else {
      dispatch(
        openModal(MODAL.SECURE, { onClose, onComplete: completeCallback })
      )
    }
  }
}

export const loadBalancesStarted = createAction(LOAD_BALANCES_STARTED)

export const loadBalances = () => (dispatch: Dispatch): Promise<void> => {
  const address: string = paratii.eth.getAccount()
  if (address) {
    dispatch(loadBalancesStarted())
    return paratii.eth.balanceOf(address).then(({ ETH, PTI }) => {
      const ETHAsString = ETH.toString()
      const PTIAsString = PTI.toString()
      dispatch(
        balancesLoaded({
          ETH: ETHAsString,
          PTI: PTIAsString
        })
      )
    })
  }

  return Promise.resolve()
}

let balanceLoadIntervalId: number = 0

export const loadBalancesOnInterval = (intervalMs: number) => (
  dispatch: Dispatch
) => {
  clearInterval(balanceLoadIntervalId)

  balanceLoadIntervalId = setInterval(() => {
    dispatch(loadBalances())
  }, intervalMs)
}

export const loadTotalStakedPTI = () => async (dispatch: Dispatch) => {
  const address: string = paratii.eth.getAccount()
  if (address) {
    const totalBN = await paratii.eth.tcr.getTotalStaked(address)
    const totalStakedPTI = totalBN.toString()
    dispatch(
      totalStaked({
        totalStaked: totalStakedPTI
      })
    )
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
    const emailIsVerified = user.emailIsVerified || false
    dispatch(
      loginSuccess({
        name: user.name,
        email: user.email,
        emailIsVerified: emailIsVerified
      })
    )
    // Get total Pti staked
    dispatch(loadTotalStakedPTI())
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
    await paratii.eth.wallet.createFromMnemonic(1, mnemonic)
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
            title: <TranslatedText message="wallet.walletSecured" />
          })
        )
      }
    } else {
      // Here we want to secure and migrate
      try {
        // Create the new wallet based on the generated mnemonic
        paratii.eth.wallet.clear()
        await paratii.eth.wallet.createFromMnemonic(1, mnemonicFromSession)
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
      title: <TranslatedText message="wallet.securingWallet" />,
      onAdd: setTimeout(secureWallet, NOTIFICATION_DELAY_MS)
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

  setTimeout(async () => {
    try {
      sessionStorage.removeItem(MNEMONIC_KEY_TEMP)
      paratii.eth.wallet.clear()
      await paratii.eth.wallet.createFromMnemonic(1, mnemonic)
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
  }, NOTIFICATION_DELAY_MS)
}
