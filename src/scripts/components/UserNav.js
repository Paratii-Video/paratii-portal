/* @flow */

import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { add0x } from 'utils/AppUtils'
import Blockies from 'react-blockies'
import User from 'records/UserRecords'
import { getName } from 'operators/UserOperators'
import {
  USERNAV_WIDTH,
  MAINHEADER_LOGO_HEIGHT,
  MAINFOOTER_HEIGHT,
  Z_INDEX_USERNAV
} from '../constants/UIConstants'
import { ACTIVATE_SECURE_WALLET } from 'constants/ParatiiLibConstants'
import { Link } from 'react-router-dom'
import Text from './foundations/Text'
import SVGIcon from './foundations/SVGIcon'
import UserBadge from './widgets/UserBadge'
import TranslatedText from './translations/TranslatedText'

type Props = {
  balance: string,
  children: Object,
  user: User,
  userAddress: string,
  isWalletSecured: boolean,
  showUserNav: boolean,
  checkUserWallet: () => void,
  closeUserNav: () => void,
  loadBalances: () => void
}

const Wrapper = styled.div`
  background: ${props => props.theme.colors.UserNav.background};
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 0 0 ${MAINFOOTER_HEIGHT};
  position: fixed;
  top: 0;
  transform: translate3d(${({ show }) => (show ? 0 : '-100%')}, 0, 0);
  transition: transform 0.6s ${({ theme }) => theme.animation.ease.smooth};
  width: ${USERNAV_WIDTH};
  z-index: ${Z_INDEX_USERNAV};
`

// User
const UserWrapper = styled.div`
  background: ${props => props.theme.colors.UserNav.Userbackground};
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
  align-items: center;
  background-color: ${props => props.theme.colors.UserNav.UserPTIValueBox};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 90px;
  padding: 14px 14px 16px;
`

const UserPTIBarWrapper = styled.div`
  border-radius: 2px;
  display: flex;
  height: 4px;
  margin-top: 25px;
`

const UserPTIBar = styled.div`
  background: ${props =>
    props.red
      ? props.theme.colors.UserNav.UserPTIBarTwo
      : props.theme.colors.UserNav.UserPTIBarOne};
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
  background-color: ${props => props.theme.colors.UserNav.Navigation};
`

const UserNavListItemStyle = css`
  align-items: center;
  color: ${props => props.theme.colors.UserNav.NavigationText};
  display: flex;
  padding: 25px 30px;
`

const UserNavListItemNoLink = styled.div`
  ${UserNavListItemStyle};
`

const UserNavListItemLink = styled(Link)`
  ${UserNavListItemStyle} transition: opacity .3s;
  &:hover {
    opacity: 0.5;
  }
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
  background-color: ${props => props.theme.colors.UserNav.SubNavigation};
`

const UserSubNavListItemLink = styled(Link)`
  ${UserNavListItemStyle} padding: 25px 30px 25px 90px;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.5;
  }
`

class UserNav extends Component<Props, void> {
  UserNavWrapper: HTMLElement

  render () {
    const { balance, user } = this.props
    let avatarUser = ''

    if (this.props.userAddress) {
      const lowerAddress = add0x(this.props.userAddress)
      if (ACTIVATE_SECURE_WALLET && this.props.isWalletSecured) {
        avatarUser = <Blockies seed={lowerAddress} size={10} scale={4} />
      }
    }

    // FIXME we need to get value from paratijs
    const stakedPTI = 2
    const totalMoney = Number(balance + stakedPTI)
    const percStaked = Math.round(stakedPTI / totalMoney * 100)
    const percPTI = 100 - percStaked
    const percentageStaked = percStaked + '%'
    const percentagePTI = percPTI + '%'

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
                <Text gray tiny>
                  <TranslatedText message="userNav.leftBoxTitle" />
                </Text>
                <UserPTIValueBox>
                  <Text purple>{balance} PTI</Text>
                </UserPTIValueBox>
              </UserPTIValue>
              <UserPTIValue>
                <Text gray tiny>
                  <TranslatedText message="userNav.rightBoxTitle" />
                </Text>
                <UserPTIValueBox>
                  <Text pink>{stakedPTI} PTI</Text>
                </UserPTIValueBox>
              </UserPTIValue>
            </UserPTIValuesWrapper>
            <UserPTIBarWrapper>
              <UserPTIBar percentage={percentagePTI}>
                <UserPTIBarText purple tiny>
                  {percentagePTI}
                </UserPTIBarText>
              </UserPTIBar>
              <UserPTIBar red percentage={percentageStaked}>
                <UserPTIBarText pink tiny>
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
            <UserNavListItem>
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
