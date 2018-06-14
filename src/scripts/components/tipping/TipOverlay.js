/* @flow */

import React from 'react'
import styled from 'styled-components'

import { VIDEO_OVERLAY_PADDING } from 'constants/UIConstants'

import CloseButton from 'components/foundations/buttons/CloseButton'
import Colors from 'components/foundations/base/Colors'

import ChooseAmountTipStep from './steps/ChooseAmountTipStep'

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

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: ${VIDEO_OVERLAY_PADDING};
  right: ${VIDEO_OVERLAY_PADDING};
`

class TipOverlay extends React.Component<Props> {
  render () {
    const { onClose, usernameToTip } = this.props

    return (
      <Wrapper>
        <CloseButtonWrapper>
          <CloseButton onClick={onClose} />
        </CloseButtonWrapper>
        <ChooseAmountTipStep usernameToTip={usernameToTip || 'bent0b0x'} />
      </Wrapper>
    )
  }
}

export default TipOverlay
