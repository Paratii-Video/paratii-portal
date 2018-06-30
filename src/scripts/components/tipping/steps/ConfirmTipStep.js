/* @flow */

import React, { Fragment } from 'react'
import styled from 'styled-components'

import paratii, { getSecureWallet } from 'utils/ParatiiLib'

import RawTranslatedText from 'utils/translations/RawTranslatedText'

import Colors from 'components/foundations/base/Colors'
import Button from 'components/foundations/Button'
import Input from 'components/foundations/forms/Input'
import TranslatedText from 'components/translations/TranslatedText'

import TippingStepHeader from '../utils/TippingStepHeader'
import TipAmount from '../utils/TipAmount'

const FORM_ID: string = 'TIP_PASSWORD_FORM'

const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 65%;
  align-items: center;
`

const TipAmountWrapper = styled.div`
  margin-top: 25px;
`

const BottomBar = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
  margin-top: 25px;
  align-items: center;
  justify-content: flex-end;
`

const PasswordError = styled.div`
  color: ${Colors.pink};
  flex: 0 1 100%;
  text-align: left;
`

const ContinueButton = styled(Button)`
  align-self: baseline;
  justify-self: 'flex-end';
  margin: ${({ centered }) => (centered ? 'auto' : undefined)};
`

type Props = {
  passwordRequired: boolean,
  transferTip: () => Promise<void>,
  tipAmount: number
}

type State = {
  password: string,
  showPasswordError: boolean
}

class ConfirmTipStep extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      password: '',
      showPasswordError: false
    }
  }

  showPasswordInput = (): boolean => !!this.props.passwordRequired

  onPasswordChange = (e: Object): void => {
    this.setState({
      password: e.target.value
    })
  }

  onSubmitPassword = (e: Object): void => {
    e.preventDefault()

    const walletString: string = getSecureWallet()

    try {
      if (this.props.passwordRequired) {
        paratii.eth.wallet.decrypt(
          JSON.parse(walletString),
          this.state.password
        )
        this.setState({
          showPasswordError: false
        })
      }

      this.props.transferTip()
    } catch (e) {
      this.setState({
        showPasswordError: true
      })
    }
  }

  render () {
    return (
      <Fragment>
        <TippingStepHeader>
          <TranslatedText message="tipping.steps.enterPassword.header" />
        </TippingStepHeader>
        <TipAmountWrapper>
          <TipAmount amount={this.props.tipAmount} />
        </TipAmountWrapper>
        <PasswordForm id={FORM_ID} onSubmit={this.onSubmitPassword}>
          {this.showPasswordInput() && (
            <Input
              type="password"
              error={this.state.showPasswordError}
              placeholder={RawTranslatedText({
                message: 'tipping.steps.enterPassword.inputPlaceholder'
              })}
              onChange={this.onPasswordChange}
              value={this.state.password}
            />
          )}
          <BottomBar>
            {this.state.showPasswordError && (
              <PasswordError>
                <TranslatedText message="tipping.steps.enterPassword.wrongPassword" />
              </PasswordError>
            )}
            <ContinueButton
              centered={!this.showPasswordInput()}
              white
              form={FORM_ID}
              disabled={
                this.props.passwordRequired && !this.state.password.trim()
              }
              type="submit"
            >
              <TranslatedText message="tipping.steps.enterPassword.continue" />
            </ContinueButton>
          </BottomBar>
        </PasswordForm>
      </Fragment>
    )
  }
}

export default ConfirmTipStep
