/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import TextField from 'components/widgets/forms/TextField'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import NotepadSvg from 'components/foundations/svgs/NotepadSvg'
import TranslatedText from 'components/translations/TranslatedText'
import RawTranslatedText from 'utils/translations/RawTranslatedText'
import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { WALLET_KEY_SECURE } from 'constants/ParatiiLibConstants'

const FORM_ID: string = 'PROFILE_MODAL'

type Props = {
  walletKey: string,
  openModal: string => void,
  closeModal: () => void,
  secureKeystore: string => void,
  setUserData: () => void,
  notification: (Object, string) => void
}

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  width: 100%;
`

const ButtonContainer = styled.div`
  margin-left: 10px;
`

const Icon = styled.div`
  height: 180px;
  margin: 25px 0;
  width: 100%;
`

class ModalProfile extends Component<Props, Object> {
  setProfile: () => void
  sendVerificationMail: (string, string) => void
  handleInputChange: (input: string, e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      error: ''
    }
    this.setProfile = this.setProfile.bind(this)
    this.sendVerificationMail = this.sendVerificationMail.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  async setProfile (e: Object) {
    e.preventDefault()
    const userAddress = paratii.eth.getAccount()
    if (this.state.email) {
      // Send Email Verification
      this.sendVerificationMail(this.state.email, userAddress)
      // Create the user
      await paratii.users.create({
        id: userAddress,
        name: this.state.username,
        email: this.state.email
      })
    } else {
      await paratii.users.create({
        id: userAddress, // must be a valid ethereum address
        name: this.state.username
      })
    }
    this.props.closeModal()
    // Set profile in the state
    this.props.setUserData()
  }

  sendVerificationMail (mail: string, address: string) {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = (event: Object) => {
      if (
        event.currentTarget.readyState === 4 &&
        event.currentTarget.status === 200
      ) {
        // Notification mail sent!
        this.props.notification(
          {
            title: (
              <TranslatedText message="modal.profile.verificationEmail.title" />
            ),
            message: (
              <TranslatedText message="modal.profile.verificationEmail.description" />
            ),
            autoDismiss: 0
          },
          'success'
        )
      }
    }
    xhttp.open('GET', `/mail/send/?to=${mail}&toETH=${address}`, true)
    xhttp.send()
  }

  handleInputChange (input: string, e: Object) {
    this.setState({
      [input]: e.target.value,
      error: ''
    })
  }

  render () {
    const enableContinue = this.props.walletKey === WALLET_KEY_SECURE
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>
            <TranslatedText message="modal.profile.title" />
          </Title>
          <Text small gray>
            <TranslatedText message="modal.profile.description" />
          </Text>
          <Icon>
            <NotepadSvg />
          </Icon>
          <form id={FORM_ID} onSubmit={this.setProfile}>
            <TextField
              error={this.state.error.length > 0}
              label={RawTranslatedText({
                message: 'modal.profile.usernameLabel'
              })}
              name="username"
              type="text"
              value={this.state.username}
              onChange={e => this.handleInputChange('username', e)}
              margin="0 0 30px"
            />
            <TextField
              error={this.state.error.length > 0}
              label={RawTranslatedText({ message: 'modal.profile.emailLabel' })}
              name="email"
              type="text"
              value={this.state.email}
              onChange={e => this.handleInputChange('email', e)}
              margin="0 0 30px"
            />
          </form>

          {this.state.error && (
            <Text pink small>
              {this.state.error}
            </Text>
          )}
          <Footer>
            <ButtonContainer>
              {enableContinue ? (
                <Button
                  type="submit"
                  form={FORM_ID}
                  data-test-id="continue"
                  purple
                  disabled={!this.state.username}
                >
                  <TranslatedText message="modal.profile.continue" />
                </Button>
              ) : (
                <Button type="submit" form={FORM_ID} purple disabled="true">
                  <TranslatedText message="modal.profile.pleaseWait" />
                </Button>
              )}
            </ButtonContainer>
          </Footer>
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalProfile
