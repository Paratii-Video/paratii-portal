/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Colors from 'components/foundations/base/Colors'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import TextButton from 'components/foundations/TextButton'
import SVGIcon from 'components/foundations/SVGIcon'
import RadioCheck from 'components/widgets/forms/RadioCheck'
import TranslatedText from 'components/translations/TranslatedText'
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
  openModal: (string, ?Object) => void,
  showNotification: (Notification, NotificationLevel) => void,
  secureKeystore: string => void
}

const WORDSWRAPPER_HORIZONTAL_PADDING = '24px'

const AlertIcon = styled.span`
  color: ${props => props.theme.colors.text.highlight};
  display: inline-block;
  height: 15px;
  margin: 0 5px 0 0;
  transform: translate3d(0, 2px, 0);
  width: 15px;
`

const Strong = Text.withComponent('strong')

const WordsWrapper = styled.div`
  background-color: ${Colors.grayDark};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin: 150px 0 0;
  padding: 22px ${WORDSWRAPPER_HORIZONTAL_PADDING};
`

const Word = styled.span`
  padding: 0 5px 0 0;
`

const CheckWrapper = styled.div`
  margin: 20px 0 143px ${WORDSWRAPPER_HORIZONTAL_PADDING};
`

const CopyButton = styled(TextButton)`
  align-items: flex-end;
  display: flex;
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
      // Open the profile modal
      this.props.openModal(MODAL.PROFILE)
      this.props.secureKeystore(password)
    }
  }

  toggleOption () {
    this.setState({ seedCheck: !this.state.seedCheck })
  }

  copyWordsToClipboard (event: Object) {
    copyTextToClipboard(this.KeyWords)
    this.props.showNotification(
      {
        title: (
          <TranslatedText message="wallet.showSeed.copy.notification.title" />
        ),
        message: (
          <TranslatedText message="wallet.showSeed.copy.notification.description" />
        ),
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

    const mnemonicArray = mnemonic.split(' ')
    const mnemonicArrayLength = mnemonicArray.length - 1

    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title accent>
            <TranslatedText message="wallet.showSeed.title" />
          </Title>
          <Text>
            <AlertIcon>
              <SVGIcon icon="icon-alert" />
            </AlertIcon>
            <TranslatedText
              message="wallet.showSeed.description_html"
              options={{
                keepSafe: (
                  <Strong purple bold>
                    <TranslatedText message="wallet.showSeed.keepSafe" />
                  </Strong>
                )
              }}
            />
          </Text>
          <WordsWrapper>
            <Text
              highlight
              bold
              data-test-id="new-mnemonic"
              innerRef={(ref: HTMLElement) => {
                this.KeyWords = ref
              }}
            >
              {mnemonicArray.map((item, index) => {
                let word = item
                if (index < mnemonicArrayLength) {
                  word += ' '
                }
                return <Word key={index}>{word}</Word>
              })}
            </Text>
            <CopyButton small onClick={this.copyWordsToClipboard}>
              <SVGIcon
                icon="icon-copy"
                height="20px"
                width="20px"
                margin="0 5px 0 0"
              />
              <TranslatedText message="wallet.showSeed.copy.buttonText" />
            </CopyButton>
          </WordsWrapper>
          <CheckWrapper>
            <RadioCheck
              checkbox
              name="check-seed"
              value={this.state.checkSeed}
              onChange={this.toggleOption}
            >
              <TranslatedText message="wallet.showSeed.copy.confirmCopy" />
            </RadioCheck>
          </CheckWrapper>

          <Footer>
            <ButtonContainer>
              <TextButton onClick={this.goBack}>
                <TranslatedText message="wallet.showSeed.goBack" />
              </TextButton>
            </ButtonContainer>
            <ButtonContainer>
              <TextButton
                data-test-id="continue"
                accent
                onClick={this.modalContinue}
                disabled={!this.state.seedCheck}
              >
                <TranslatedText message="wallet.showSeed.continue" />
              </TextButton>
            </ButtonContainer>
          </Footer>
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalShowSeed
