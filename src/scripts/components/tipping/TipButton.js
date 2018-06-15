/* @flow */

import React from 'react'
import styled from 'styled-components'

import CloseButton from 'components/foundations/buttons/CloseButton'
import Icon from 'components/foundations/Icon'
import Colors from 'components/foundations/base/Colors'
import TranslatedText from 'components/translations/TranslatedText'

import Video from 'records/VideoRecords'

import coinDataUrl from 'assets/svg/coin.svg'

type Props = {
  addDoNotTipVideo: (videoId: string) => void,
  setUserIsTipping: (isTipping: boolean) => void,
  video: Video
}

const WrappedButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
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
    this.props.setUserIsTipping(true)
  }

  onClose = (e: Object) => {
    this.props.addDoNotTipVideo(this.props.video.get('id'))

    e.stopPropagation()
  }

  render () {
    return (
      <WrappedButton onClick={this.onClick}>
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
