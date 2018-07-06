/* @flow */

import React from 'react'
import styled from 'styled-components'

import { FlexCenterStyle } from 'components/foundations/Styles'
import Icon from 'components/foundations/Icon'
import Colors from 'components/foundations/base/Colors'
import TranslatedText from 'components/translations/TranslatedText'

import coinDataUrl from 'assets/svg/coin.svg'

type Props = {
  amount: number
}

const Wrapper = styled.div`
  ${FlexCenterStyle} font-size: 20px;
  font-weight: bold;
  color: ${Colors.white};
`

const IconWrapper = styled.span`
  margin-right: 10px;
`

const UnitWrapper = styled.span`
  display: inline-block;
  margin-left: 4px;
  font-size: 15px;
  color: ${Colors.purple};
  position: relative;
  top: 2px;

  &[disabled] {
    color: ${Colors.grayLight};
  }
`

class TipAmount extends React.Component<Props> {
  render () {
    const { amount } = this.props

    return (
      <Wrapper>
        <IconWrapper>
          <Icon color={Colors.grayLight} url={coinDataUrl} />
        </IconWrapper>
        <TranslatedText message={`tipping.amounts.${amount}`} />
        <UnitWrapper>
          <TranslatedText message="PTI" />
        </UnitWrapper>
      </Wrapper>
    )
  }
}

export default TipAmount
