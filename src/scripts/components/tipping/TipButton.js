/* @flow */

import React from 'react'
import styled from 'styled-components'

import { FlexCenterStyle } from 'components/foundations/Styles'
import CloseButton from 'components/foundations/buttons/CloseButton'
import Icon from 'components/foundations/Icon'
import Colors from 'components/foundations/base/Colors'
import TranslatedText from 'components/translations/TranslatedText'

import Video from 'records/VideoRecords'

import coinDataUrl from 'assets/svg/coin.svg'

type Props = {
  addDoNotTipVideo: (videoId: string) => void,
  checkUserWallet: ({ onComplete: ?Function }) => void,
  setUserIsTipping: (isTipping: boolean) => void,
  walletIsSecure: boolean,
  video: Video
}

const WrappedButton = styled.button`
  ${FlexCenterStyle} text-transform: uppercase;
  font-weight: bold;
  padding: 5px 20px;
  background-color: ${Colors.purple};
  color: ${Colors.white};
  height: 56px;
  width: 208px;
  font-size: 18px;
  transform: all 250ms linear;
`

const IconWrapper = styled.span`
  margin-right: 10px;
  flex: 0 0 auto;
`

const TextWrapper = styled.span`
  flex: 0 0 auto;
`

const CloseButtonWrapper = styled.span`
  flex: 0 1 100%;
  display: flex;
  justify-content: flex-end;
`

class TipButton extends React.Component<Props> {
  onClick = (e: Object) => {
    if (!this.props.walletIsSecure) {
      this.props.checkUserWallet({
        onComplete: () => {
          this.props.setUserIsTipping(true)
        }
      })
    } else {
      this.props.setUserIsTipping(true)
    }
  }

  onClose = (e: Object) => {
    this.props.addDoNotTipVideo(this.props.video.get('id'))

    e.stopPropagation()
  }

  render () {
    return (
      <WrappedButton data-test-id="tip-button" onClick={this.onClick}>
        <IconWrapper>
          <Icon color={Colors.white} url={coinDataUrl} />
        </IconWrapper>
        <TextWrapper>
          <TranslatedText message="tipping.giveTip" />
        </TextWrapper>
        <CloseButtonWrapper>
          <CloseButton onClick={this.onClose} />
        </CloseButtonWrapper>
      </WrappedButton>
    )
  }
}

export default TipButton
