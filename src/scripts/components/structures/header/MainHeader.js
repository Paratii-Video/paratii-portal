/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import Blockies from 'react-blockies'
import SearchInputContainer from 'containers/widgets/SearchInputContainer'
import Button from 'components/foundations/Button'
import SVGIcon from 'components/foundations/SVGIcon'
import MainHeaderLogo from 'components/widgets/MainHeaderLogo'
import MainNavigation from 'components/structures/header/MainNavigation'
import { add0x } from 'utils/AppUtils'

import {
  MAINHEADER_LOGO_HEIGHT,
  MAINHEADER_LOGO_WIDTH,
  Z_INDEX_HEADER
} from 'constants/UIConstants'
import { ACTIVATE_SECURE_WALLET } from 'constants/ParatiiLibConstants'

type Props = {
  children: Object,
  userAddress: string,
  isWalletSecured: boolean,
  showUserNav: boolean,
  checkUserWallet: () => void,
  openUserNav: () => void,
  closeUserNav: () => void
}

type State = {
  navOpen: boolean,
  displayShadow: boolean
}

const Header = styled.header`
  background-color: ${props => props.theme.colors.header.background};
  box-shadow: ${({ displayShadow }) =>
    displayShadow ? '0 3px 5px rgba(0,0,0,0.16)' : ''};
  display: flex;
  padding: 0 80px;
  position: fixed;
  transition: box-shadow 0.3s;
  width: 100%;
  z-index: ${Z_INDEX_HEADER};

  @media (max-width: 768px) {
    height: ${props => (props.open ? '100vh' : null)};
    padding: 0 40px;
  }
`

const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    align-content: baseline;
    flex-wrap: wrap;
  }
`

const LogoWrapper = styled.div`
  margin-right: 40px;
  flex: 0 0 ${MAINHEADER_LOGO_WIDTH};
  height: ${MAINHEADER_LOGO_HEIGHT};
`

const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  flex: 0 1 100%;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: ${props => (props.open ? 'block' : 'none')};
    flex: 1 1 100%;
  }
`

const SearchWrapper = styled.div`
  flex: 0 1 auto;
`

const HeaderButtons = styled.div`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 30px;
  }
`

const ProfileAvatarButton = styled.button`
  background-color: ${props => props.theme.colors.header.color};
  border-radius: 100%;
  flex: 0 0 40px;
  height: 40px;
  margin-left: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`

const MobileButton = styled(Button)`
  display: none;
  height: 20px;
  position: absolute;
  right: 30px;
  top: 24px;
  width: 20px;
  z-index: 3;

  @media (max-width: 768px) {
    display: block;
  }
`

class MainHeader extends Component<Props, State> {
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
  secureWallet: (e: Object) => void
  toggleUserNav: () => void
  closeNavAndUserNav: () => void

  constructor (props: Props) {
    super(props)
    this.state = {
      navOpen: false,
      displayShadow: false
    }

    this.openNav = this.openNav.bind(this)
    this.closeNav = this.closeNav.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
    this.secureWallet = this.secureWallet.bind(this)
    this.toggleUserNav = this.toggleUserNav.bind(this)
    this.closeNavAndUserNav = this.closeNavAndUserNav.bind(this)
  }

  openNav () {
    this.setState({
      navOpen: true
    })
  }

  closeNav () {
    this.setState({
      navOpen: false
    })
  }

  closeNavAndUserNav () {
    this.closeNav()
    this.props.closeUserNav()
  }

  toggleNav () {
    this.setState((prevState: State) => ({
      navOpen: !prevState.navOpen
    }))
  }

  toggleUserNav () {
    this.closeNav()

    if (this.props.showUserNav) {
      this.props.closeUserNav()
    } else {
      this.props.openUserNav()
    }
  }

  secureWallet (e: Object) {
    e.preventDefault()
    this.props.checkUserWallet()
  }

  render () {
    let userAvatar = ''
    if (this.props.userAddress) {
      const lowerAddress = add0x(this.props.userAddress)
      if (ACTIVATE_SECURE_WALLET && this.props.isWalletSecured) {
        userAvatar = (
          <ProfileAvatarButton
            data-test-id="address-avatar"
            onClick={this.toggleUserNav}
          >
            <Blockies seed={lowerAddress} size={10} scale={4} />
          </ProfileAvatarButton>
        )
      }
    }

    return (
      <Header
        displayShadow={this.state.displayShadow}
        open={this.state.navOpen}
      >
        {this.props.children}
        <HeaderWrapper open={this.state.navOpen}>
          <LogoWrapper>
            <MainHeaderLogo clickOnLogo={this.closeNavAndUserNav} />
          </LogoWrapper>
          <HeaderContent open={this.state.navOpen}>
            <SearchWrapper>
              <SearchInputContainer onSearchSubmit={this.closeNav} />
            </SearchWrapper>
            <HeaderButtons>
              <MainNavigation
                isWalletSecured={this.props.isWalletSecured}
                checkUserWallet={this.props.checkUserWallet}
                closeNavAndUserNav={this.closeNavAndUserNav}
              />
              {userAvatar}
            </HeaderButtons>
          </HeaderContent>
          <MobileButton onClick={this.toggleNav} open={this.state.navOpen}>
            <SVGIcon
              color="white"
              icon={this.state.navOpen ? 'icon-close' : 'icon-menu'}
            />
          </MobileButton>
        </HeaderWrapper>
      </Header>
    )
  }
}

export default MainHeader
