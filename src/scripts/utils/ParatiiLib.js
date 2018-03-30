/* @flow */

import { Paratii } from 'paratii-lib/lib/paratii'
import { getParatiiConfig } from 'utils/AppUtils'

import type { ParatiiLib } from 'types/ApplicationTypes'

const paratiiConfig = getParatiiConfig(process.env.NODE_ENV)
window.paratii = new Paratii(paratiiConfig)

const paratii: ParatiiLib = window.paratii

export default paratii
