/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import NotepadLockSvg from 'components/foundations/svgs/NotepadLockSvg'
import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { MODAL } from 'constants/ModalConstants'
import { RESTORE_ACCOUNT, NEW_ACCOUNT } from 'constants/ParatiiLibConstants'

type Props = {
  openModal: string => void,
  setContext: string => void
}

const Icon = styled.div`
  height: 250px;
  margin: 75px 0 96px;
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
          <Title>Before you proceed your account needs to be secure</Title>
          <Text gray>It won’t take more than a minute</Text>
          <Icon>
            <NotepadLockSvg />
          </Icon>
          <Footer>
            <ButtonContainer>
              <Button
                data-test-id="restore-account"
                onClick={this.restoreAccount}
              >
                I already have an account
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                data-test-id="new-here"
                purple
                onClick={this.createPassword}
              >
                Secure this account
              </Button>
            </ButtonContainer>
          </Footer>
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalSecure
