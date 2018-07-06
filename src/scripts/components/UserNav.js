/* @flow */
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { add0x } from 'utils/AppUtils'
import paratii from 'utils/ParatiiLib'
import Blockies from 'react-blockies'
import User from 'records/UserRecords'
import { getName } from 'operators/UserOperators'
import {
  BORDER_RADIUS,
  USERNAV_WIDTH,
  MAINHEADER_LOGO_HEIGHT,
  MAINFOOTER_HEIGHT,
  MEDIAQUERY_BREAKPOINT,
  Z_INDEX_USERNAV
} from '../constants/UIConstants'
import { Link } from 'react-router-dom'
import { FlexCenterStyle } from './foundations/Styles'
import Text from './foundations/Text'
import TextButton from './foundations/TextButton'
import SVGIcon from './foundations/SVGIcon'
import UserBadge from './widgets/UserBadge'
import TranslatedText from './translations/TranslatedText'

type Props = {
  balance: string,
  formattedBalance: string,
  stakedPTI: string,
  user: User,
  userAddress: string,
  isWalletSecured: boolean,
  showUserNav: boolean,
  checkUserWallet: () => void,
  closeUserNav: () => void,
  loadBalances: () => void
}

const Wrapper = styled.div`
  background: ${props => props.theme.colors.background.primary};
  box-shadow: -11px 0 40px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 0 0 ${MAINFOOTER_HEIGHT};
  position: fixed;
  top: 0;
  transition: transform 0.6s ${({ theme }) => theme.animation.ease.smooth};
  width: ${USERNAV_WIDTH};
  z-index: ${Z_INDEX_USERNAV};

  @media ${MEDIAQUERY_BREAKPOINT} {
    transform: translate3d(${({ show }) => (show ? 0 : '-100%')}, 0, 0);
  }
`

// User
const UserWrapper = styled.div`
  background: ${props => props.theme.colors.background.secondary};
  display: flex;
  flex-direction: column;
  margin-top: ${MAINHEADER_LOGO_HEIGHT};
  padding: 40px 30px;
`

const UserPTI = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
`

const UserPTIValuesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const UserPTIValue = styled.div`
  flex: 0 0 48.5%;
`

const UserPTIValueBox = styled.div`
  ${FlexCenterStyle} background-color: ${props =>
  props.theme.colors.background.tertiary};
  border-radius: ${BORDER_RADIUS};
  flex-direction: column;
  padding: 14px;
`

const UserPTIBarWrapper = styled.div`
  border-radius: 2px;
  display: flex;
  height: 4px;
  margin-top: 25px;
`

const UserPTIBar = styled.div`
  background: ${props =>
    props.red ? props.theme.colors.text.error : props.theme.colors.text.warn};
  flex: 1 1 ${props => props.percentage};
  height: 100%;
  text-align: center;
  position: relative;
`

const UserPTIBarText = Text.extend`
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 5px, 0);
`

// User navigation
const UserNavListWrapper = styled.div`
  display: block;
`

const UserNavList = styled.ul`
  display: flex;
  flex-direction: column;
`

const UserNavListItem = styled.li`
  background: ${props =>
    props.subnav ? props.theme.colors.background.tertiary : null};
  opacity: 1;
`

const UserNavListItemStyle = css`
  align-items: center;
  display: flex;
  font-size: ${props => props.theme.fonts.text.main};
  font-weight: ${props => props.theme.fonts.weight.regular};
  padding: 25px 30px;
  text-transform: initial;
`

const UserNavListItemNoLink = styled.div`
  ${UserNavListItemStyle};
`

const UserTextButton = TextButton.withComponent(Link)

const UserNavListItemLink = styled(UserTextButton)`
  ${UserNavListItemStyle};
`

const UserNavListItemIcon = styled.span`
  flex: 0 0 22px;
  height: 22px;
  margin-right: 10px;
`

const UserSubNavList = styled.ul`
  display: flex;
  flex-direction: column;
`

const UserSubNavListItem = styled.li`
  background-color: ${props => props.theme.colors.background.tertiary};
`

const UserSubNavListItemLink = styled(Link)`
  ${UserNavListItemStyle} padding: 25px 30px 25px 90px;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.5;
  }
