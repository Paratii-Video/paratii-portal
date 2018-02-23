import React, { Component } from 'react'
import { CardContainer } from '../structures/Card'
import RedeemVoucher from '../widgets/RedeemVoucher'

class Voucher extends Component {
  render () {
    return (
      <CardContainer>
        <RedeemVoucher />
      </CardContainer>
    )
  }
}

export default Voucher
