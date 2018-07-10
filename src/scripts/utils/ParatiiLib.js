/* @flow */

import { Paratii } from 'paratii-js/src/paratii'
import { getParatiiConfig } from 'utils/AppUtils'
import { WALLET_KEY_SECURE } from 'constants/ParatiiLibConstants'

import type { ParatiiLib } from 'types/ApplicationTypes'

const paratiiConfig = getParatiiConfig(process.env.NODE_ENV, 'client')
window.paratii = new Paratii(paratiiConfig)

export const getSecureWallet = (): string =>
  localStorage.getItem(WALLET_KEY_SECURE) || ''

const paratii: ParatiiLib = window.paratii

export default paratii
