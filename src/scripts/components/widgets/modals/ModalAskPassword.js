/* @flow */
import paratii, { getSecureWallet } from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import TextField from 'components/widgets/forms/TextField'
import TextButton from 'components/foundations/TextButton'
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
  onComplete: Function,
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

  static defaultProps = {
    onComplete: () => {}
  }

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
    const walletString = getSecureWallet()
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
            title: (
              <TranslatedText message="wallet.enterPassword.success.title" />
            ),
            message: (
              <TranslatedText message="wallet.enterPassword.success.description" />
            )
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
        this.props.onComplete()
        this.props.closeModal()
      } catch (err) {
        // Password is not valid
        this.setState({
          error: (
            <TranslatedText message="wallet.enterPassword.error.formErrorMessage" />
          )
        })
        this.props.notification(
          {
            title: (
              <TranslatedText message="wallet.enterPassword.error.title" />
            ),
            message: (
              <TranslatedText message="wallet.enterPassword.error.description" />
            )
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
      <ModalContentWrapper data-test-id="ask-password-modal">
        <ModalScrollContent>
          <Title accent>
            <TranslatedText message="wallet.enterPassword.title" />
          </Title>
          <Text small>
            <TranslatedText message="wallet.enterPassword.description" />
          </Text>
          <FieldContainer id={FORM_ID} onSubmit={this.setPassword}>
            <TextField
              error={this.state.error.length > 0}
              label={RawTranslatedText({
                message: 'wallet.enterPassword.inputPlaceholder'
              })}
              id={'wallet-password'}
              name="wallet-password"
              type="password"
              value={this.state.password}
              onChange={e => this.handleInputChange('password', e)}
              margin="0 0 30px"
            />
            {this.state.error && (
              <Text warn small data-test-id="error-password">
                {this.state.error}
              </Text>
            )}
          </FieldContainer>
          <Footer>
            <ButtonContainer>
              <TextButton
                data-test-id="forgot-password-button"
                onClick={this.forgotPassword}
              >
                <TranslatedText message="wallet.enterPassword.forgotPassword" />
              </TextButton>
            </ButtonContainer>
            <ButtonContainer>
              <TextButton
                accent
                data-test-id="continue"
                form={FORM_ID}
                type="submit"
                disabled={!this.state.password}
              >
                <TranslatedText message="wallet.enterPassword.continue" />
              </TextButton>
            </ButtonContainer>
          </Footer>
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalAskPassword
