/* @flow */
// import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import TextButton from 'components/foundations/TextButton'
import TextField from 'components/widgets/forms/TextField'
import { MNEMONIC_KEY_TEMP } from 'constants/ParatiiLibConstants'

import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { MODAL } from 'constants/ModalConstants'

type Props = {
  openModal: String => void
}

const FieldContainer = styled.div`
  margin: 164px 0 220px;

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
    console.log('Check recovery phrase and choose pin')
    const mnemonic = sessionStorage.getItem(MNEMONIC_KEY_TEMP)
    if (this.state.mnemonic !== mnemonic) {
      this.setState({
        error: 'The recovery phrase you inserted is not correct'
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
          <Title accent>Rewrite your account recovery phrase</Title>
          <Text small>
            Rewrite the 12 words to continue the process. You may need them
            later to restore your account or to use it on other devices.
          </Text>
          <FieldContainer>
            <TextField
              label="Your recovery phrase"
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
            <Text warn small>
              {this.state.error}
            </Text>
          )}
          <Footer>
            <ButtonContainer>
              <TextButton onClick={this.showSeed}>Go Back</TextButton>
            </ButtonContainer>
            <ButtonContainer>
              <TextButton
                data-test-id="check-seed"
                accent
                onClick={this.checkSeed}
              >
                Continue
              </TextButton>
            </ButtonContainer>
          </Footer>
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalRewriteSeed
