import React, { Component } from 'react'
import SingleCardWrapper from '../foundations/SingleCardWrapper'
import RedeemVoucher from 'containers/RedeemVoucherContainer'

class Voucher extends Component {
  render () {
    return (
      <SingleCardWrapper>
        <RedeemVoucher maxWidth />
      </SingleCardWrapper>
    )
  }
}

export default Voucher
