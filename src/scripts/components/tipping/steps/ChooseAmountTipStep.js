/* @flow */

import React, { Fragment } from 'react'
import styled from 'styled-components'

import { TIPPING_PTI_AMOUNTS } from 'constants/TippingConstants'

import TranslatedText from 'components/translations/TranslatedText'
import Colors from 'components/foundations/base/Colors'

import TipAmount from '../TipAmount'
import TippingStepHeader from '../utils/TippingStepHeader'

type Props = {
  onChooseAmount: (amount: number) => void,
  usernameToTip: string
}

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

class ChooseAmountToTipStep extends React.Component<Props> {
  static defaultProps = {
    usernameToTip: 'foobar'
  }

  render () {
    const { onChooseAmount, usernameToTip } = this.props

    return (
      <Fragment>
        <TippingStepHeader>
          <TranslatedText message="tipping.steps.chooseAmount.header" />
        </TippingStepHeader>
        <ChoosePrompt>
          <TranslatedText
            message="tipping.steps.chooseAmount.chooseTip"
            options={{ username: usernameToTip }}
          />
        </ChoosePrompt>
        <TipAmounts>
          {TIPPING_PTI_AMOUNTS.map((amount: number) => (
            <TipAmount
              key={amount}
              amount={amount}
              onClick={() => {
                onChooseAmount(amount)
              }}
            />
          ))}
        </TipAmounts>
      </Fragment>
    )
  }
}

export default ChooseAmountToTipStep
