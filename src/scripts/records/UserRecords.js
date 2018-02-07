/* @flow */

import Immutable from 'immutable'

export const _getWalletKey = (state: User): string => state.get('walletKey')
export const _getMnemonicKey = (state: User): string => state.get('mnemonicKey')

class User extends Immutable.Record({
  email: '',
  name: '',
  keepUrl: true,
  walletKey: 'keystore-anon',
  mnemonicKey: 'mnemonic-anon'
}) {
  email: string
  name: string
  keepUrl: boolean
  walletKey: string
  mnemonicKey: string
}

export default User
