/* @flow */

import React, { Fragment } from 'react'
import styled from 'styled-components'

import { TIPPING_PTI_AMOUNTS } from 'constants/TippingConstants'

import TranslatedText from 'components/translations/TranslatedText'
import Colors from 'components/foundations/base/Colors'

import TipAmount from '../TipAmount'

type Props = {
  usernameToTip: string
}

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

class ChooseAmountToTipStep extends React.Component<Props> {
  static defaultProps = {
    usernameToTip: 'foobar'
  }

  render () {
    const { usernameToTip } = this.props

    return (
      <Fragment>
        <Header>
          <TranslatedText message="tipping.steps.chooseAmount.header" />
        </Header>
        <ChoosePrompt>
          <TranslatedText
            message="tipping.steps.chooseAmount.chooseTip"
            options={{ username: usernameToTip }}
          />
        </ChoosePrompt>
        <TipAmounts>
          {TIPPING_PTI_AMOUNTS.map((amount: number) => (
            <TipAmount key={amount} amount={amount} onClick={() => {}} />
          ))}
        </TipAmounts>
      </Fragment>
    )
  }
}

export default ChooseAmountToTipStep