`

class UserNav extends Component<Props, Object> {
  UserNavWrapper: HTMLElement

  constructor (props: Props) {
    super(props)

    props.loadBalances()
  }

  render () {
    const {
      formattedBalance,
      balance,
      stakedPTI,
      user,
      userAddress
    } = this.props

    let avatarUser = ''
    if (userAddress) {
      const lowerAddress = add0x(userAddress)
      if (this.props.isWalletSecured) {
        avatarUser = <Blockies seed={lowerAddress} size={10} scale={4} />
      }
    }

    let percentageStaked = '0%'
    let percentagePTI = '100%'
    const stakedNumber = stakedPTI ? Number(stakedPTI) : 0
    const balanceNumber = balance ? Number(balance) : 0
    const formattedStakedPTI = paratii.eth.web3.utils.fromWei(
      stakedNumber.toString(),
      'ether'
    )

    const totalPTI = balanceNumber + stakedNumber
    const percStaked = Math.round(stakedNumber / totalPTI * 100)
    const percPTI = 100 - percStaked

    percentageStaked = percStaked + '%'
    percentagePTI = percPTI + '%'

    return (
      <Wrapper
        show={this.props.showUserNav}
        innerRef={(ref: HTMLElement) => {
          this.UserNavWrapper = ref
        }}
      >
        <UserWrapper>
          <UserBadge
            userAvatar={avatarUser}
            userName={getName(user)}
            userDate={<TranslatedText message="userNav.dataLabel" />}
          />
          <UserPTI>
            <UserPTIValuesWrapper>
              <UserPTIValue>
                <Text secondary small>
                  <TranslatedText message="userNav.leftBoxTitle" />
                </Text>
                <UserPTIValueBox>
                  <Text warn>{formattedBalance} PTI</Text>
                </UserPTIValueBox>
              </UserPTIValue>
              <UserPTIValue>
                <Text secondary small>
                  <TranslatedText message="userNav.rightBoxTitle" />
                </Text>
                <UserPTIValueBox>
                  <Text error>{formattedStakedPTI} PTI</Text>
                </UserPTIValueBox>
              </UserPTIValue>
            </UserPTIValuesWrapper>
            <UserPTIBarWrapper>
              <UserPTIBar percentage={percentagePTI}>
                <UserPTIBarText warn tiny>
                  {percentagePTI}
                </UserPTIBarText>
              </UserPTIBar>
              <UserPTIBar red percentage={percentageStaked}>
                <UserPTIBarText error tiny>
                  {percentageStaked}
                </UserPTIBarText>
              </UserPTIBar>
            </UserPTIBarWrapper>
          </UserPTI>
        </UserWrapper>
        <UserNavListWrapper>
          <UserNavList>
            <UserNavListItem>
              <UserNavListItemLink
                to="/profile"
                onClick={this.props.closeUserNav}
              >
                <UserNavListItemIcon>
                  <SVGIcon icon="icon-profile" />
                </UserNavListItemIcon>
                Profile
              </UserNavListItemLink>
            </UserNavListItem>
            <UserNavListItem subnav>
              <UserNavListItemLink
                to="/profile/my-videos"
                onClick={this.props.closeUserNav}
              >
                <UserNavListItemIcon>
                  <SVGIcon icon="icon-myvideos" />
                </UserNavListItemIcon>
                My Videos
              </UserNavListItemLink>
            </UserNavListItem>
            <UserNavListItem hidden>
              <UserNavListItemLink to="/" onClick={this.props.closeUserNav}>
                <UserNavListItemIcon>
                  <SVGIcon icon="icon-fav" />
                </UserNavListItemIcon>
                My Favorites
              </UserNavListItemLink>
            </UserNavListItem>
            <UserNavListItem hidden>
              <UserNavListItemLink to="/" onClick={this.props.closeUserNav}>
                <UserNavListItemIcon>
                  <SVGIcon icon="icon-myvideos" />
                </UserNavListItemIcon>
                Finances
              </UserNavListItemLink>
            </UserNavListItem>
            <UserNavListItem hidden>
              <UserNavListItemLink to="/" onClick={this.props.closeUserNav}>
                <UserNavListItemIcon>
                  <SVGIcon icon="icon-settings" />
                </UserNavListItemIcon>
                Settings
              </UserNavListItemLink>
            </UserNavListItem>
            <UserNavListItem hidden>
              <UserNavListItemNoLink>
                <UserNavListItemIcon>
                  <SVGIcon icon="icon-myvideos" />
                </UserNavListItemIcon>
                Curation
              </UserNavListItemNoLink>
              <UserSubNavList>
                <UserSubNavListItem>
                  <UserSubNavListItemLink
                    to="/profile/curation"
                    onClick={this.props.closeUserNav}
                  >
                    Dashboard
                  </UserSubNavListItemLink>
                </UserSubNavListItem>
                <UserSubNavListItem>
                  <UserSubNavListItemLink
                    to="/"
                    onClick={this.props.closeUserNav}
                  >
                    List
                  </UserSubNavListItemLink>
                </UserSubNavListItem>
              </UserSubNavList>
            </UserNavListItem>
          </UserNavList>
        </UserNavListWrapper>
      </Wrapper>
    )
  }
}

export default UserNav
