/* @flow */

import React from 'react'
import styled from 'styled-components'

import ParatiiLib from 'utils/ParatiiLib'
import { TOKEN_UNITS } from 'constants/ParatiiLibConstants'

import { VIDEO_OVERLAY_PADDING } from 'constants/UIConstants'
import { TIPPING_UI_STEPS } from 'constants/TippingConstants'

import Video from 'records/VideoRecords'

import TranslatedText from 'components/translations/TranslatedText'
import BackButton from 'components/foundations/buttons/BackButton'
import CloseButton from 'components/foundations/buttons/CloseButton'
import Colors from 'components/foundations/base/Colors'
import ChooseAmountTipStep from './steps/ChooseAmountTipStep'
import EnterPasswordTipStep from './steps/EnterPasswordTipStep'
import TipCompleteStep from './steps/TipCompleteStep'

import type { TippingUIStep } from 'types/TippingTypes'

type Props = {
  notification: (Object, string) => void,
  setUserIsTipping: (isTipping: boolean) => void,
  tipVideoCompleted: (videoId: string) => void,
  video: Video
}

type State = {
  currentStep: TippingUIStep,
  tipAmount: number
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Colors.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
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
      await ParatiiLib.eth.transfer(
        this.props.video.get('owner'),
        this.state.tipAmount,
        TOKEN_UNITS.PTI
      )
      this.setState({
        currentStep: TIPPING_UI_STEPS.TIP_COMPLETE
      })
      this.props.tipVideoCompleted(this.props.video.get('id'))
    } catch (e) {
      this.props.notification(
        {
          title: <TranslatedText message="tipping.tippingError" />
        },
        'error'
      )
    }
    this.setState({
      currentStep: TIPPING_UI_STEPS.TIP_COMPLETE
    })
    this.props.tipVideoCompleted(this.props.video.get('id'))
  }

  onChooseAmount = (amount: number) => {
    this.setState({
      currentStep: TIPPING_UI_STEPS.ENTER_PASSWORD,
      tipAmount: amount
    })
  }

  onClose = () => {
    this.props.setUserIsTipping(false)
  }

  onComplete = () => {
    this.props.setUserIsTipping(false)
  }

  showBackButton = () =>
    this.state.currentStep === TIPPING_UI_STEPS.ENTER_PASSWORD

  renderStep () {
    switch (this.state.currentStep) {
      case TIPPING_UI_STEPS.CHOOSE_AMOUNT:
        return (
          <ChooseAmountTipStep
            usernameToTip={this.props.video.get('author') || 'bent0b0x'}
            onChooseAmount={this.onChooseAmount}
          />
        )
      case TIPPING_UI_STEPS.ENTER_PASSWORD:
        return (
          <EnterPasswordTipStep
            tipAmount={this.state.tipAmount}
            onSuccessfulAuth={this.transferTip}
          />
        )
      case TIPPING_UI_STEPS.TIP_COMPLETE:
        return (
          <TipCompleteStep
            onComplete={this.onComplete}
            usernameToTip={this.props.video.get('author') || 'bent0b0x'}
          />
        )
    }
  }

  render () {
    return (
      <Wrapper>
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
