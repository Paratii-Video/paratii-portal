/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import TextField from 'components/widgets/forms/TextField'
import Button from 'components/foundations/Button'
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
  clearPassword: () => void
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
    this.clearPassword = this.clearPassword.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  clearPassword () {
    this.setState({
      assword: '',
      resetPasswordField: true,
      error: ''
    })
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
      this.props.setWalletData({ walletKey: 'keystore' })
      // Retrieve your videos
      this.props.fetchOwnedVideos()
      this.props.closeModal()
    } catch (err) {
      // wallet is not valid
      this.setState({
        error: err.message
      })
      this.props.notification(
        {
          title: err.message
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
            We found a private wallet on your localStorage, insert the password
            to <strong>decrypt</strong> it, and be able to use all the features
            of Paratii
          </Text>
          <FieldContainer>
            <TextField
              error={this.state.error.length > 0}
              label="New Password"
              id="input-new-password"
              name="input-new-password"
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
              <Button onClick={this.clearPassword}>Clear</Button>
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
