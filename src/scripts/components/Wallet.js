import React, { Component } from 'react'
import Card from 'components/structures/Card'
import Text from 'components/foundations/Text'

type Props = {
  user: Object
}

class Wallet extends Component<Props> {
  render () {
    const balance = this.props.user.balances.ETH
    return (
      <Card title="Wallet">
        <Text>
          You have <b>{balance}</b> PTI
        </Text>
      </Card>
    )
  }
}

export default Wallet
