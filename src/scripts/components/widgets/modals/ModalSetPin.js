/* @flow */
// import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import NumPad from 'components/widgets/NumPad'

import { ModalContentWrapper, ModalScrollContent } from './Modal'

type Props = {
  openModal: () => void
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
  showSeed: () => void
  setPin: () => void
  handlePinChange: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      pin: '',
      error: ''
    }
    this.showSeed = this.showSeed.bind(this)
    this.setPin = this.setPin.bind(this)
    this.handlePinChange = this.handlePinChange.bind(this)
  }

  showSeed () {
    this.props.openModal('ModalShowSeed')
  }

  setPin () {
    console.log('Check Seed and chose pin')
    console.log(this.state.pin)
  }

  handlePinChange (pin: String) {
    console.log(pin)
    this.setState({
      pin: pin
    })
  }

  render () {
    let isPinSet = false
    if (this.state.pin.length === 4) {
      isPinSet = true
    }
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>Create a security PIN.</Title>
          <MainText small gray>
            It will work like a password for your account, in this browser.
          </MainText>

          <NumPad onSetPin={this.handlePinChange} />

          {this.state.error && (
            <Text pink small>
              {this.state.error}
            </Text>
          )}
          <Footer>
            <ButtonContainer>
              <Button onClick={this.showSeed}>Go Back</Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button purple onClick={this.setPin} disabled={!isPinSet}>
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
