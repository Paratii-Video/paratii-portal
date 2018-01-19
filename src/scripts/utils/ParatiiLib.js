/* @flow */

import { Paratii } from 'paratii-lib/lib/paratii'
import { DEFAULT_PASSWORD } from 'constants/ParatiiLibConstants'

import type { ParatiiLib } from 'types/ApplicationTypes'

let paratiiInstance: ParatiiLib

export async function initParatiiLib () {
  if (paratiiInstance) {
    return paratiiInstance
  }

  if (process.env.NODE_ENV !== 'production') {
    paratiiInstance = new Paratii({
      provider: 'http://localhost:8545/rpc/',
      address: '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275',
      privateKey: '399b141d0cc2b863b2f514ffe53edc6afc9416d5899da4d9bd2350074c38f1c6'
    })
    await paratiiInstance.eth.deployContracts()
  } else {
    paratiiInstance = new Paratii({
      provider: 'http://localhost:8545/rpc/',
      address: '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275',
      privateKey: '399b141d0cc2b863b2f514ffe53edc6afc9416d5899da4d9bd2350074c38f1c6'
    })
  }

  window.paratii = paratiiInstance

  return paratiiInstance
}

export const paratii = () => paratiiInstance

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
