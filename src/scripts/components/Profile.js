import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { copyTextToClipboard } from 'utils/AppUtils'
import Colors from './foundations/base/Colors'
import Button from './foundations/Button'
import Text from './foundations/Text'
import TruncatedText from './foundations/TruncatedText'
import SVGIcon from './foundations/SVGIcon'
import HR from './foundations/HR'
import UserAvatar from './widgets/UserAvatar'
import Card from './structures/Card'
import PTIBalanceContainer from 'containers/widgets/PTIBalanceContainer'
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

const FooterWrapper = styled.div`
  width: 100%;
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
    const cardFooter = (
      <FooterWrapper>
        <Text gray small>
          Address:
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
              <UserAvatar address={userAddress} />
              <Text bold small>
                {user.name}
              </Text>
              <Text data-test-id="profile-email" gray small>
                {user.email}
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
