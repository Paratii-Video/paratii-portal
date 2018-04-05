/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { MNEMONIC_KEY_TEMP } from 'constants/ParatiiLibConstants'
import { MODAL } from 'constants/ModalConstants'

type Props = {
  openModal: String => void
}

const Title = styled.h2`
  color: ${props => props.theme.colors.Modal.title};
  font-size: ${props => props.theme.fonts.modal.title};
  margin-bottom: 25px;
`

const Highlight = styled(Text)`
  color: ${props => props.theme.colors.Modal.hightlight};
  margin-bottom: 14px;
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

class ModalShowSeed extends Component<Props, Object> {
  secureWallet: (e: Object) => void
  rewriteSeed: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.secureWallet = this.secureWallet.bind(this)
    this.rewriteSeed = this.rewriteSeed.bind(this)
  }

  secureWallet () {
    this.props.openModal(MODAL.SECURE)
  }

  rewriteSeed () {
    this.props.openModal(MODAL.REWRITE_SEED)
  }

  render () {
    // Generation of a fresh new mnemonic
    let mnemonic = sessionStorage.getItem(MNEMONIC_KEY_TEMP)
    if (!mnemonic) {
      mnemonic = paratii.eth.wallet.newMnemonic()
      sessionStorage.setItem(MNEMONIC_KEY_TEMP, mnemonic)
    }

    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>Your account seed</Title>
          <MainText small gray>
            This is you seed
          </MainText>
          <Highlight data-test-id="new-mnemonic">{mnemonic}</Highlight>

          <Footer>
            <ButtonContainer>
              <Button onClick={this.secureWallet}>Go Back</Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                data-test-id="rewrite-seed"
                purple
                onClick={this.rewriteSeed}
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

export default ModalShowSeed
