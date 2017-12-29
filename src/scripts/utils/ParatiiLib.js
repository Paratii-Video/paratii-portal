/* @flow */

import { Paratii } from 'paratii-lib/lib/paratii'

let instance

export default config => {
  if (!instance) {
    instance = new Paratii(config)
  }

  return instance
}
