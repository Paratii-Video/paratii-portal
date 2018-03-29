/* @flow */

import { Paratii } from 'paratii-lib/lib/paratii'
import { getParatiiConfig } from 'utils/AppUtils'

import type { ParatiiLib } from 'types/ApplicationTypes'

const paratiiConfig = getParatiiConfig(process.env.NODE_ENV)
window.paratii = new Paratii(paratiiConfig)

// FIXME this is just a temporary fix don't merge to dev!!!
const mnemonic =
  'jelly better achieve collect unaware mountain thought cargo oxygen act hood bridge'
window.paratii.eth.wallet.create(5, mnemonic)
// FIXME this is just a temporary fix don't merge to dev!!!

const paratii: ParatiiLib = window.paratii

export default paratii
