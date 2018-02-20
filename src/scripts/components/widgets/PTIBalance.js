/* @flow */

import React from 'react'
import styled from 'styled-components'

import Colors from 'components/foundations/base/Colors'

type Props = {
  loadBalances: () => void,
  balance: string
}

const Wrapper = styled.div`
  font-size: 14px;
  color: ${Colors.purple};
`

const REFRESH_BALANCES_INTERVAL_MS: number = 1000

class PTIBalance extends React.Component<Props, void> {
  intervalId: ?number

  componentWillMount = (): void => {
    const { loadBalances } = this.props
    this.intervalId = setInterval(loadBalances, REFRESH_BALANCES_INTERVAL_MS)
  }

  componentWillUnmount = (): void => {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  render () {
    const { balance } = this.props

    return <Wrapper>{balance} PTI</Wrapper>
  }
}

export default PTIBalance
