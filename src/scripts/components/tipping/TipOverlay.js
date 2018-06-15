/* @flow */

import React from 'react'
import styled from 'styled-components'

import ParatiiLib from 'utils/ParatiiLib'
import { TOKEN_UNITS } from 'constants/ParatiiLibConstants'

import { VIDEO_OVERLAY_PADDING } from 'constants/UIConstants'
import { TIPPING_UI_STEPS } from 'constants/TippingConstants'

import CloseButton from 'components/foundations/buttons/CloseButton'
import Colors from 'components/foundations/base/Colors'
import ChooseAmountTipStep from './steps/ChooseAmountTipStep'
import EnterPasswordTipStep from './steps/EnterPasswordTipStep'
import TipCompleteStep from './steps/TipCompleteStep'

import type { TippingUIStep } from 'types/TippingTypes'

type Props = {
  addressToTip: string,
  onClose: () => void,
  usernameToTip: string
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

  onTip = async () => {
    await ParatiiLib.eth.transfer(
      this.props.addressToTip,
      this.state.tipAmount,
      TOKEN_UNITS.PTI
    )
    this.setState({
      currentStep: TIPPING_UI_STEPS.TIP_COMPLETE
    })
  }

  onChooseAmount = (amount: number) => {
    this.setState({
      currentStep: TIPPING_UI_STEPS.ENTER_PASSWORD,
      tipAmount: amount
    })
  }

  renderStep () {
    switch (this.state.currentStep) {
      case TIPPING_UI_STEPS.CHOOSE_AMOUNT:
        return (
          <ChooseAmountTipStep
            usernameToTip={this.props.usernameToTip || 'bent0b0x'}
            onChooseAmount={this.onChooseAmount}
          />
        )
      case TIPPING_UI_STEPS.ENTER_PASSWORD:
        return (
          <EnterPasswordTipStep
            tipAmount={this.state.tipAmount}
            onSuccessfulAuth={() => {}}
          />
        )
      case TIPPING_UI_STEPS.TIP_COMPLETE:
        return (
          <TipCompleteStep
            onComplete={this.props.onClose}
            usernameToTip={this.props.usernameToTip || 'bent0b0x'}
          />
        )
    }
  }

  render () {
    return (
      <Wrapper>
        <CloseButtonWrapper>
          <CloseButton onClick={this.props.onClose} />
        </CloseButtonWrapper>
        {this.renderStep()}
      </Wrapper>
    )
  }
}

export default TipOverlay
