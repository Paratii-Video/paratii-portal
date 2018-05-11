import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import { Redirect, router } from 'react-router'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Blockies from 'react-blockies'
import { add0x } from 'utils/AppUtils'
import Button from './foundations/Button'
import Text from './foundations/Text'
import HR from './foundations/HR'
import TextField from './widgets/forms/TextField'
import Card from './structures/Card'
import { ACTIVATE_SECURE_WALLET } from 'constants/ParatiiLibConstants'
import {
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS
} from 'constants/ApplicationConstants'
import type { Notification, NotificationLevel } from 'types/ApplicationTypes'

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

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const ProfileAvatar = styled.div`
  background-color: ${props => props.theme.colors.header.color};
  border-radius: 100%;
  height: 100px;
  margin-bottom: 20px;
  overflow: hidden;
  width: 100px;
`

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const NavLink = Button.withComponent(Link)

const CancelButton = styled(NavLink)`
  margin-right: 10px;
`

class Profile extends Component<Props, void> {
  secureWallet: (e: Object) => void
  handleInputChange: (input: string, e: Object) => void
  saveUserData: () => void

  constructor (props: Props) {
    super(props)

    this.state = {
      address: this.props.userAddress,
      email: this.props.user.email,
      username: this.props.user.name,
      updated: false,
      saved: false
    }

    this.secureWallet = this.secureWallet.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.saveUserData = this.saveUserData.bind(this)
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
    this.setState({
      [input]: e.target.value,
      updated: true,
      saved: false
    })
  }

  secureWallet (e: Object) {
    e.preventDefault()
    this.props.checkUserWallet()
  }

  async saveUserData () {
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
        saved: true
      })
      // Redirect to User Profile
      router.push('/profile')
    } catch (e) {
      console.log(e)
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
        <CancelButton gray="true" to="/profile">
          Cancel
        </CancelButton>
        <Button purple disabled={!updated} onClick={this.saveUserData}>
          Change informations
        </Button>
        {saved && <Redirect to={'/profile'} />}
      </FooterWrapper>
    )
    return (
      <div>
        {isWalletSecured ? (
          <Card nobackground title="Edit Profile" footer={cardFooter}>
            <Wrapper>
              <ProfileAvatar>{userAvatar}</ProfileAvatar>
              <Button>Change avatar</Button>
              <HR />
              <TextField
                type="text"
                label="Username"
                margin="0 0 30px"
                value={username}
                data-test-id="profile-username"
                onChange={e => this.handleInputChange('username', e)}
              />
              <TextField
                type="text"
                label="Email"
                margin="0 0 30px"
                value={email}
                data-test-id="profile-email"
                onChange={e => this.handleInputChange('email', e)}
              />
            </Wrapper>
          </Card>
        ) : (
          <Card
            title="Edit Profile"
            footer={
              <Button purple onClick={this.secureWallet}>
                Log in
              </Button>
            }
          >
            <Text gray>Perhaps you want to login to see this content</Text>
          </Card>
        )}
      </div>
    )
  }
}

export default Profile
