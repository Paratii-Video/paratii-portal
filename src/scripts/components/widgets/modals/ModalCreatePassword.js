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

type Props = {
  openModal: String => void,
  closeModal: () => void,
  secureKeystore: String => void,
  getContext: String
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

class ModalSetPassword extends Component<Props, Object> {
  setPassword: () => void
  secureAccount: () => void
  handleInputChange: (input: string, e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      password: '',
      confirm: '',
      errors: []
    }
    this.setPassword = this.setPassword.bind(this)
    this.secureAccount = this.secureAccount.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  secureAccount () {
    this.props.openModal(MODAL.SECURE)
  }

  setPassword () {
    const errors: Array<string> = getPasswordValidationErrors(
      this.state.password
    )

    this.setState(
      {
        errors
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
          } else {
            // Error, the two Passwords are different
            this.setState({
              error: `Hey, your passwords do not match`
            })
          }
        }
      }
    )
  }

  handleInputChange (input: string, e: Object) {
    this.setState({
      [input]: e.target.value,
      error: ''
    })
  }

  render () {
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
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
            error={this.state.errors.length > 0}
            label="New Password"
            id="input-new-password"
            name="input-new-password"
            type="password"
            value={this.state.password}
            onChange={e => this.handleInputChange('password', e)}
            margin="0 0 30px"
          />
          <TextField
            error={this.state.errors.length > 0}
            label="Confirm Password"
            id="input-confirm-password"
            name="input-confirm-password"
            type="password"
            value={this.state.confirm}
            onChange={e => this.handleInputChange('confirm', e)}
            margin="0 0 30px"
          />
          {this.state.errors.map((error: string) => (
            <Text pink small key={error}>
              {error}
            </Text>
          ))}
          <Footer>
            <ButtonContainer>
              <Button onClick={this.secureAccount}>Back</Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                data-test-id="continue"
                purple
                onClick={this.setPassword}
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
