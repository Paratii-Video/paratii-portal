import React, { Component } from 'react'
import Card from 'components/structures/Card'
import Text from 'components/foundations/Text'
import Button from './foundations/Button'
import paratii from 'utils/ParatiiLib'

type Props = {
  user: Object,
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
    console.log('secure')
    this.props.openModal('ModalSecure')
  }

  render () {
    const balance = this.props.user.balances.PTI
    return (
      <Card title="Wallet">
        <Text>
          Your address is <b>{paratii.config.account.address}</b>
        </Text>
        <Text>
          You have <b>{paratii.eth.web3.utils.fromWei(balance)}</b> PTI
        </Text>
        <br />
        <Button onClick={this.secureWallet} purple>
          Secure Wallet
        </Button>
      </Card>
    )
  }
}

export default Wallet
