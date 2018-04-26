/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import TextField from 'components/widgets/forms/TextField'
import Button from 'components/foundations/Button'
import { MODAL } from 'constants/ModalConstants'
import {
  WALLET_KEY_SECURE,
  MNEMONIC_KEY_TEMP
} from 'constants/ParatiiLibConstants'

import { ModalContentWrapper, ModalScrollContent } from './Modal'

type Props = {
  openModal: string => void,
  closeModal: () => void,
  notification: (Object, string) => void,
  setWalletData: Object => void,
  setAddressAndBalance: () => void,
  fetchOwnedVideos: () => void
}

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  width: 100%;
`

const FieldContainer = styled.div`
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

  setPassword () {
    sessionStorage.removeItem(MNEMONIC_KEY_TEMP)
    // Decrypt Keystore
    const password = this.state.password
    const walletString = localStorage.getItem(WALLET_KEY_SECURE) || ''
    this.props.notification(
      { title: 'Trying to unlock your keystore...' },
      'warning'
    )
    try {
      paratii.eth.wallet.clear()
      paratii.eth.wallet.decrypt(JSON.parse(walletString), password)
      this.props.notification(
        {
          title: 'Success!',
          message: 'Your keystore has been unlocked.'
        },
        'success'
      )
      // Set the balance
      this.props.setAddressAndBalance()
      this.props.setWalletData({ walletKey: WALLET_KEY_SECURE })
      // Retrieve your videos
      this.props.fetchOwnedVideos()
      this.props.closeModal()
    } catch (err) {
      // Password is not valid
      this.setState({
        error: 'The password is not valid, please retype the password'
      })
      this.props.notification(
        {
          title: 'The password is not valid',
          message: 'Please retype the password.'
        },
        'error'
      )
      throw err
    }
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
          <FieldContainer>
            <TextField
              error={this.state.error.length > 0}
              label="Insert your Password"
              id="wallet-password"
              name="wallet-password"
              type="password"
              value={this.state.password}
              onChange={e => this.handleInputChange('password', e)}
              margin="0 0 30px"
            />
            {this.state.error && (
              <Text pink small>
                {this.state.error}
              </Text>
            )}
          </FieldContainer>
          <Footer>
            <ButtonContainer>
              <Button onClick={this.forgotPassword}>Forgot Password</Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                data-test-id="continue"
                purple
                onClick={this.setPassword}
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
