/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import NotepadLockedSvg from 'components/foundations/svgs/NotepadLockedSvg'
import TranslatedText from 'components/translations/TranslatedText'
import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { MODAL } from 'constants/ModalConstants'
import { RESTORE_ACCOUNT, NEW_ACCOUNT } from 'constants/ParatiiLibConstants'

type Props = {
  openModal: (string, ?Object) => void,
  setContext: string => void
}

const Icon = styled.div`
  height: 200px;
  margin: 75px 0 95px;
  width: 100%;
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

class ModalSecure extends Component<Props, Object> {
  restoreAccount: (e: Object) => void
  createPassword: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.restoreAccount = this.restoreAccount.bind(this)
    this.createPassword = this.createPassword.bind(this)
  }

  restoreAccount () {
    this.props.setContext(RESTORE_ACCOUNT)
    this.props.openModal(MODAL.RESTORE_ACCOUNT)
  }

  createPassword () {
    this.props.setContext(NEW_ACCOUNT)
    this.props.openModal(MODAL.CREATE_PASSWORD)
  }

  render () {
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>
            <TranslatedText message="wallet.secureAccount.title" />
          </Title>
          <Text gray>
            <TranslatedText message="wallet.secureAccount.description" />
          </Text>
          <Icon>
            <NotepadLockedSvg />
          </Icon>
          <Footer>
            <ButtonContainer>
              <Button
                data-test-id="restore-account"
                onClick={this.restoreAccount}
              >
                <TranslatedText message="wallet.secureAccount.alreadyHaveAccount" />
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                data-test-id="new-here"
                purple
                onClick={this.createPassword}
              >
                <TranslatedText message="wallet.secureAccount.secureThisAccount" />
              </Button>
            </ButtonContainer>
          </Footer>
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalSecure
