import React, { Component } from 'react'
import Card from 'components/structures/Card'
import Text from 'components/foundations/Text'
import Button from './foundations/Button'
import paratii from 'utils/ParatiiLib'
import { MODAL } from 'constants/ModalConstants'
import { ACTIVATE_SECURE_WALLET } from 'constants/ParatiiLibConstants'

type Props = {
  user: Object,
  userAddress: string,
  isWalletSecured: boolean,
  closeModal: () => void,
  openModal: () => void
}

class Wallet extends Component<Props> {
  secureWallet: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.secureWallet = this.secureWallet.bind(this)
  }

  secureWallet () {
    this.props.openModal(MODAL.SECURE)
  }

  render () {
    const balance = this.props.user.balances.PTI
    return (
      <Card title="Wallet">
        <Text>
          Your address is{' '}
          <strong data-test-id="user-address">{this.props.userAddress}</strong>
        </Text>
        <Text>
          You have <strong>{paratii.eth.web3.utils.fromWei(balance)}</strong>{' '}
          PTI
        </Text>
        <br />
        {ACTIVATE_SECURE_WALLET &&
          !this.props.isWalletSecured && (
          <Button
            data-test-id="secure-wallet"
            onClick={this.secureWallet}
            purple
          >
              Secure Wallet
          </Button>
        )}
      </Card>
    )
  }
}

export default Wallet
