/* @flow */

import React from 'react'
import styled from 'styled-components'
import TranslatedText from 'components/translations/TranslatedText'
import Colors from 'components/foundations/base/Colors'
import TruncatedText from 'components/foundations/TruncatedText'
import { FlexCenterStyle } from 'components/foundations/Styles'

type Props = {
  balance: string,
  color?: string
}

const Wrapper = styled.div`
  ${FlexCenterStyle}
  font-size: ${props => props.theme.fonts.text.small};
  color: ${({ color }) => color || Colors.purple};
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
        </NumberWrapper><TranslatedText message="PTI" />
      </Wrapper>
    )
  }
}

export default PTIBalance
