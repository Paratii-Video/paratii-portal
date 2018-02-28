/* @flow */

import React from 'react'
import styled from 'styled-components'

import Colors from 'components/foundations/base/Colors'
import TruncatedText from 'components/foundations/TruncatedText'

type Props = {
  loadBalances: () => void,
  balance: string
}

const Wrapper = styled.div`
  font-size: 14px;
  color: ${Colors.purple};
  display: flex;
`

const NumberWrapper = styled.span`
  margin-right: 3px;
  display: flex;
`

const REFRESH_BALANCES_INTERVAL_MS: number = 5000

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

    return (
      <Wrapper>
        <NumberWrapper>
          <TruncatedText maxWidth="60px">{balance}</TruncatedText>
        </NumberWrapper>PTI
      </Wrapper>
    )
  }
}

export default PTIBalance
