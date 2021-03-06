/* @flow */

import React from 'react'
import styled from 'styled-components'

import ParatiiLib from 'utils/ParatiiLib'
import { TOKEN_UNITS } from 'constants/ParatiiLibConstants'

import { VIDEO_OVERLAY_PADDING } from 'constants/UIConstants'
import {
  TIPPING_UI_STEPS,
  MAXIMUM_LAST_SECURED_FOR_PASSWORD_PROMPT_SECONDS
} from 'constants/TippingConstants'

import Video from 'records/VideoRecords'

import { FlexCenterStyle } from 'components/foundations/Styles'
import TranslatedText from 'components/translations/TranslatedText'
import BackButton from 'components/foundations/buttons/BackButton'
import CloseButton from 'components/foundations/buttons/CloseButton'
import Colors from 'components/foundations/base/Colors'
import ChooseAmountTipStep from './steps/ChooseAmountTipStep'
import ConfirmTipStep from './steps/ConfirmTipStep'
import TipCompleteStep from './steps/TipCompleteStep'

import type { TippingUIStep } from 'types/TippingTypes'

type Props = {
  addDoNotTipVideo: (videoId: string) => void,
  ptiBalance: string,
  lastSecuredTimestamp: number,
  notification: (Object, string) => void,
  setUserIsTipping: (isTipping: boolean) => void,
  video: Video
}

type State = {
  currentStep: TippingUIStep,
  tipAmount: number
}

const Wrapper = styled.div`
  ${FlexCenterStyle} width: 100%;
  height: 100%;
  background-color: ${Colors.blackMediumTransparent};
  flex-direction: column;
  text-align: center;
  position: relative;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : undefined)};
`

const BackButtonWrapper = styled.div`
  position: absolute;
  top: ${VIDEO_OVERLAY_PADDING};
  left: ${VIDEO_OVERLAY_PADDING};
`

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: ${VIDEO_OVERLAY_PADDING};
  right: ${VIDEO_OVERLAY_PADDING};
`

class TipOverlay extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      currentStep: TIPPING_UI_STEPS.CHOOSE_AMOUNT,
      tipAmount: 0
    }
  }

  backToChooseAmountStep = () => {
    this.setState({
      currentStep: TIPPING_UI_STEPS.CHOOSE_AMOUNT
    })
  }

  transferTip = async () => {
    try {
      const tipAmountWei: number = ParatiiLib.eth.web3.utils.toWei(
        `${this.state.tipAmount}`
      )
      await ParatiiLib.eth.transfer(
        this.props.video.get('owner'),
        tipAmountWei,
        TOKEN_UNITS.PTI
      )
      this.setState({
        currentStep: TIPPING_UI_STEPS.TIP_COMPLETE
      })
      this.props.addDoNotTipVideo(this.props.video.get('id'))
    } catch (e) {
      this.props.notification(
        {
          title: <TranslatedText message="tipping.tippingError" />
        },
        'error'
      )
    }
  }

  onChooseAmount = (amount: number) => {
    this.setState({
      currentStep: TIPPING_UI_STEPS.CONFIRM_TIP,
      tipAmount: amount
    })
  }

  onClick = () => {
    if (this.state.currentStep === TIPPING_UI_STEPS.TIP_COMPLETE) {
      this.onComplete()
    }
  }

  onClose = () => {
    this.props.setUserIsTipping(false)
  }

  onComplete = () => {
    this.props.setUserIsTipping(false)
  }

  showBackButton = () => this.state.currentStep === TIPPING_UI_STEPS.CONFIRM_TIP

  renderStep () {
    switch (this.state.currentStep) {
      case TIPPING_UI_STEPS.CHOOSE_AMOUNT:
        return (
          <ChooseAmountTipStep
            ptiBalance={this.props.ptiBalance}
            usernameToTip={this.props.video.get('author')}
            onChooseAmount={this.onChooseAmount}
          />
        )
      case TIPPING_UI_STEPS.CONFIRM_TIP:
        return (
          <ConfirmTipStep
            passwordRequired={
              (Date.now() - this.props.lastSecuredTimestamp) / 1000 >
              MAXIMUM_LAST_SECURED_FOR_PASSWORD_PROMPT_SECONDS
            }
            tipAmount={this.state.tipAmount}
            transferTip={this.transferTip}
          />
        )
      case TIPPING_UI_STEPS.TIP_COMPLETE:
        return (
          <TipCompleteStep usernameToTip={this.props.video.get('author')} />
        )
    }
  }

  render () {
    return (
      <Wrapper
        clickable={this.state.currentStep === TIPPING_UI_STEPS.TIP_COMPLETE}
        data-test-id="tipping-overlay"
        onClick={this.onClick}
      >
        <BackButtonWrapper>
          {this.showBackButton() && (
            <BackButton onClick={this.backToChooseAmountStep} />
          )}
        </BackButtonWrapper>
        <CloseButtonWrapper>
          <CloseButton onClick={this.onClose} />
        </CloseButtonWrapper>
        {this.renderStep()}
      </Wrapper>
    )
  }
}

export default TipOverlay
