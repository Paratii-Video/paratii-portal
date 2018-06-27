/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import TextField from 'components/widgets/forms/TextField'
import TranslatedText from 'components/translations/TranslatedText'
import RawTranslatedText from 'utils/translations/RawTranslatedText'

import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { MODAL } from 'constants/ModalConstants'

const FORM_ID: string = 'MNEMONIC_FORM'

type Props = {
  openModal: (string, ?Object) => void,
  restoreKeystore: string => void,
  previousModal: string
}

const MmenomicForm = styled.form`
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

class ModalRestoreAccount extends Component<Props, Object> {
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
    this.props.openModal(this.props.previousModal)
  }

  restoreWallet (e: Object) {
    e.preventDefault()

    const mnemonic = this.state.mnemonic
    if (paratii.eth.wallet.isValidMnemonic(mnemonic)) {
      this.props.restoreKeystore(mnemonic)
      this.props.openModal(MODAL.CREATE_PASSWORD)
    } else {
      this.setState({
        error: <TranslatedText message="wallet.restoreAccount.errorMessage" />
      })
    }
  }

  handleMnemonicChange (e: Object) {
    this.setState({
      error: '',
      mnemonic: e.target.value
    })
  }

  render () {
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>
            <TranslatedText message="wallet.restoreAccount.title" />
          </Title>
          <Text small gray>
            <TranslatedText message="wallet.restoreAccount.description" />
          </Text>
          <MmenomicForm id={FORM_ID}>
            <TextField
              label={RawTranslatedText({
                message: 'wallet.restoreAccount.mnemonic'
              })}
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
          </MmenomicForm>
          <Footer>
            <ButtonContainer>
              <Button onClick={this.goBack}>
                <TranslatedText message="wallet.restoreAccount.goBack" />
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                data-test-id="restore-wallet"
                purple
                form={FORM_ID}
                type="submit"
                onClick={this.restoreWallet}
                disabled={!this.state.mnemonic}
              >
                <TranslatedText message="wallet.restoreAccount.continue" />
              </Button>
            </ButtonContainer>
          </Footer>
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalRestoreAccount
