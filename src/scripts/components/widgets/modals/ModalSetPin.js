/* @flow */
// import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import NumPad from 'components/widgets/NumPad'

import { ModalContentWrapper, ModalScrollContent } from './Modal'

type Props = {
  openModal: String => void,
  closeModal: () => void,
  secureKeystore: String => void
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
      resetPinField: false,
      error: ''
    }
    this.clearPin = this.clearPin.bind(this)
    this.setPin = this.setPin.bind(this)
    this.handlePinChange = this.handlePinChange.bind(this)
  }

  clearPin () {
    if (this.state.isPin) {
      this.setState({
        newPin: '',
        resetPinField: true
      })
    } else {
      this.setState({
        pin: '',
        resetPinField: true
      })
    }
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
        resetPinField: true
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
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>Create a security PIN.</Title>
          <MainText small gray>
            It will work like a password for your account, in this browser.
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

export default ModalSetPin
