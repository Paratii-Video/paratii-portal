/* @flow */

import React from 'react'
import styled from 'styled-components'

import { TIPPING_PTI_AMOUNTS } from 'constants/TippingConstants'
import { VIDEO_OVERLAY_PADDING } from 'constants/UIConstants'

import TranslatedText from 'components/translations/TranslatedText'
import CloseButton from 'components/foundations/buttons/CloseButton'
import Colors from 'components/foundations/base/Colors'

import TipAmount from './TipAmount'

type Props = {
  addressToTip: string,
  onClose: () => void,
  usernameToTip: string
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Colors.blackTransparent};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
`

const Header = styled.div`
  color: ${Colors.white};
  font-weight: bold;
  font-size: 25px;
`

const ChoosePrompt = styled.div`
  margin-top: 10px;
  color: ${Colors.grayLight};
`

const TipAmounts = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  width: 78%;
  max-width: 640px;
`

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: ${VIDEO_OVERLAY_PADDING};
  right: ${VIDEO_OVERLAY_PADDING};
`

class TipOverlay extends React.Component<Props> {
  static defaultProps = {
    usernameToTip: 'foobar'
  }
  render () {
    const { onClose, usernameToTip } = this.props

    return (
      <Wrapper>
        <CloseButtonWrapper>
          <CloseButton onClick={onClose} />
        </CloseButtonWrapper>
        <Header>
          <TranslatedText message="tipping.header" />
        </Header>
        <ChoosePrompt>
          <TranslatedText
            message="tipping.chooseTip"
            options={{ username: usernameToTip }}
          />
        </ChoosePrompt>
        <TipAmounts>
          {TIPPING_PTI_AMOUNTS.map((amount: number) => (
            <TipAmount key={amount} amount={amount} onClick={() => {}} />
          ))}
        </TipAmounts>
      </Wrapper>
    )
  }
}

export default TipOverlay
