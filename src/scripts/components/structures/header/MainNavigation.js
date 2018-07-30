/* @flow */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MEDIAQUERY_BREAKPOINT } from 'constants/UIConstants'
import Button from 'components/foundations/Button'
import TextButton from 'components/foundations/TextButton'
import Hidden from 'components/foundations/Hidden'
import TranslatedText from 'components/translations/TranslatedText'
import PTIBalanceContainer from 'containers/widgets/PTIBalanceContainer'

type Props = {
  isWalletSecured: boolean,
  closeMainNavAndUserNav: () => void,
  checkUserWallet: () => void
}

const Nav = styled.nav`
  display: block;
`

const NavList = styled.ul`
  display: flex;
  align-items: center;

  @media ${MEDIAQUERY_BREAKPOINT} {
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
`

const NavItem = styled.li`
  display: ${({ onlyMobile }) => onlyMobile ? 'none' : null};
  padding-left: 45px;

  @media ${MEDIAQUERY_BREAKPOINT} {
    display: ${({ onlyMobile }) => onlyMobile ? 'block' : null};
    padding: 20px 0;
  }
`

const NavStyled = TextButton.extend`
  font-weight: ${props => props.theme.fonts.weight.regular};
  text-transform: initial;
`

const NavLink = NavStyled.withComponent(Link)

const Anchor = NavStyled.withComponent('a')

class MainNavigation extends Component<Props, Object> {
  secureWallet: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.secureWallet = this.secureWallet.bind(this)
  }

  secureWallet (e: Object) {
    e.preventDefault()
    this.props.checkUserWallet()
    this.props.closeMainNavAndUserNav()
  }

  render () {
    return (
      <Nav>
        <NavList>
          <NavItem onlyMobile>
            <NavLink onClick={this.props.closeMainNavAndUserNav} to="/profile">
              <TranslatedText message="navigation.profile" />
            </NavLink>
          </NavItem>
          <NavItem onlyMobile>
            <NavLink onClick={this.props.closeMainNavAndUserNav} to="/profile/my-videos">
              <TranslatedText message="navigation.myVideos" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.props.closeMainNavAndUserNav} to="/voucher">
              <TranslatedText message="navigation.voucher" />
            </NavLink>
          </NavItem>
          <Hidden>
            <NavItem>
              <NavLink
                onClick={this.props.closeMainNavAndUserNav}
                to="/my-videos"
              >
                <TranslatedText message="navigation.myVideos" />
              </NavLink>
            </NavItem>
          </Hidden>
          <NavItem>
            <NavLink onClick={this.props.closeMainNavAndUserNav} to="/upload">
              <TranslatedText message="navigation.upload" />
            </NavLink>
          </NavItem>
          <NavItem>
            <Anchor
              onClick={this.props.closeMainNavAndUserNav}
              href="http://paratii.video/"
              target="_blank"
            >
              <TranslatedText message="navigation.about" />
            </Anchor>
          </NavItem>

          {!this.props.isWalletSecured ? (
            <NavItem>
              <Button
                data-test-id="login-signup"
                onClick={this.secureWallet}
                to="#"
              >
                <TranslatedText message="navigation.logIn" />
              </Button>
            </NavItem>
          ) : (
            <NavItem>
              <PTIBalanceContainer />
            </NavItem>
          )}
        </NavList>
      </Nav>
    )
  }
}

export default MainNavigation
