/* @flow */

import { Paratii } from 'paratii-lib/lib/paratii'
import Promise from 'bluebird'

let instancePromise

export default (config = {}) => {
  if (!instancePromise) {
    instancePromise = new Promise((resolve, reject) => {
      const paratii = new Paratii({
        ...config,
        provider: 'http://localhost:8545/rpc/',
        address: '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275',
        privateKey: '399b141d0cc2b863b2f514ffe53edc6afc9416d5899da4d9bd2350074c38f1c6'
      })

      paratii.eth.deployContracts().then(() => {
        resolve(paratii)
      })
    })
  }

  return instancePromise
}
