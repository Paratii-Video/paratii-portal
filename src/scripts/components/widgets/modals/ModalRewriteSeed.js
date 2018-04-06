/* @flow */
// import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import TextField from 'components/widgets/forms/TextField'
import { MNEMONIC_KEY_TEMP } from 'constants/ParatiiLibConstants'

import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { MODAL } from 'constants/ModalConstants'

type Props = {
  openModal: String => void
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
  showSeed: () => void
  checkSeed: () => void
  handleMnemonicChange: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      mnemonic: '',
      error: ''
    }
    this.showSeed = this.showSeed.bind(this)
    this.checkSeed = this.checkSeed.bind(this)
    this.handleMnemonicChange = this.handleMnemonicChange.bind(this)
  }

  showSeed () {
    this.props.openModal(MODAL.SHOW_SEED)
  }

  checkSeed () {
    console.log('Check Seed and chose pin')
    const mnemonic = sessionStorage.getItem(MNEMONIC_KEY_TEMP)
    if (this.state.mnemonic !== mnemonic) {
      this.setState({
        error: 'The mnemonic you insert is uncorrect'
      })
    } else {
      this.setState({ error: '' })
      console.log('set you pin')
      this.props.openModal(MODAL.SET_PIN)
    }
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
          <Title>Rewrite your account seed</Title>
          <MainText small gray>
            Rewrite your 12 words
          </MainText>
          <TextField
            label="Mnemonic"
            id="mnemonic"
            name="rewrite-mnemonic"
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
              <Button onClick={this.showSeed}>Go Back</Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button data-test-id="check-seed" purple onClick={this.checkSeed}>
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
