import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Blockies from 'react-blockies'
import { add0x, copyTextToClipboard } from 'utils/AppUtils'
import { ACTIVATE_SECURE_WALLET } from 'constants/ParatiiLibConstants'
import {
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS
} from 'constants/ApplicationConstants'
import {
  BORDER_RADIUS,
  PROFILE_AVATAR_SIZE,
  PROFILE_AVATAR_MARGIN_BOTTOM,
  PROFILE_EDITPROFILEBUTTON_TOP,
  PROFILE_EDITPROFILEBUTTON_RIGHT,
  PROFILE_WORDSWRAPPER_MARGIN,
  PROFILE_WORDSWRAPPER_PADDING_VERTICAL,
  PROFILE_EMAILADDRESSWRAPPER_MARGIN_RIGHT
} from 'constants/UIConstants'
import Colors from './foundations/base/Colors'
import TextButton from './foundations/TextButton'
import Text from './foundations/Text'
import CheckIcon from './widgets/CheckIcon'
import SVGIcon from './foundations/SVGIcon'
import HR from './foundations/HR'
import SingleCardWrapper from './foundations/SingleCardWrapper'
import Card from './structures/Card'
import PTIBalanceContainer from 'containers/widgets/PTIBalanceContainer'
import InvestedBalanceContainer from 'containers/widgets/InvestedBalanceContainer'
import User from 'records/UserRecords'
import { getEmail, getEmailIsVerified, getName } from 'operators/UserOperators'
import type { Notification, NotificationLevel } from 'types/ApplicationTypes'
import TranslatedText from './translations/TranslatedText'

type Props = {
  user: User,
  userAddress: string,
  isWalletSecured: boolean,
  checkUserWallet: () => void,
  showNotification: (Notification, NotificationLevel) => void
}

const WORDSWRAPPER_HORIZONTAL_PADDING = '24px'

const CardContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const BalanceContainer = styled.div`
  display: flex;
`

const BalanceItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 35px;
`

const NavLink = TextButton.withComponent(Link)

const EditProfileButton = styled(NavLink)`
  position: absolute;
  top: ${PROFILE_EDITPROFILEBUTTON_TOP};
  right: ${PROFILE_EDITPROFILEBUTTON_RIGHT};
`

const ProfileAvatar = styled.div`
  background-color: ${props => props.theme.colors.header.color};
  border-radius: 100%;
  height: ${PROFILE_AVATAR_SIZE};
  margin-bottom: ${PROFILE_AVATAR_MARGIN_BOTTOM};
  overflow: hidden;
  width: ${PROFILE_AVATAR_SIZE};
`

const FooterWrapper = styled.div`
  width: 100%;
`

const EmailAddressWrapper = styled.span`
  margin-right: ${PROFILE_EMAILADDRESSWRAPPER_MARGIN_RIGHT};
`

const EmailDataWrapper = styled.span`
  display: flex;
  align-items: center;
`

const WordsWrapper = styled.div`
  background-color: ${Colors.grayDark};
  border-radius: ${BORDER_RADIUS};
  display: flex;
  justify-content: space-between;
  margin: ${PROFILE_WORDSWRAPPER_MARGIN};
  padding: ${PROFILE_WORDSWRAPPER_PADDING_VERTICAL} ${WORDSWRAPPER_HORIZONTAL_PADDING};
`

const Words = Text.extend`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
            <Text small>
              <TranslatedText message="profile.emailLabel" />
            </Text>
            <Text accent data-test-id="profile-email" margin="0 0 20px 0">
              <EmailDataWrapper>
                <EmailAddressWrapper>{getEmail(user)}</EmailAddressWrapper>{' '}
                {getEmailIsVerified(user) && <CheckIcon />}
              </EmailDataWrapper>
            </Text>
          </Fragment>
        )}
        <Text small>
          <TranslatedText message="profile.addressLabel" />
        </Text>
        <WordsWrapper>
          <Words
            accent
            innerRef={(ref: HTMLElement) => {
              this.KeyWords = ref
            }}
          >
            {userAddress}
          </Words>
          <TextButton iconbutton small onClick={this.copyWordsToClipboard}>
            <SVGIcon
              icon="icon-copy"
              height="20px"
              width="20px"
              margin="0 5px 0 0"
            />
            <TranslatedText message="profile.copyLabel" />
          </TextButton>
        </WordsWrapper>
      </FooterWrapper>
    )
    return isWalletSecured ? (
      <SingleCardWrapper>
        <Card
          title={<TranslatedText message="profile.title" />}
          footer={cardFooter}
          maxWidth
        >
          <CardContent>
            <EditProfileButton to="/profile/edit">
              <TranslatedText message="profile.editButton" />
            </EditProfileButton>
            <ProfileAvatar>{userAvatar}</ProfileAvatar>
            <Text bold small>
              {getName(user)}
            </Text>
            <Text tiny>
              <TranslatedText message="profile.dataLabel" /> 2018
            </Text>
            <HR />
            <BalanceContainer>
              <BalanceItem>
                <Text tiny>
                  <TranslatedText message="profile.balanceTitle" />
                </Text>
                <PTIBalanceContainer />
              </BalanceItem>
              <BalanceItem>
                <Text tiny>
                  <TranslatedText message="profile.investedTitle" />
                </Text>
                <InvestedBalanceContainer />
              </BalanceItem>
            </BalanceContainer>
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
          <Text>
            <TranslatedText message="profileLogOut.text" />
          </Text>
        </Card>
      </SingleCardWrapper>
    )
  }
}

export default Profile
