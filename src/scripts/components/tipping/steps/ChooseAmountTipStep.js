/* @flow */

import React, { Fragment } from 'react'
import styled from 'styled-components'

import ParatiiLib from 'utils/ParatiiLib'
import RawTranslatedText from 'utils/translations/RawTranslatedText'

import { TIPPING_PTI_AMOUNTS } from 'constants/TippingConstants'

import Loader from 'components/foundations/Loader'
import TranslatedText from 'components/translations/TranslatedText'
import Colors from 'components/foundations/base/Colors'

import TipAmountButton from '../utils/TipAmountButton'
import TippingStepHeader from '../utils/TippingStepHeader'

type Props = {
  balancesAreLoading: boolean,
  ptiBalance: string,
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
  width: 100%;
  max-width: 640px;
`

const TipAmountWrapper = styled.div`
  margin: 0 2px;
`

class ChooseAmountToTipStep extends React.Component<Props> {
  usernameToTipOrDefault () {
    const { usernameToTip } = this.props

    return (
      usernameToTip ||
      RawTranslatedText({
        message: 'tipping.defaultAuthor'
      })
    )
  }

  render () {
    const { onChooseAmount } = this.props

    return (
      <Fragment>
        {this.props.balancesAreLoading ? (
          <Loader />
        ) : (
          <div data-test-id="choose-amount-tip-step">
            <TippingStepHeader>
              <TranslatedText message="tipping.steps.chooseAmount.header" />
            </TippingStepHeader>
            <ChoosePrompt>
              <TranslatedText
                message="tipping.steps.chooseAmount.chooseTip"
                options={{ username: this.usernameToTipOrDefault() }}
              />
            </ChoosePrompt>
            <TipAmounts>
              {TIPPING_PTI_AMOUNTS.map((amount: number) => (
                <TipAmountWrapper key={amount}>
                  <TipAmountButton
                    disabled={
                      this.props.ptiBalance <
                      ParatiiLib.eth.web3.utils.fromWei(`${amount}`)
                    }
                    amount={amount}
                    onClick={() => {
                      onChooseAmount(amount)
                    }}
                  />
                </TipAmountWrapper>
              ))}
            </TipAmounts>
          </div>
        )}
      </Fragment>
    )
  }
}

export default ChooseAmountToTipStep
