import React, { Component } from 'react'
import Card from 'components/structures/Card'
import Text from 'components/foundations/Text'
import paratii from 'utils/ParatiiLib'

type Props = {
  user: Object
}

class Wallet extends Component<Props> {
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
      </Card>
    )
  }
}

export default Wallet
