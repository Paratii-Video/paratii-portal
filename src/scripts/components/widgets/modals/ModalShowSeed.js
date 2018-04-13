/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Colors from 'components/foundations/base/Colors'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import Hidden from 'components/foundations/Hidden'
import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { MNEMONIC_KEY_TEMP } from 'constants/ParatiiLibConstants'
import { MODAL } from 'constants/ModalConstants'

import {
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS
} from 'constants/ApplicationConstants'
import { copyTextToClipboard } from 'utils/AppUtils'
import type { Notification, NotificationLevel } from 'types/ApplicationTypes'

type Props = {
  openModal: String => void,
  showNotification: (Notification, NotificationLevel) => void
}

const WORDPADDING: string = '14px'

const WordsWrapper = styled.div`
  cursor: pointer;
  margin: 80px 0 104px;

  @media (max-width: 767px) {
    margin-bottom: 0;
  }
`

const WordsList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 24px;
  transition: opacity ${props => props.theme.animation.time.repaint};

  &:hover {
    opacity: ${props => props.theme.animation.opacity.hover};
  }

  @media (max-width: 450px) {
    justify-content: baseline;
  }
`

const Word = styled.li`
  border: 2px solid ${Colors.purple};
  border-radius: 2px;
  display: flex;
  flex: 0 1 23%;
  margin-bottom: 20px;
  padding-right: ${WORDPADDING};
  user-select: none;

  @media (max-width: 768px) {
    flex-basis: 32%;
  }

  @media (max-width: 650px) {
    flex-basis: 48%;
  }

  @media (max-width: 460px) {
    flex-basis: 100%;
  }
`

const WordText = styled(Text)`
  display: flex;
  height: 40px;
  line-height: 40px;
`

const WordIndex = styled.span`
  border-right: 2px solid ${Colors.purple};
  flex: 0 0 40px;
  display: inline-block;
  height: 100%;
  margin: 0 ${WORDPADDING} 0 0;
  text-align: center;
`

const CopyButtonIcon = styled.svg`
  fill: ${Colors.purple};
  display: inline-block;
  height: 24px;
  margin-right: 10px;
  width: 20px;
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
  KeyWords: HTMLElement
  secureWallet: (e: Object) => void
  rewriteSeed: (e: Object) => void
  copyWordsToClipboard: (event: Object) => void

  constructor (props: Props) {
    super(props)
    this.secureWallet = this.secureWallet.bind(this)
    this.rewriteSeed = this.rewriteSeed.bind(this)
    this.copyWordsToClipboard = this.copyWordsToClipboard.bind(this)
  }

  secureWallet () {
    this.props.openModal(MODAL.SECURE)
  }

  rewriteSeed () {
    this.props.openModal(MODAL.REWRITE_SEED)
  }

  copyWordsToClipboard (event: Object) {
    copyTextToClipboard(this.KeyWords)
    this.props.showNotification(
      {
        title: 'Copied!',
        message: 'Your key has been copied to the clipboard',
        position: NOTIFICATION_POSITIONS.TOP_RIGHT
      },
      NOTIFICATION_LEVELS.SUCCESS
    )
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
          <Title>Your account recovery key</Title>
          <Text small gray>
            This is the key of your account, write in the correct order and keep
            it in a safe place
          </Text>
          <Hidden
            innerRef={(ref: HTMLElement) => {
              this.KeyWords = ref
            }}
          >
            {mnemonic}
          </Hidden>
          <WordsWrapper>
            <WordsList onClick={this.copyWordsToClipboard}>
              {mnemonic.split(' ').map((word: string, index: number) => (
                <Word key={index}>
                  <WordText purple>
                    <WordIndex>{index + 1}</WordIndex>
                    {word}
                  </WordText>
                </Word>
              ))}
            </WordsList>
            <Button onClick={this.copyWordsToClipboard} gray>
              <CopyButtonIcon>
                <use xlinkHref="#icon-copy" />
              </CopyButtonIcon>
              Copy
            </Button>
          </WordsWrapper>

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
