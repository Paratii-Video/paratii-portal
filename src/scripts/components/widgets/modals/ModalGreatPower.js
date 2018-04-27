/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import Colors from 'components/foundations/base/Colors'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import NotepadLockedSvg from 'components/foundations/svgs/NotepadLockedSvg'
import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { MODAL } from 'constants/ModalConstants'

type Props = {
  openModal: String => void
}

const Icon = styled.div`
  height: 180px;
  margin: 40px 0 54px;
  width: 100%;
`

const MainText = styled(Text)`
  margin-bottom: 20px;
`

const HighlightText = styled.strong`
  color: ${Colors.purple};
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
  secureAccount: (e: Object) => void
  showSeed: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.secureAccount = this.secureAccount.bind(this)
    this.showSeed = this.showSeed.bind(this)
  }

  secureAccount () {
    this.props.openModal(MODAL.SECURE)
  }

  showSeed () {
    this.props.openModal(MODAL.CREATE_PASSWORD)
  }

  render () {
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>“With great powers, come great responsibilities”</Title>
          <Text small gray>
            by Uncle Ben
          </Text>
          <Icon>
            <NotepadLockedSvg />
          </Icon>
          <MainText small gray>
            On the decentralised internet, no company owns your stuff. Paratii
            cannot hold or hide the data you produce or the money you come to
            earn. It is a network, instead of a corporation.{' '}
            <HighlightText>
              This means you must take care of your belongings here!
            </HighlightText>
          </MainText>
          <Text small gray>
            Click “proceed” and watch as crypto-magic gives you an exclusive set
            of twelve keywords. They are a confidential sequence that works as a
            key to your tokens and digital goods. Like a super-duper secret
            password for another devices. Keep it safe.
          </Text>
          <Footer>
            <ButtonContainer>
              <Button data-test-id="go-back" onClick={this.secureAccount}>
                Go Back
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button data-test-id="continue" purple onClick={this.showSeed}>
                Continue
              </Button>
            </ButtonContainer>
          </Footer>
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalSecure
