/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import Blockies from 'react-blockies'
import {
  MEDIAQUERY_BREAKPOINT,
  MAINHEADER_LOGO_HEIGHT,
  MAINHEADER_LOGO_WIDTH,
  MAINHEADER_PADDING_LEFT,
  MAINHEADER_PADDING_LEFT_BP,
  Z_INDEX_HEADER
} from 'constants/UIConstants'
import { ACTIVATE_SECURE_WALLET } from 'constants/ParatiiLibConstants'
import SearchInputContainer from 'containers/widgets/SearchInputContainer'
import TextButton from 'components/foundations/TextButton'
import SVGIcon from 'components/foundations/SVGIcon'
import MainHeaderLogo from 'components/widgets/MainHeaderLogo'
import MainNavigation from 'components/structures/header/MainNavigation'
import { add0x } from 'utils/AppUtils'

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
  background-color: ${props => props.theme.colors.background.primary};
  box-shadow: ${props => props.theme.colors.header.shadow};
  display: flex;
  padding: 0 ${MAINHEADER_PADDING_LEFT};
  position: fixed;
  transition: box-shadow 0.3s;
  width: 100%;
  z-index: ${Z_INDEX_HEADER};

  @media ${MEDIAQUERY_BREAKPOINT} {
    height: ${props => (props.open ? '100vh' : null)};
    padding: 0 ${MAINHEADER_PADDING_LEFT_BP};
    overflow-x: hidden;
    overflow-y: scroll;
  }
`

const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media ${MEDIAQUERY_BREAKPOINT} {
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

  @media ${MEDIAQUERY_BREAKPOINT} {
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

  @media ${MEDIAQUERY_BREAKPOINT} {
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 30px;
  }
`

const ProfileAvatarButton = styled.div`
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: 100%;
  flex: 0 0 40px;
  height: 40px;
  margin-left: 10px;
  overflow: hidden;

  @media ${MEDIAQUERY_BREAKPOINT} {
    margin-left: 0;
  }
`

const MobileButton = styled(TextButton)`
  display: none;
  height: 20px;
  position: absolute;
  right: 30px;
  top: 20px;
  width: 20px;
  z-index: 3;

  @media ${MEDIAQUERY_BREAKPOINT} {
    display: block;
  }
`

class MainHeader extends Component<Props, State> {
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
  secureWallet: (e: Object) => void
  toggleUserNav: () => void
  closeMainNavAndUserNav: () => void

  constructor (props: Props) {
    super(props)
    this.state = {
      navOpen: false,
      displayShadow: true
    }

    this.openNav = this.openNav.bind(this)
    this.closeNav = this.closeNav.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
    this.secureWallet = this.secureWallet.bind(this)
    this.toggleUserNav = this.toggleUserNav.bind(this)
    this.closeMainNavAndUserNav = this.closeMainNavAndUserNav.bind(this)
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

  closeMainNavAndUserNav () {
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
            <MainHeaderLogo clickOnLogo={this.closeMainNavAndUserNav} />
          </LogoWrapper>
          <HeaderContent open={this.state.navOpen}>
            <SearchWrapper>
              <SearchInputContainer onSearchSubmit={this.closeNav} />
            </SearchWrapper>
            <HeaderButtons>
              <MainNavigation
                isWalletSecured={this.props.isWalletSecured}
                checkUserWallet={this.props.checkUserWallet}
                closeMainNavAndUserNav={this.closeMainNavAndUserNav}
              />
              {userAvatar}
            </HeaderButtons>
          </HeaderContent>
          <MobileButton onClick={this.toggleNav} open={this.state.navOpen}>
            <SVGIcon icon={this.state.navOpen ? 'icon-close' : 'icon-menu'} />
          </MobileButton>
        </HeaderWrapper>
      </Header>
    )
  }
}

export default MainHeader
