/* @flow */

import React, { Fragment } from 'react'
import styled from 'styled-components'

import RawTranslatedText from 'utils/translations/RawTranslatedText'

import Button from 'components/foundations/Button'
import Input from 'components/foundations/forms/Input'
import TranslatedText from 'components/translations/TranslatedText'

import TippingStepHeader from '../utils/TippingStepHeader'

const FORM_ID: string = 'PASSWORD_FORM'

const PasswordForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
`

const ContinueButton = styled(Button)`
  margin-top: 20px;
  align-self: flex-end;
`

type Props = {
  onSuccessfulAuth: () => void,
  tipAmount: number
}

type State = {
  password: string,
  showPasswordError: boolean
}

class EnterPasswordTipStep extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      password: '',
      showPasswordError: false
    }
  }

  onPasswordChange = (e: Object): void => {
    this.setState({
      password: e.target.value
    })
  }

  render () {
    return (
      <Fragment>
        <TippingStepHeader>
          <TranslatedText message="tipping.steps.enterPassword.header" />
        </TippingStepHeader>
        <PasswordForm id={FORM_ID}>
          <Input
            placeholder={RawTranslatedText({
              message: 'tipping.steps.enterPassword.inputPlaceholder'
            })}
            onChange={this.onPasswordChange}
            value={this.state.password}
          />
          <ContinueButton disabled={!this.state.password.trim()} type="submit">
            Continue
          </ContinueButton>
        </PasswordForm>
      </Fragment>
    )
  }
}

export default EnterPasswordTipStep
