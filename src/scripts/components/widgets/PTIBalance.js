/* @flow */

import React from 'react'
import styled from 'styled-components'

import Colors from 'components/foundations/base/Colors'
import TruncatedText from 'components/foundations/TruncatedText'

type Props = {
  balance: string,
  color?: string
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

class PTIBalance extends React.Component<Props, void> {
  render () {
    const { balance, color } = this.props

    return (
      <Wrapper color={color} data-test-id="pti-balance-wrapper">
        <NumberWrapper>
          <TruncatedText data-test-id="pti-balance" maxWidth="60px">
            {balance}
          </TruncatedText>
        </NumberWrapper>PTI
      </Wrapper>
    )
  }
}

export default PTIBalance
