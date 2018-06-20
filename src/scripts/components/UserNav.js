/* @flow */
/* stylelint-disable */
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { add0x } from 'utils/AppUtils'
import Blockies from 'react-blockies'
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

type Props = {
  children: Object,
  userAddress: string,
  isWalletSecured: boolean,
  showUserNav: boolean,
  checkUserWallet: () => void,
  closeUserNav: () => void
}

const Wrapper = styled.div`
  background: ${props => props.theme.colors.UserNav.background};
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
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
  align-content: center;
  background-color: ${props => props.theme.colors.UserNav.UserPTIValueBox};
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 14px 14px 16px;
  text-align: center;
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
  ${Text} {
    margin-top: 5px;
  }
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
  UserNavWrapper: Object

  constructor (props: Props) {
    super(props)

    this.UserNavWrapper = this.UserNavWrapper.bind(this)
  }

  componentDidUpdate () {
    if (this.props.showUserNav) {
      this.UserNavWrapper.scrollTo(0, 0)
    }
  }

  render () {
    let avatarUser = ''
    if (this.props.userAddress) {
      const lowerAddress = add0x(this.props.userAddress)
      if (ACTIVATE_SECURE_WALLET && this.props.isWalletSecured) {
        avatarUser = <Blockies seed={lowerAddress} size={10} scale={4} />
      }
    }

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
            userName="User 12610549"
            userDate="Since 2018"
          />
          <UserPTI>
            <UserPTIValuesWrapper>
              <UserPTIValue>
                <Text gray tiny>
                  Available PTI
                </Text>
                <UserPTIValueBox>
                  <Text purple>10 PTI</Text>
                  <Text gray tiny>
                    US$ 3.00
                  </Text>
                </UserPTIValueBox>
              </UserPTIValue>
              <UserPTIValue>
                <Text gray tiny>
                  Staked PTI
                </Text>
                <UserPTIValueBox>
                  <Text pink>10 PTI</Text>
                  <Text gray tiny>
                    US$ 3.00
                  </Text>
                </UserPTIValueBox>
              </UserPTIValue>
            </UserPTIValuesWrapper>
            <UserPTIBarWrapper>
              <UserPTIBar percentage="70%">
                <Text purple tiny>
                  70%
                </Text>
              </UserPTIBar>
              <UserPTIBar red percentage="30%">
                <Text pink tiny>
                  30%
                </Text>
              </UserPTIBar>
            </UserPTIBarWrapper>
          </UserPTI>
        </UserWrapper>
        <UserNavListWrapper>
          <UserNavList>
            <UserNavListItem>
              <UserNavListItemLink to="/" onClick={this.props.closeUserNav}>
                <UserNavListItemIcon>
                  <SVGIcon icon="icon-profile" />
                </UserNavListItemIcon>
                Profile
              </UserNavListItemLink>
            </UserNavListItem>
            <UserNavListItem>
              <UserNavListItemLink to="/" onClick={this.props.closeUserNav}>
                <UserNavListItemIcon>
                  <SVGIcon icon="icon-myvideos" />
                </UserNavListItemIcon>
                My Videos
              </UserNavListItemLink>
            </UserNavListItem>
            <UserNavListItem>
              <UserNavListItemLink to="/" onClick={this.props.closeUserNav}>
                <UserNavListItemIcon>
                  <SVGIcon icon="icon-fav" />
                </UserNavListItemIcon>
                My Favorites
              </UserNavListItemLink>
            </UserNavListItem>
            <UserNavListItem>
              <UserNavListItemLink to="/" onClick={this.props.closeUserNav}>
                <UserNavListItemIcon>
                  <SVGIcon icon="icon-myvideos" />
                </UserNavListItemIcon>
                Finances
              </UserNavListItemLink>
            </UserNavListItem>
            <UserNavListItem>
              <UserNavListItemLink to="/" onClick={this.props.closeUserNav}>
                <UserNavListItemIcon>
                  <SVGIcon icon="icon-settings" />
                </UserNavListItemIcon>
                Settings
              </UserNavListItemLink>
            </UserNavListItem>
            <UserNavListItem>
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
