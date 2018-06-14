/* @flow */

import React from 'react'
import styled from 'styled-components'

import { VIDEO_OVERLAY_PADDING } from 'constants/UIConstants'
import { TIPPING_UI_STEPS } from 'constants/TippingConstants'

import CloseButton from 'components/foundations/buttons/CloseButton'
import Colors from 'components/foundations/base/Colors'
import ChooseAmountTipStep from './steps/ChooseAmountTipStep'
import EnterPasswordTipStep from './steps/EnterPasswordTipStep'

import type { TippingUIStep } from 'types/TippingTypes'

type Props = {
  addressToTip: string,
  onClose: () => void,
  usernameToTip: string
}

type State = {
  currentStep: TippingUIStep,
  selectedAmount: number
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
      selectedAmount: 0
    }
  }

  onChooseAmount = (amount: number) => {
    this.setState({
      currentStep: TIPPING_UI_STEPS.ENTER_PASSWORD,
      selectedAmount: amount
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
            tipAmount={this.state.selectedAmount}
            onSuccessfulAuth={() => {}}
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
