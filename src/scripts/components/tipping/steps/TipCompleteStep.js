/* @flow */

import React, { Fragment } from 'react'
import styled from 'styled-components'

import RawTranslatedText from 'utils/translations/RawTranslatedText'

import Colors from 'components/foundations/base/Colors'
import TranslatedText from 'components/translations/TranslatedText'
import Icon from 'components/foundations/Icon'

import TippingStepHeader from '../utils/TippingStepHeader'

import verifiedDataUrl from 'assets/svg/verified.svg'

type Props = {
  onComplete: () => void,
  usernameToTip: string
}

type State = {
  headerMessageIndex: number
}

const VERIFIED_ICON_DIMENSION: string = '100px'

const VerifiedIconWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
`

const ContinueButton = styled.button`
  color: ${Colors.white};
  font-weight: bold;
  text-transform: uppercase;
`

const NUMBER_OF_HEADERS: number = 3

class TipCompleteStep extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      headerMessageIndex: this.randomHeaderMessageIndex()
    }
  }

  usernameToTipOrDefault () {
    const { usernameToTip } = this.props

    return (
      usernameToTip ||
      RawTranslatedText({
        message: 'tipping.defaultAuthor'
      })
    )
  }

  randomHeaderMessageIndex (): number {
    return Math.floor(Math.random() * (NUMBER_OF_HEADERS - 1)) + 1
  }

  render () {
    return (
      <Fragment>
        <TippingStepHeader>
          <TranslatedText
            message={`tipping.steps.completed.header${
              this.state.headerMessageIndex
            }`}
            options={{
              username: this.usernameToTipOrDefault()
            }}
          />
        </TippingStepHeader>
        <VerifiedIconWrapper>
          <Icon
            color={Colors.purple}
            width={VERIFIED_ICON_DIMENSION}
            height={VERIFIED_ICON_DIMENSION}
            url={verifiedDataUrl}
          />
        </VerifiedIconWrapper>
        <ContinueButton onClick={this.props.onComplete}>
          <TranslatedText message="tipping.steps.completed.continueWatching" />
        </ContinueButton>
      </Fragment>
    )
  }
}

export default TipCompleteStep
