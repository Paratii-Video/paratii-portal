/* @flow */
// import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import TextField from 'components/widgets/forms/TextField'
import Text from 'components/foundations/Text'
import TextButton from 'components/foundations/TextButton'
import PadLockSvg from 'components/foundations/svgs/PadlockSvg'
import TranslatedText from 'components/translations/TranslatedText'
import RawTranslatedText from 'utils/translations/RawTranslatedText'
import { ModalContentWrapper, ModalScrollContent } from './Modal'
import {
  PASSWORD_TEMP,
  NEW_ACCOUNT,
  RESTORE_ACCOUNT
} from 'constants/ParatiiLibConstants'
import { MODAL } from 'constants/ModalConstants'

const FORM_ID: string = 'create-password-form'

type Props = {
  openModal: (string, ?Object) => void,
  onComplete: Function,
  closeModal: () => void,
  secureKeystore: string => void,
  context: string
}

type State = {
  password: string,
  confirm: string,
  errors: Array<*>,
  hasBlurredPasswordInput: boolean,
  hasAttemptedToSubmit: boolean
}

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  width: 100%;
`

const ButtonContainer = styled.div`
  margin-left: 10px;
`

const Icon = styled.div`
  height: 180px;
  margin: 40px 0;
  width: 100%;
`

const Errors = styled.div`
  min-height: 100px;
`

class ModalSetPassword extends Component<Props, State> {
  setPassword: () => void
  secureAccount: () => void
  handleInputChange: (input: string, e: Object) => void

  static defaultProps = {
    onComplete: () => {}
  }

  constructor (props: Props) {
    super(props)
    this.state = {
      password: '',
      confirm: '',
      errors: [],
      hasBlurredPasswordInput: false,
      hasAttemptedToSubmit: false
    }
    this.setPassword = this.setPassword.bind(this)
    this.secureAccount = this.secureAccount.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  secureAccount () {
    this.props.openModal(MODAL.SECURE)
  }

  setPassword (e: Object) {
    e.preventDefault()
    const errors: Array<*> = this.getPasswordValidationErrors(
      this.state.password
    )

    this.setState(
      {
        errors,
        hasAttemptedToSubmit: true
      },
      () => {
        const { errors } = this.state
        if (!errors.length) {
          if (this.state.password === this.state.confirm) {
            if (this.props.context === NEW_ACCOUNT) {
              sessionStorage.setItem(PASSWORD_TEMP, this.state.password)
              this.props.openModal(MODAL.SHOW_SEED)
            } else if (this.props.context === RESTORE_ACCOUNT) {
              this.props.secureKeystore(this.state.password)
              this.props.closeModal()
              this.props.onComplete()
            }
          }
        }
      }
    )
  }

  handleInputChange (input: string, e: Object) {
    const value: string = e.target.value
    const stateToMerge: Object = {
      [input]: value
    }
    if (input === 'password') {
      stateToMerge.errors = this.getPasswordValidationErrors(value)
    }
    this.setState(stateToMerge)
  }

  handlePasswordInputBlur = () => {
    this.setState((prevState: State) => {
      if (!prevState.hasBlurredPasswordInput) {
        return {
          hasBlurredPasswordInput: true
        }
      }
    })
  }

  getPasswordErrors () {
    const passwordErrors: Array<*> =
      (this.state.hasBlurredPasswordInput && this.state.errors) || []
    return passwordErrors
  }

  getConfirmErrors () {
    const confirmErrors: Array<*> =
      (this.state.hasAttemptedToSubmit &&
        this.state.password !== this.state.confirm && [
        <TranslatedText
          key="passwordMismatch"
          message="wallet.choosePassword.errors.passwordMismatch"
        />
      ]) ||
      []

    return confirmErrors
  }

  getPasswordValidationErrors = (password: ?string): Array<*> => {
    const longRegex = new RegExp('^(?=.{8,})')
    const numberRegex = new RegExp('^(?=.*[0-9])')
    const uppercaseRegex = new RegExp('^(?=.*[A-Z])')
    const errors = []
    if (password) {
      if (!longRegex.test(password)) {
        errors.push(
          <TranslatedText message="wallet.choosePassword.errors.eightCharacters" />
        )
      }
      if (!numberRegex.test(password)) {
        errors.push(
          <TranslatedText message="wallet.choosePassword.errors.numericCharacter" />
        )
      }
      if (!uppercaseRegex.test(password)) {
        errors.push(
          <TranslatedText message="wallet.choosePassword.errors.uppercaseCharacter" />
        )
      }
    }
    return errors
  }

  getAllErrors () {
    return this.getPasswordErrors().concat(this.getConfirmErrors())
  }

  renderErrors () {
    return (
      <Errors>
        {this.getAllErrors().map((error: any) => (
          <Text pink small key={error} data-test-id="error-password">
            {error}
          </Text>
        ))}
      </Errors>
    )
  }

  render () {
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <form id={FORM_ID} onSubmit={this.setPassword}>
            <Title accent>
              <TranslatedText message="wallet.choosePassword.title" />
            </Title>
            <Text small>
              <TranslatedText message="wallet.choosePassword.description_html" />
            </Text>
            <Icon>
              <PadLockSvg />
            </Icon>
            <TextField
              error={this.getPasswordErrors().length > 0}
              label={RawTranslatedText({
                message: 'wallet.choosePassword.newPasswordLabel'
              })}
              id="input-new-password"
              name="input-new-password"
              type="password"
              value={this.state.password}
              onBlur={this.handlePasswordInputBlur}
              onChange={e => this.handleInputChange('password', e)}
              margin="0 0 30px"
            />
            <TextField
              error={this.getConfirmErrors().length > 0}
              label={RawTranslatedText({
                message: 'wallet.choosePassword.confirmPasswordLabel'
              })}
              id="input-confirm-password"
              name="input-confirm-password"
              type="password"
              value={this.state.confirm}
              onChange={e => this.handleInputChange('confirm', e)}
              margin="0 0 30px"
            />
          </form>
          {this.renderErrors()}
          <Footer>
            <ButtonContainer>
              <TextButton onClick={this.secureAccount}>
                <TranslatedText message="wallet.choosePassword.back" />
              </TextButton>
            </ButtonContainer>
            <ButtonContainer>
              <TextButton
                form={FORM_ID}
                type="submit"
                data-test-id="continue"
                accent
                disabled={!this.state.confirm}
              >
                <TranslatedText message="wallet.choosePassword.continue" />
              </TextButton>
            </ButtonContainer>
          </Footer>
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalSetPassword
