import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Blockies from 'react-blockies'
import { add0x, copyTextToClipboard } from 'utils/AppUtils'
import { ACTIVATE_SECURE_WALLET } from 'constants/ParatiiLibConstants'
import Colors from './foundations/base/Colors'
import Button from './foundations/Button'
import Text from './foundations/Text'
import CheckIcon from './widgets/CheckIcon'
import TruncatedText from './foundations/TruncatedText'
import SVGIcon from './foundations/SVGIcon'
import HR from './foundations/HR'
import Card from './structures/Card'
import PTIBalanceContainer from 'containers/widgets/PTIBalanceContainer'
import {
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS
} from 'constants/ApplicationConstants'
import User from 'records/UserRecords'
import { getEmail, getEmailIsVerified, getName } from 'operators/UserOperators'
import type { Notification, NotificationLevel } from 'types/ApplicationTypes'

type Props = {
  user: User,
  userAddress: string,
  isWalletSecured: boolean,
  checkUserWallet: () => void,
  showNotification: (Notification, NotificationLevel) => void
}

const WORDSWRAPPER_HORIZONTAL_PADDING = '24px'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const NavLink = Button.withComponent(Link)

const EditProfileButton = styled(NavLink)`
  position: absolute;
  top: 50px;
  right: 42px;
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
  width: 100%;
`

const EmailAddressWrapper = styled.span`
  margin-right: 10px;
`

const EmailDataWrapper = styled.div`
  display: flex;
  align-items: center;
`

const WordsWrapper = styled.div`
  background-color: ${Colors.grayDark};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin: 5px 0 0;
  padding: 22px ${WORDSWRAPPER_HORIZONTAL_PADDING};
`

const CopyText = TruncatedText.withComponent('p')

const CopyButton = styled(Button)`
  align-items: flex-end;
  display: flex;
  margin-left: 20px;
`

class Profile extends Component<Props, void> {
  secureWallet: (e: Object) => void
  copyWordsToClipboard: (event: Object) => void
  handleInputChange: (input: string, e: Object) => void

  constructor (props: Props) {
    super(props)

    this.secureWallet = this.secureWallet.bind(this)
    this.copyWordsToClipboard = this.copyWordsToClipboard.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount () {
    if (!this.props.isWalletSecured) {
      this.props.checkUserWallet()
    }
  }

  handleInputChange (input: string, e: Object) {
    this.setState({
      [input]: e.target.value
    })
  }

  secureWallet (e: Object) {
    e.preventDefault()
    this.props.checkUserWallet()
  }

  copyWordsToClipboard (event: Object) {
    copyTextToClipboard(this.KeyWords)
    this.props.showNotification(
      {
        title: 'Copied!',
        message: 'Your address has been copied to the clipboard',
        position: NOTIFICATION_POSITIONS.TOP_RIGHT
      },
      NOTIFICATION_LEVELS.SUCCESS
    )
  }

  render () {
    const { user, userAddress, isWalletSecured } = this.props
    let userAvatar = ''
    if (userAddress) {
      const lowerAddress = add0x(userAddress)
      if (ACTIVATE_SECURE_WALLET && isWalletSecured) {
        userAvatar = <Blockies seed={lowerAddress} size={10} scale={10} />
      }
    }
    const cardFooter = (
      <FooterWrapper>
        {getEmail(user) && (
          <Fragment>
            <Text gray small>
              Email
            </Text>
            <Text data-test-id="profile-email" margin="0 0 20px 0">
              <EmailDataWrapper>
                <EmailAddressWrapper>{getEmail(user)}</EmailAddressWrapper>{' '}
                {getEmailIsVerified(user) && <CheckIcon />}
              </EmailDataWrapper>
            </Text>
          </Fragment>
        )}
        <Text gray small>
          Address
        </Text>
        <WordsWrapper>
          <CopyText
            innerRef={(ref: HTMLElement) => {
              this.KeyWords = ref
            }}
          >
            {userAddress}
          </CopyText>
          <CopyButton gray small onClick={this.copyWordsToClipboard}>
            <SVGIcon
              color="gray"
              icon="icon-copy"
              height="20px"
              width="20px"
              margin="0 5px 0 0"
            />
            Copy
          </CopyButton>
        </WordsWrapper>
      </FooterWrapper>
    )
    return (
      <div>
        {isWalletSecured ? (
          <Card nobackground title="Profile" footer={cardFooter}>
            <Wrapper>
              <EditProfileButton to="/profile/edit">Edit</EditProfileButton>
              <ProfileAvatar>{userAvatar}</ProfileAvatar>
              <Text bold small>
                {getName(user)}
              </Text>
              <Text tiny gray>
                Since 2018
              </Text>
              <HR />
              <Text tiny gray>
                Current balance:
              </Text>
              <PTIBalanceContainer />
            </Wrapper>
          </Card>
        ) : (
          <Card
            title="Profile"
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
