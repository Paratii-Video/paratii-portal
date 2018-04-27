/* @flow */
// import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import TextField from 'components/widgets/forms/TextField'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import { getPasswordValidationErrors } from 'utils/AppUtils'
import BigLockSvg from 'components/foundations/svgs/BigLockSvg'
import { ModalContentWrapper, ModalScrollContent } from './Modal'
import {
  PASSWORD_TEMP,
  NEW_ACCOUNT,
  RESTORE_ACCOUNT
} from 'constants/ParatiiLibConstants'
import { MODAL } from 'constants/ModalConstants'

const FORM_ID: string = 'create-password-form'

type Props = {
  openModal: string => void,
  closeModal: () => void,
  secureKeystore: string => void,
  getContext: string
}

type State = {
  password: string,
  confirm: string,
  errors: Array<string>,
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
  margin: 40px 0 54px;
  width: 100%;
`

const Errors = styled.div`
  min-height: 100px;
`

class ModalSetPassword extends Component<Props, State> {
  setPassword: () => void
  secureAccount: () => void
  handleInputChange: (input: string, e: Object) => void

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
    const errors: Array<string> = getPasswordValidationErrors(
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
            if (this.props.getContext === NEW_ACCOUNT) {
              sessionStorage.setItem(PASSWORD_TEMP, this.state.password)
              this.props.openModal(MODAL.SHOW_SEED)
            } else if (this.props.getContext === RESTORE_ACCOUNT) {
              this.props.secureKeystore(this.state.password)
              this.props.closeModal()
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
      stateToMerge.errors = getPasswordValidationErrors(value)
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
    const passwordErrors: Array<string> =
      (this.state.hasBlurredPasswordInput && this.state.errors) || []
    return passwordErrors
  }

  getConfirmErrors () {
    const confirmErrors: Array<string> =
      (this.state.hasAttemptedToSubmit &&
        this.state.password !== this.state.confirm && [
        'Hey, your passwords do not match'
      ]) ||
      []

    return confirmErrors
  }

  getAllErrors () {
    return this.getPasswordErrors().concat(this.getConfirmErrors())
  }

  renderErrors () {
    return (
      <Errors>
        {this.getAllErrors().map((error: string) => (
          <Text pink small key={error}>
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
            <Title>Choose a password</Title>
            <Text small gray>
              Please insert a password of <strong>eight</strong> characters or
              longer, and it must contain at least on <strong>uppercase</strong>
              letter and on <strong>number</strong>
            </Text>
            <Icon>
              <BigLockSvg />
            </Icon>
            <TextField
              error={this.getPasswordErrors().length > 0}
              label="New Password"
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
              label="Confirm Password"
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
              <Button onClick={this.secureAccount}>Back</Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                form={FORM_ID}
                type="submit"
                data-test-id="continue"
                purple
                disabled={!this.state.confirm}
              >
                Continue
              </Button>
            </ButtonContainer>
          </Footer>
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalSetPassword
