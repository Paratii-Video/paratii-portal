import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import { Redirect, router } from 'react-router'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Blockies from 'react-blockies'
import { add0x } from 'utils/AppUtils'
import TextButton from './foundations/TextButton'
import Text from './foundations/Text'
import SingleCardWrapper from './foundations/SingleCardWrapper'
import TextField from './widgets/forms/TextField'
import Card from './structures/Card'
import { ACTIVATE_SECURE_WALLET } from 'constants/ParatiiLibConstants'
import {
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS
} from 'constants/ApplicationConstants'
import {
  PROFILE_AVATAR_SIZE,
  PROFILEEDIT_AVATAR_MARGIN_BOTTOM
} from 'constants/UIConstants'
import type { Notification, NotificationLevel } from 'types/ApplicationTypes'
import TranslatedText from './translations/TranslatedText'

type Props = {
  user: {
    email: string,
    name: string
  },
  userAddress: string,
  isWalletSecured: boolean,
  checkUserWallet: () => void,
  showNotification: (Notification, NotificationLevel) => void,
  setUserData: () => void
}

const CardContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const ProfileAvatar = styled.div`
  background-color: ${props => props.theme.colors.header.color};
  border-radius: 100%;
  height: ${PROFILE_AVATAR_SIZE};
  margin-bottom: ${PROFILEEDIT_AVATAR_MARGIN_BOTTOM};
  overflow: hidden;
  width: ${PROFILE_AVATAR_SIZE};
`

const Form = styled.form`
  display: block;
  width: 100%;
`

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const NavLink = TextButton.withComponent(Link)

const CancelButton = styled(NavLink)`
  margin-right: 10px;
`

class Profile extends Component<Props, void> {
  secureWallet: (e: Object) => void
  submitForm: (e: Object) => void
  handleInputChange: (input: string, e: Object) => void
  saveUserData: () => void

  constructor (props: Props) {
    super(props)

    this.state = {
      address: this.props.userAddress,
      email: this.props.user.email,
      username: this.props.user.name,
      updated: false,
      formDisable: false,
      saved: false
    }

    this.secureWallet = this.secureWallet.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.saveUserData = this.saveUserData.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  componentDidMount () {
    if (!this.props.isWalletSecured) {
      this.props.checkUserWallet()
    }
  }

  componentDidUpdate () {
    if (!this.props.isWalletSecured) {
      this.props.checkUserWallet()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.updated) {
      this.setState({
        address: nextProps.userAddress,
        email: nextProps.user.email,
        username: nextProps.user.name
      })
    }
  }

  handleInputChange (input: string, e: Object) {
    const inputValue = e.target.value
    let changed = true

    if (inputValue.length < 1) {
      changed =
        this.state[input === 'username' ? 'email' : 'username'].length > 0
    }

    this.setState({
      [input]: inputValue,
      saved: false,
      updated: changed
    })
  }

  secureWallet (e: Object) {
    e.preventDefault()
    this.props.checkUserWallet()
  }

  submitForm (e: Object) {
    e.preventDefault()
    this.saveUserData()
  }

  async saveUserData () {
    this.setState({
      updated: false,
      formDisabled: true
    })
    // Notification
    this.props.showNotification(
      {
        title: 'Saving your info',
        position: NOTIFICATION_POSITIONS.TOP_RIGHT
      },
      NOTIFICATION_LEVELS.SUCCESS
    )
    try {
      await paratii.users.upsert({
        id: paratii.eth.getAccount(),
        name: this.state.username,
        email: this.state.email
      })
      // Update user data in redux state
      this.props.setUserData()
      // Notification
      this.props.showNotification(
        {
          title: 'Update!',
          message: 'Your changes have been saved',
          position: NOTIFICATION_POSITIONS.TOP_RIGHT
        },
        NOTIFICATION_LEVELS.SUCCESS
      )
      // Set Updated to false again
      this.setState({
        updated: false,
        saved: true,
        formDisabled: true
      })
      // Redirect to User Profile
      router.push('/profile')
    } catch (e) {
      console.log(e)
      this.setState({
        updated: true,
        saved: false,
        formDisabled: true
      })
    }
  }

  render () {
    const { isWalletSecured } = this.props
    const { email, address, username, updated, saved } = this.state
    let userAvatar = ''
    if (address) {
      const lowerAddress = add0x(address)
      if (ACTIVATE_SECURE_WALLET && isWalletSecured) {
        userAvatar = <Blockies seed={lowerAddress} size={10} scale={10} />
      }
    }
    const cardFooter = (
      <FooterWrapper>
        <CancelButton to="/profile">
          <TranslatedText message="profileEdit.cancelButton" />
        </CancelButton>
        <TextButton accent disabled={!updated} onClick={this.saveUserData}>
          <TranslatedText message="profileEdit.saveButton" />
        </TextButton>
        {saved && <Redirect to={'/profile'} />}
      </FooterWrapper>
    )
    return isWalletSecured ? (
      <SingleCardWrapper>
        <Card
          nobackground
          title={<TranslatedText message="profileEdit.title" />}
          footer={cardFooter}
          maxWidth
        >
          <CardContent>
            <ProfileAvatar>{userAvatar}</ProfileAvatar>
            <Form onSubmit={this.submitForm}>
              <TextField
                type="text"
                label={<TranslatedText message="profileEdit.usernameLabel" />}
                tabIndex="1"
                value={username}
                disabled={this.formDisabled}
                margin="0 0 30px"
                data-test-id="profile-username"
                onChange={e => this.handleInputChange('username', e)}
              />
              <TextField
                type="text"
                label={<TranslatedText message="profileEdit.emailLabel" />}
                tabIndex="2"
                value={email}
                disabled={this.formDisabled}
                data-test-id="profile-email"
                onChange={e => this.handleInputChange('email', e)}
              />
              <TextButton
                hidden
                disabled={!updated}
                onClick={this.saveUserData}
              >
                <TranslatedText message="profileEdit.saveButton" />
              </TextButton>
            </Form>
          </CardContent>
        </Card>
      </SingleCardWrapper>
    ) : (
      <SingleCardWrapper>
        <Card
          title={<TranslatedText message="profileLogOut.title" />}
          footer={
            <TextButton accent onClick={this.secureWallet}>
              <TranslatedText message="profileLogOut.button" />
            </TextButton>
          }
          maxWidth
        >
          <Text gray>
            <TranslatedText message="profileLogOut.text" />
          </Text>
        </Card>
      </SingleCardWrapper>
    )
  }
}

export default Profile
