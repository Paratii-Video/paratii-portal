/* @flow */

import { DEFAULT_PASSWORD } from 'constants/ParatiiLibConstants'

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
      window.paratii.eth.wallet.decrypt(JSON.parse(existingWallet), defaultPassword)
    } catch (err) {
      console.log('Existing wallet is not valid')
      existingWalletIsValid = false
    }
  }
  if (!existingWallet || existingWalletIsValid === false) {
    console.log('Creating a new wallet')
    mnemonic = await window.paratii.eth.wallet.newMnemonic()
    localStorage.setItem(walletKey, JSON.stringify(window.paratii.eth.wallet.encrypt(defaultPassword)))
    localStorage.setItem(mnemonicKey, mnemonic)
  }
  // console.log(`Your account is: ${}`)
}
