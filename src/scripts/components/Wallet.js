import React, { Component } from 'react'
import Card from 'components/structures/Card'
import Text from 'components/foundations/Text'
import Hidden from 'components/foundations/Hidden'

import paratii from 'utils/ParatiiLib'

type Props = {
  user: Object
}

class Wallet extends Component<Props> {
  render () {
    const balance = this.props.user.balances.ETH
    return (
      <Card title="Wallet">
        <Text>
          Your address is <b>{paratii.config.account.address}</b>
        </Text>
        <Hidden>
          FIXME: hiding the balance because it does not update
          <Text>
            You have <b>{paratii.eth.web3.utils.fromWei(balance)}</b> PTI
          </Text>
        </Hidden>
      </Card>
    )
  }
}

export default Wallet
