/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import TextField from 'components/widgets/forms/TextField'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import NotepadLockSvg from 'components/foundations/svgs/NotepadLockSvg'
import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { MODAL } from 'constants/ModalConstants'

type Props = {
  openModal: string => void,
  closeModal: () => void,
  secureKeystore: String => void
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
  margin: 40px 0 54px;
  width: 100%;
`

class ModalSetPassword extends Component<Props, Object> {
  setProfile: () => void
  goBack: () => void
  handleInputChange: (input: string, e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      error: ''
    }
    this.setProfile = this.setProfile.bind(this)
    this.goBack = this.goBack.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  goBack () {
    this.props.openModal(MODAL.SHOW_SEED)
  }

  setProfile () {
    paratii.users.create({
      id: paratii.eth.getAccount(), // must be a valid ethereum address
      name: this.state.username,
      email: this.state.email
    })
    this.props.closeModal()
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
            <NotepadLockSvg />
          </Icon>
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

          {this.state.error && (
            <Text pink small>
              {this.state.error}
            </Text>
          )}
          <Footer>
            <ButtonContainer>
              <Button
                data-test-id="continue"
                purple
                onClick={this.setProfile}
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

export default ModalSetPassword
