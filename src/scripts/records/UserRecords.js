/* @flow */

import Immutable from 'immutable'
import Cookies from 'js-cookie'

import {
  REQUEST_STATUS,
  DEFAULT_WALLET_KEY,
  DEFAULT_MNEMONIC_KEY
} from 'constants/ApplicationConstants'

import type { RequestStatus } from 'types/ApplicationTypes'

export const _getWalletKey = (state: User): string => state.get('walletKey')
export const _getMnemonicKey = (state: User): string => state.get('mnemonicKey')
export const _getLoginRequestStatus = (state: User): RequestStatus =>
  state.get('loginRequestStatus')

class KdfParams extends Immutable.Record({
  dklen: -1,
  salt: '',
  n: -1,
  r: -1,
  p: -1
}) {
  dklen: number
  salt: string
  n: number
  r: number
  p: number
}

class CipherParams extends Immutable.Record({
  iv: ''
}) {
  iv: string
}

class Crypto extends Immutable.Record({
  ciphertext: '',
  cipherparams: new CipherParams(),
  cipher: '',
  kdf: '',
  kdfparams: new KdfParams(),
  mac: ''
}) {
  ciphertext: string
  cipherparams: CipherParams
  cipher: string
  kdf: string
  kdfparams: KdfParams
  mac: string

  constructor ({ cipherparams, kdfparams, ...rest }: Object = {}) {
    super({
      ...rest,
      cipherparams: new CipherParams(cipherparams),
      kdfparams: new KdfParams(kdfparams)
    })
  }
}

export class Wallet extends Immutable.Record({
  version: -1,
  id: '',
  address: '',
  crypto: new Crypto()
}) {
  version: number
  id: string
  address: string
  crypto: Crypto

  constructor ({ crypto, ...rest }: Object = {}) {
    super({ ...rest, crypto: new Crypto(crypto) })
  }
}

class User extends Immutable.Record({
  email: Cookies.get('email'),
  name: '',
  keepUrl: true,
  walletKey: DEFAULT_WALLET_KEY,
  mnemonicKey: DEFAULT_MNEMONIC_KEY,
  loginRequestStatus: REQUEST_STATUS.NOT_STARTED,
  wallet: new Wallet(),
  mnemonic: ''
}) {
  email: string
  name: string
  keepUrl: boolean
  walletKey: string
  mnemonicKey: string
  loginRequestStatus: RequestStatus
  wallet: Wallet
  mnemonic: string

  constructor ({ wallet, ...rest }: Object = {}) {
    super({
      ...rest,
      wallet: new Wallet(wallet)
    })
  }
}

export default User
