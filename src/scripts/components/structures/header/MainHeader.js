// import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import MainHeaderLogo from 'components/widgets/MainHeaderLogo'
import MainNavigation from 'components/structures/header/MainNavigation'
import { Link } from 'react-router-dom'
import Blockies from 'react-blockies'

type Props = {
  children: Object,
  userAddress: String
}

const Header = styled.header`
  background-color: ${props => props.theme.colors.header.background};
  display: flex;
  flex: 0 0 ${props => props.theme.sizes.mainHeader.height};
  align-items: center;
  padding: ${props => props.theme.sizes.mainHeader.padding};
  position: fixed;
  width: 100%;
  height: ${props => props.theme.sizes.mainHeader.height};
  z-index: 10000;
  transition: box-shadow 0.3s;
  box-shadow: ${({ displayShadow }) =>
    displayShadow ? '0 3px 5px rgba(0,0,0,0.16)' : ''};
`

const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;

  form {
    flex: 0 0 207px;
    transform: translate3d(82px, -5px, 0);
  }
`

const HeaderButtons = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`

// foundation/widgets(move?)

const ProfileAvatarLink = styled(Link)`
  background-color: ${props => props.theme.colors.header.color};
  border-radius: 100%;
  flex: 0 0 40px;
  height: 40px;
  margin-left: 45px;
  overflow: hidden;
`

class MainHeader extends Component<Props, void> {
  constructor (props: Props) {
    super(props)
    this.state = {
      displayShadow: false
    }
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

  render () {
    let userAvatar = ''
    if (this.props.userAddress !== '') {
      userAvatar = (
        <ProfileAvatarLink to="/wallet">
          <Blockies seed={this.props.userAddress} size={10} scale={4} />
        </ProfileAvatarLink>
      )
    }

    console.log(this.props.userAddress)
    return (
      <Header displayShadow={this.state.displayShadow}>
        {this.props.children}
        <HeaderWrapper>
          <MainHeaderLogo />
          <HeaderContent>
            <HeaderButtons>
              <MainNavigation />
              {userAvatar}
            </HeaderButtons>
          </HeaderContent>
        </HeaderWrapper>
      </Header>
    )
  }
}

export default MainHeader
