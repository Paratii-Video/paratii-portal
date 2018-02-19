import React, { Component } from 'react'
import Card from 'components/structures/Card'

type Props = {
  user: Object
}

class Wallet extends Component<Props> {
  render () {
    const balance = this.props.user.balances.ETH
    return (
      <Card title="Wallet">
        <p>
          You have <b>{balance}</b> PTI
        </p>
      </Card>
    )
  }
}

export default Wallet
