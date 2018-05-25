/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import TextField from 'components/widgets/forms/TextField'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import NotepadSvg from 'components/foundations/svgs/NotepadSvg'
import { ModalContentWrapper, ModalScrollContent } from './Modal'

const FORM_ID: string = 'PROFILE_MODAL'

type Props = {
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

  setProfile (e: Object) {
    e.preventDefault()

    if (this.state.email) {
      const userAddress = paratii.eth.getAccount()
      // Send Email Verification
      this.sendVerificationMail(this.state.email, userAddress)
      // Create the user
      paratii.users.create({
        id: userAddress,
        name: this.state.username,
        email: this.state.email
      })
    } else {
      paratii.users.create({
        id: paratii.eth.getAccount(), // must be a valid ethereum address
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
            title: 'Check you email!',
            message: 'We sent you a confirmation link',
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
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>Profile</Title>
          <Text small gray>
            {
              "This is how you'll be known on the Paratii network. Enter your email if you'd like to receive updates about the community and your activity."
            }
          </Text>
          <Icon>
            <NotepadSvg />
          </Icon>
          <form id={FORM_ID} onSubmit={this.setProfile}>
            <TextField
              error={this.state.error.length > 0}
              label="Username"
              name="username"
              type="text"
              value={this.state.username}
              onChange={e => this.handleInputChange('username', e)}
              margin="0 0 30px"
            />
            <TextField
              error={this.state.error.length > 0}
              label="Email"
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
              <Button
                type="submit"
                form={FORM_ID}
                data-test-id="continue"
                purple
                disabled={!this.state.username}
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

export default ModalProfile
