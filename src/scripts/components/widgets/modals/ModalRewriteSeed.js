/* @flow */
// import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import TextField from 'components/widgets/forms/TextField'
import { MNEMONIC_KEY_TEMP } from 'constants/ParatiiLibConstants'

import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { MODAL } from 'constants/ModalConstants'

type Props = {
  openModal: String => void
}

const FieldContainer = styled.div`
  margin: 150px 0 190px;

  @media (max-width: 767px) {
    margin: 50px 0 0;
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
          <Title>Rewrite your account recovery key</Title>
          <Text small gray>
            Rewrite the 12 words set to continue the process
          </Text>
          <FieldContainer>
            <TextField
              label="Rewrite the 12 words phrase"
              id="mnemonic"
              name="rewrite-mnemonic"
              type="text"
              value={this.state.mnemonic}
              onChange={e => this.handleMnemonicChange(e)}
              error={this.state.error.length > 0}
              margin="0 0 30px"
            />
          </FieldContainer>

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
