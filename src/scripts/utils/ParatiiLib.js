/* @flow */

import { Paratii } from 'paratii-lib/lib/paratii'
import { DEFAULT_PASSWORD } from 'constants/ParatiiLibConstants'

import type { ParatiiLib } from 'types/ApplicationTypes'

// TODO: run this code only in test mode
// In test mode, we get the values for the registry and other deployment-specific settings from the Session
if (process.env.NODE_ENV === 'test') {
  let registryAddress = sessionStorage.getItem('paratii.registry')

  window.paratii = new Paratii({
  // ...config,
    provider: 'http://localhost:8545/rpc/',
    // this is the user's address, and must be set from the browser's wallet
    address: '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275',
    privateKey: '399b141d0cc2b863b2f514ffe53edc6afc9416d5899da4d9bd2350074c38f1c6',
    registryAddress: registryAddress
  })
} else {
  window.paratii = new Paratii({
    // ...config,
    provider: 'http://localhost:8545/rpc/',
    // this is the user's address, and must be set from the browser's wallet
    // address: '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275',
    // privateKey: '399b141d0cc2b863b2f514ffe53edc6afc9416d5899da4d9bd2350074c38f1c6'
    registryAddress: '0x0B101ff870F8BAd6c437C45eCb2964D7e8034593'
  })
}

export const paratii: ParatiiLib = window.paratii

export async function setupKeystore () {
  let defaultPassword = DEFAULT_PASSWORD
  let mnemonic
  let walletKey = 'keystore-anon'
  let mnemonicKey = 'mnemonic-anon'
  let existingWallet = localStorage.getItem(walletKey)
  let existingWalletIsValid
  if (existingWallet) {
    try {
      console.log('Found existing wallet')
      paratii.eth.wallet.decrypt(JSON.parse(existingWallet), defaultPassword)
    } catch (err) {
      console.log('Existing wallet is not valid')
      existingWalletIsValid = false
    }
  }
  if (!existingWallet || existingWalletIsValid === false) {
    console.log('Creating a new wallet')
    mnemonic = await paratii.eth.wallet.newMnemonic()
    localStorage.setItem(walletKey, JSON.stringify(paratii.eth.wallet.encrypt(defaultPassword)))
    localStorage.setItem(mnemonicKey, mnemonic)
  }
  // console.log(`Your account is: ${}`)
}
