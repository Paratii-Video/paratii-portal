/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import NumPad from 'components/widgets/NumPad'
import { WALLET_KEY_SECURE } from 'constants/ParatiiLibConstants'

import { ModalContentWrapper, ModalScrollContent } from './Modal'

type Props = {
  openModal: string => void,
  closeModal: () => void,
  notification: (Object, string) => void,
  setWalletAddress: Object => void,
  loadBalances: () => void
}

const Title = styled.h2`
  color: ${props => props.theme.colors.Modal.title};
  font-size: ${props => props.theme.fonts.modal.title};
  margin-bottom: 25px;
`

const MainText = styled(Text)`
  margin-bottom: 35px;
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

  clearPin () {
    this.setState({
      pin: '',
      resetPinField: true,
      error: ''
    })
  }

  setPin () {
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
      this.props.closeModal()
      const address = paratii.config.account.address
      console.log(address)
      this.props.setWalletAddress({ address })
      this.props.notification(
        {
          title: 'Success!',
          message: 'Your keystore has been unlocked...'
        },
        'success'
      )
      // Set the balance
      this.props.loadBalances()
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
          <MainText small gray>
            Insert your PIN to unlock the keystore.
          </MainText>

          <NumPad
            onSetPin={this.handlePinChange}
            reset={this.state.resetPinField}
            error={this.state.error.length > 0}
          />

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
