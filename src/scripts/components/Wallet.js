import React, { Component } from 'react'
import Card from 'components/structures/Card'
import Text, { Strong } from 'components/foundations/Text'
import TextButton from './foundations/TextButton'
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
      <Card
        title="Wallet"
        maxWidth
        footer={
          ACTIVATE_SECURE_WALLET &&
          !this.props.isWalletSecured && (
            <TextButton
              data-test-id="secure-wallet"
              onClick={this.secureWallet}
              accent
            >
              Secure Wallet
            </TextButton>
          )
        }
      >
        <Text>
          Your address is{' '}
          <Strong primary data-test-id="user-address">
            {this.props.userAddress}
          </Strong>
        </Text>
        <Text>
          You have{' '}
          <Strong primary>{paratii.eth.web3.utils.fromWei(balance)}</Strong> PTI
        </Text>
      </Card>
    )
  }
}

export default Wallet
