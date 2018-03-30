/* @flow */
// import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import TextField from 'components/widgets/forms/TextField'

import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { MODAL } from 'constants/ModalConstants'

type Props = {
  openModal: String => void,
  restoreKeystore: String => void
}

const Title = styled.h2`
  color: ${props => props.theme.colors.Modal.title};
  font-size: ${props => props.theme.fonts.modal.title};
  margin-bottom: 25px;
`
//
// const Highlight = styled(Text)`
//   color: ${props => props.theme.colors.Modal.hightlight};
//   margin-bottom: 14px;
// `

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

class ModalRewriteSeed extends Component<Props, Object> {
  goBack: () => void
  restoreWallet: () => void
  handleMnemonicChange: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      mnemonic: '',
      error: ''
    }
    this.goBack = this.goBack.bind(this)
    this.restoreWallet = this.restoreWallet.bind(this)
    this.handleMnemonicChange = this.handleMnemonicChange.bind(this)
  }

  goBack () {
    this.props.openModal(MODAL.SECURE)
  }

  restoreWallet () {
    const mnemonic = this.state.mnemonic
    this.props.restoreKeystore(mnemonic)
    // sessionStorage.setItem('mnemonic-temp', mnemonic)
    this.props.openModal(MODAL.SET_PIN)
  }

  handleMnemonicChange (e: Object) {
    this.setState({
      mnemonic: e.target.value
    })
  }

  render () {
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>Write down your wallet seed</Title>
          <MainText small gray>
            Insert the 12 words to restors your wallet
          </MainText>
          <TextField
            label="Mnemonic"
            id="mnemonic"
            name="mnemonic-restore"
            type="text"
            value={this.state.mnemonic}
            onChange={e => this.handleMnemonicChange(e)}
            error={this.state.error.length > 0}
            margin="0 0 30px"
          />
          {this.state.error && (
            <Text pink small>
              {this.state.error}
            </Text>
          )}
          <Footer>
            <ButtonContainer>
              <Button onClick={this.goBack}>Go Back</Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                data-test-id="restore-wallet"
                purple
                onClick={this.restoreWallet}
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

export default ModalRewriteSeed
