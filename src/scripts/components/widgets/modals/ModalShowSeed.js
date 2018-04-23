/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Colors from 'components/foundations/base/Colors'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import RadioCheck from 'components/widgets/forms/RadioCheck'
import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { MNEMONIC_KEY_TEMP, PASSWORD_TEMP } from 'constants/ParatiiLibConstants'
import { MODAL } from 'constants/ModalConstants'

import {
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS
} from 'constants/ApplicationConstants'
import { copyTextToClipboard } from 'utils/AppUtils'
import type { Notification, NotificationLevel } from 'types/ApplicationTypes'

type Props = {
  openModal: string => void,
  showNotification: (Notification, NotificationLevel) => void,
  secureKeystore: string => void
}

const WORDPADDING: string = '14px'

const TextHidden = styled.p`
  opacity: 0.01;
  position: absolute;
`

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

// const CopyButtonIcon = styled.svg`
//   fill: ${Colors.purple};
//   display: inline-block;
//   height: 24px;
//   margin-right: 10px;
//   width: 20px;
// `

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
  goBack: (e: Object) => void
  modalContinue: (e: Object) => void
  toggleOption: (e: Object) => void
  copyWordsToClipboard: (event: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      seedCheck: false
    }
    this.goBack = this.goBack.bind(this)
    this.modalContinue = this.modalContinue.bind(this)
    this.toggleOption = this.toggleOption.bind(this)
    this.copyWordsToClipboard = this.copyWordsToClipboard.bind(this)
  }

  goBack () {
    this.props.openModal(MODAL.CREATE_PASSWORD)
  }

  modalContinue () {
    const password = sessionStorage.getItem(PASSWORD_TEMP)
    // Create new wallet and encrypt with this Password
    console.log('Create new wallet and encrypt with password')
    if (password) {
      this.props.secureKeystore(password)
      // Open the profile modal
      this.props.openModal(MODAL.PROFILE)
    }
  }

  toggleOption () {
    this.setState({ seedCheck: !this.state.seedCheck })
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
          <Title>Your recovery phrase</Title>
          <Text small gray>
            You will need these 12 words later to restore your account, or to
            use it on other device. Write this phrase down and keep it in a safe
            place.
          </Text>
          <TextHidden
            data-test-id="new-mnemonic"
            innerRef={(ref: HTMLElement) => {
              this.KeyWords = ref
            }}
          >
            {mnemonic}
          </TextHidden>
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
            <RadioCheck
              checkbox
              white
              name="check-seed"
              value={this.state.checkSeed}
              onChange={this.toggleOption}
            >
              I have copied the 12 words, they are secret, safe and sound
            </RadioCheck>
            {
              // <Button
              //   data-test-id="new-mnemonic-button"
              //   onClick={this.copyWordsToClipboard}
              //   gray
              // >
              //   <CopyButtonIcon>
              //     <use xlinkHref="#icon-copy" />
              //   </CopyButtonIcon>
              //   Copy
              // </Button>
            }
          </WordsWrapper>

          <Footer>
            <ButtonContainer>
              <Button onClick={this.goBack}>Back</Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                data-test-id="continue"
                purple
                onClick={this.modalContinue}
                disabled={!this.state.seedCheck}
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
