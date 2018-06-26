/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import TextField from 'components/widgets/forms/TextField'
import Button from 'components/foundations/Button'
import TranslatedText from 'components/translations/TranslatedText'
import RawTranslatedText from 'utils/translations/RawTranslatedText'
import { MODAL } from 'constants/ModalConstants'
import {
  WALLET_KEY_SECURE,
  MNEMONIC_KEY_TEMP
} from 'constants/ParatiiLibConstants'
import { NOTIFICATION_DELAY_MS } from 'constants/ApplicationConstants'

import { ModalContentWrapper, ModalScrollContent } from './Modal'

const FORM_ID: string = 'ask-password-form'

type Props = {
  openModal: string => void,
  closeModal: () => void,
  notification: (Object, string) => void,
  setWalletData: Object => void,
  setAddressAndBalance: () => void,
  setUserData: () => void,
  fetchOwnedVideos: () => void
}

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  width: 100%;
`

const FieldContainer = styled.form`
  margin: 164px 0 220px;

  @media (max-width: 767px) {
    margin: 50px 0 0;
  }
`

const ButtonContainer = styled.div`
  margin-left: 10px;
`

class ModalAskPassword extends Component<Props, Object> {
  forgotPassword: () => void
  setPassword: () => void
  handleInputChange: (input: string, e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      password: '',
      isPassword: false,
      resetPasswordField: false,
      error: ''
    }
    this.forgotPassword = this.forgotPassword.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  forgotPassword () {
    this.props.openModal(MODAL.RESTORE_ACCOUNT)
  }

  setPassword (e: Object) {
    e.preventDefault()
    sessionStorage.removeItem(MNEMONIC_KEY_TEMP)
    // Decrypt Keystore
    const password = this.state.password
    const walletString = localStorage.getItem(WALLET_KEY_SECURE) || ''
    this.props.notification(
      { title: <TranslatedText message="wallet.unlockingKeystore" /> },
      'warning'
    )

    setTimeout(() => {
      try {
        paratii.eth.wallet.clear()
        paratii.eth.wallet.decrypt(JSON.parse(walletString), password)
        this.props.notification(
          {
            title: <TranslatedText message="wallet.enterPassword.success.title" />,
            message: <TranslatedText message='wallet.enterPassword.success.description' />

          },
          'success'
        )
        // Set the balance
        this.props.setAddressAndBalance()
        this.props.setWalletData({ walletKey: WALLET_KEY_SECURE })
        /// Update user data in redux state
        this.props.setUserData()
        // Retrieve your videos
        this.props.fetchOwnedVideos()
        this.props.closeModal()
      } catch (err) {
        // Password is not valid
        this.setState({
          error: <TranslatedText message="wallet.enterPassword.error.formErrorMessage" />
        })
        this.props.notification(
          {
            title: <TranslatedText message='wallet.enterPassword.error.title' />,
            message: <TranslatedText message='wallet.enterPassword.error.description' />
          },
          'error'
        )
      }
    }, NOTIFICATION_DELAY_MS)
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
          <Title>Insert your Password</Title>
          <Text small gray>
            Please insert your password to use all the features of Paratii
          </Text>
          <FieldContainer id={FORM_ID} onSubmit={this.setPassword}>
            <TextField
              error={this.state.error.length > 0}
              label="Insert your Password"
              id={'wallet-password'}
              name="wallet-password"
              type="password"
              value={this.state.password}
              onChange={e => this.handleInputChange('password', e)}
              margin="0 0 30px"
            />
            {this.state.error && (
              <Text pink small data-test-id="error-password">
                {this.state.error}
              </Text>
            )}
          </FieldContainer>
          <Footer>
            <ButtonContainer>
              <Button
                data-test-id="forgot-password-button"
                onClick={this.forgotPassword}
              >
                Forgot Password
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                data-test-id="continue"
                form={FORM_ID}
                type="submit"
                purple
                disabled={!this.state.password}
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

export default ModalAskPassword
