/* @flow */

import { Paratii } from 'paratii-lib/lib/paratii'
import { DEFAULT_PASSWORD } from 'constants/ParatiiLibConstants'
import { getParatiiConfig } from 'utils/AppUtils'

import type { ParatiiLib } from 'types/ApplicationTypes'

const paratiiConfig = getParatiiConfig(process.env.NODE_ENV)

console.log(paratiiConfig)
window.paratii = new Paratii(paratiiConfig)

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
    paratii.eth.wallet.create()
    mnemonic = await paratii.eth.wallet.getMnemonic()
    localStorage.setItem(
      walletKey,
      JSON.stringify(paratii.eth.wallet.encrypt(defaultPassword))
    )
    // TODO: needs to be encrypted
    localStorage.setItem(mnemonicKey, mnemonic)
  }
  // console.log(`Your account is: ${}`)
}
