/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import NumPad from 'components/widgets/NumPad'
import { ModalContentWrapper, ModalScrollContent } from './Modal'

type Props = {
  openModal: String => void,
  closeModal: () => void,
  secureKeystore: String => void
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

class ModalSetPin extends Component<Props, Object> {
  clearPin: () => void
  setPin: () => void
  handlePinChange: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      pin: '',
      newPin: '',
      isPin: false,
      checkPin: false,
      resetPinField: false,
      error: ''
    }
    this.clearPin = this.clearPin.bind(this)
    this.setPin = this.setPin.bind(this)
    this.handlePinChange = this.handlePinChange.bind(this)
  }

  clearPin () {
    // Totally reset the PIN
    this.setState({
      pin: '',
      newPin: '',
      isPin: false,
      checkPin: false,
      error: '',
      resetPinField: true
    })
  }

  setPin () {
    if (this.state.newPin !== '') {
      if (this.state.pin === this.state.newPin) {
        // Create new wallet and encrypt with this pin
        console.log('Create new wallet and encrypt with this pin')
        this.props.closeModal()
        this.props.secureKeystore(this.state.pin)
        // Close modal
      } else {
        // Error, the two pins are different
        this.setState({
          error: `Hey, you have insert two different pins`,
          resetPinField: true
        })
      }
    } else {
      this.setState({
        resetPinField: true,
        checkPin: true
      })
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
      } else {
        this.setState({
          newPin: pin
        })
      }
    }
  }

  render () {
    let header = ''
    // The first pin has not yet been set
    if (!this.state.checkPin) {
      header = (
        <div>
          <Title>Create a PIN.</Title>
          <Text small gray>
            This is the password for you account in this browser.
          </Text>
        </div>
      )
    } else {
      header = (
        <div>
          <Title>Check your PIN.</Title>
          <Text small gray>
            Please insert your PIN again
          </Text>
        </div>
      )
    }
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          {header}
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

export default ModalSetPin
