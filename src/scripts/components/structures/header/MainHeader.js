// import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import Blockies from 'react-blockies'

import SearchInput from 'components/widgets/SearchInput'
import Button from 'components/foundations/Button'
import MainHeaderLogo from 'components/widgets/MainHeaderLogo'
import MainNavigation from 'components/structures/header/MainNavigation'
import { add0x } from 'utils/AppUtils'

import { Z_INDEX_HEADER } from 'constants/UIConstants'

type Props = {
  children: Object,
  userAddress: String
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
  flex: 0 0
    ${props =>
    props.theme.sizes ? props.theme.sizes.mainHeaderLogo.width : ''};
  height: ${props =>
    props.theme.sizes ? props.theme.sizes.mainHeaderLogo.height : ''};
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

const ProfileAvatarLink = styled(Link)`
  background-color: ${props => props.theme.colors.header.color};
  border-radius: 100%;
  flex: 0 0 40px;
  height: 40px;
  margin-left: 45px;
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

const SVG = styled.svg`
  fill: ${props => props.theme.colors.Modal.close};
  display: block;
  height: 100%;
  width: 100%;
`

class MainHeader extends Component<Props, void> {
  constructor (props: Props) {
    super(props)
    this.state = {
      navOpen: false,
      displayShadow: false
    }

    this.openNav = this.openNav.bind(this)
    this.closeNav = this.closeNav.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
  }

  componentDidMount () {
    this.bindScroll()
  }

  componentWillUnmount () {
    this.unbindScroll()
  }

  bindScroll = () => {
    // Use passive event listener if available
    let supportsPassive = false
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: () => {
          supportsPassive = true
        }
      })
      window.addEventListener('test', null, opts)
    } catch (e) {} // eslint-disable-line no-empty

    window.addEventListener(
      'scroll',
      this.handleScroll,
      supportsPassive ? { passive: true } : false
    )
  }

  unbindScroll = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    // Ugly cross-browser compatibility
    const top =
      document.documentElement.scrollTop ||
      document.body.parentNode.scrollTop ||
      document.body.scrollTop

    // Test < 1 since Safari's rebound effect scrolls past the top
    if (top < 1) {
      this.setState({ displayShadow: false })
    } else if (this.state.displayShadow === false) {
      this.setState({ displayShadow: true })
    }
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

  toggleNav () {
    this.setState({
      navOpen: !this.state.navOpen
    })
  }

  render () {
    let userAvatar = ''
    if (this.props.userAddress) {
      const lowerAddress = add0x(this.props.userAddress)
      userAvatar = (
        <ProfileAvatarLink to="/wallet">
          <Blockies seed={lowerAddress} size={10} scale={4} />
        </ProfileAvatarLink>
      )
    }

    return (
      <Header
        displayShadow={this.state.displayShadow}
        open={this.state.navOpen}
      >
        {this.props.children}
        <HeaderWrapper open={this.state.navOpen}>
          <LogoWrapper>
            <MainHeaderLogo />
          </LogoWrapper>
          <HeaderContent open={this.state.navOpen}>
            <SearchWrapper>
              <SearchInput />
            </SearchWrapper>
            <HeaderButtons>
              <MainNavigation closeNav={this.closeNav} />
              {userAvatar}
            </HeaderButtons>
          </HeaderContent>
          <MobileButton onClick={this.toggleNav} open={this.state.navOpen}>
            <SVG>
              <use
                xlinkHref={this.state.navOpen ? '#icon-close' : '#icon-menu'}
              />
            </SVG>
          </MobileButton>
        </HeaderWrapper>
      </Header>
    )
  }
}

export default MainHeader
