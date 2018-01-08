/* @flow */

import { Paratii } from 'paratii-lib/lib/paratii'

export const paratii = new Paratii({
  // ...config,
  provider: 'http://localhost:8545/rpc/',
  // this is the user's address, and must be set from the browser's wallet
  address: '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275',
  privateKey: '399b141d0cc2b863b2f514ffe53edc6afc9416d5899da4d9bd2350074c38f1c6'
  // registry: '0x0'
})

window.paratii = paratii
