/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import NumPad from 'components/widgets/NumPad'
import {
  WALLET_KEY_SECURE,
  MNEMONIC_KEY_TEMP
} from 'constants/ParatiiLibConstants'

import { ModalContentWrapper, ModalScrollContent } from './Modal'

type Props = {
  openModal: string => void,
  closeModal: () => void,
  notification: (Object, string) => void,
  setWalletAddress: Object => void,
  setAddressAndBalance: () => void,
  fetchOwnedVideos: () => void
}

const PadWrapper = styled.div`
  margin: 66px 0 96px;

  @media (max-width: 767px) {
    margin-bottom: 0;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  width: 100%;
`

const ButtonContainer = styled.div`
  margin-left: 10px;
`

class ModalAskPin extends Component<Props, Object> {
  clearPin: () => void
  setPin: () => void
  handlePinChange: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      pin: '',
      isPin: false,
      resetPinField: false,
      error: ''
    }
    this.clearPin = this.clearPin.bind(this)
    this.setPin = this.setPin.bind(this)
    this.handlePinChange = this.handlePinChange.bind(this)
  }

  componentDidMount (): void {
    this.addKeyDownEventListeners()
  }

  componentWillUnmount (): void {
    this.removeKeyDownEventListeners()
  }

  addKeyDownEventListeners () {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  removeKeyDownEventListeners () {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this))
  }

  handleKeyDown (event: Object) {
    if (event.keyCode === 13 /* enter */) {
      this.setPin()
    }
    if (this.state.isPin && event.keyCode === 8 /* backspace */) {
      this.clearPin()
    }
  }

  clearPin () {
    this.setState({
      pin: '',
      resetPinField: true,
      error: ''
    })
  }

  setPin () {
    sessionStorage.removeItem(MNEMONIC_KEY_TEMP)
    // Decrypt Keystore
    const pin = this.state.pin
    const walletString = localStorage.getItem(WALLET_KEY_SECURE) || ''
    this.props.notification(
      { title: 'Trying to unlock your keystore...' },
      'warning'
    )
    try {
      paratii.eth.wallet.clear()
      paratii.eth.wallet.decrypt(JSON.parse(walletString), pin)
      const address = paratii.eth.getAccount()
      this.props.setWalletAddress({ address })
      this.props.notification(
        {
          title: 'Success!',
          message: 'Your keystore has been unlocked.'
        },
        'success'
      )
      // Set the balance
      this.props.setAddressAndBalance()
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

  handlePinChange (pin: String) {
    this.setState({
      resetPinField: false,
      error: ''
    })
    if (pin && pin.length === 4) {
      if (!this.state.isPin) {
        this.setState({
          pin: pin,
          isPin: true
        })
      }
    }
  }

  render () {
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>Insert your PIN.</Title>
          <PadWrapper>
            <NumPad
              onSetPin={this.handlePinChange}
              reset={this.state.resetPinField}
              error={this.state.error.length > 0}
            />
          </PadWrapper>

          {this.state.error && (
            <Text pink small>
              {this.state.error}
            </Text>
          )}
          <Footer>
            <ButtonContainer>
              <Button onClick={this.clearPin}>Clear</Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                data-test-id="pin-continue"
                purple
                onClick={this.setPin}
                disabled={!this.state.isPin}
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

export default ModalAskPin
