/* @flow */

import React from 'react'
import styled from 'styled-components'

import Button from 'components/foundations/Button'
import Icon from 'components/foundations/Icon'
import Colors from 'components/foundations/base/Colors'
import TranslatedText from 'components/translations/TranslatedText'

import coinDataUrl from 'assets/svg/coin.svg'

type Props = {
  setUserIsTipping: (isTipping: boolean) => void
}

const WrappedButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: ${Colors.purple};
  color: ${Colors.white};
  height: 56px;
  width: 208px;
  font-size: 18px;
  transform: all 250ms linear;
`

const IconWrapper = styled.span`
  margin-right: 10px;
`

class TipButton extends React.Component<Props> {
  onClick = (e: Object) => {
    this.props.setUserIsTipping(true)
  }

  onClose = (e: Object) => {}

  render () {
    return (
      <WrappedButton onClick={this.onClick}>
        <IconWrapper>
          <Icon color={Colors.white} url={coinDataUrl} />
        </IconWrapper>
        <TranslatedText message="tipping.giveTip" />
      </WrappedButton>
    )
  }
}

export default TipButton
