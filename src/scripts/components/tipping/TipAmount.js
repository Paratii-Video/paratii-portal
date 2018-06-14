/* @flow */

import React from 'react'
import styled from 'styled-components'

import Icon from 'components/foundations/Icon'
import Colors from 'components/foundations/base/Colors'
import TranslatedText from 'components/translations/TranslatedText'

import coinDataUrl from 'assets/svg/coin.svg'

type Props = {
  amount: number,
  onClick: (e: Object) => void
}

const WrappedButton = styled.button`
  border: 1px solid ${Colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  color: ${Colors.grayLight};
  height: 60px;
  width: 152px;
  border-radius: 30px;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;

  &:active,
  &:hover {
    border-color: ${Colors.purple};
    opacity: 1;
  }
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
  top: 1px;
`

class TipButton extends React.Component<Props> {
  render () {
    const { amount, onClick } = this.props

    return (
      <WrappedButton onClick={onClick}>
        <IconWrapper>
          <Icon color={Colors.grayLight} url={coinDataUrl} />
        </IconWrapper>
        <TranslatedText message={`tipping.amounts.${amount}`} />
        <UnitWrapper>
          <TranslatedText message="PTI" />
        </UnitWrapper>
      </WrappedButton>
    )
  }
}

export default TipButton
