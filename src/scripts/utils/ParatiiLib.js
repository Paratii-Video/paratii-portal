/* @flow */

import { Paratii } from 'paratii-lib/lib/paratii'

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
    address: '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275',
    privateKey: '399b141d0cc2b863b2f514ffe53edc6afc9416d5899da4d9bd2350074c38f1c6'
    // registry: '0x0'
  })
}

export const paratii: ParatiiLib = window.paratii
