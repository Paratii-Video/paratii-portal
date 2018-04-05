/* @flow */

import React from 'react'
import styled from 'styled-components'

import Colors from 'components/foundations/base/Colors'
import TruncatedText from 'components/foundations/TruncatedText'

type Props = {
  balance: string,
  color?: string,
  loadBalances: () => void
}

const Wrapper = styled.div`
  font-size: 14px;
  color: ${({ color }) => color || Colors.purple};
  display: flex;
`

const NumberWrapper = styled.span`
  margin-right: 3px;
  display: flex;
`

// FIXME: the whole polling logic should be moved to its own dedicated place a
// instead of being connected to  a particular component
const REFRESH_BALANCES_INTERVAL_MS: number = 200000

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
    const { balance, color } = this.props

    return (
      <Wrapper color={color} data-test-id="pti-balance">
        <NumberWrapper>
          <TruncatedText maxWidth="60px">{balance}</TruncatedText>
        </NumberWrapper>PTI
      </Wrapper>
    )
  }
}

export default PTIBalance
