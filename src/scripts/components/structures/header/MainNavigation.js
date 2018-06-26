/* @flow */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Button, { ButtonColor } from 'components/foundations/Button'
import Hidden from 'components/foundations/Hidden'
import TranslatedText from 'components/translations/TranslatedText'
import PTIBalanceContainer from 'containers/widgets/PTIBalanceContainer'
import { WALLET_KEY_SECURE } from 'constants/ParatiiLibConstants'

type Props = {
  isWalletSecured: boolean,
  closeNavAndUserNav: () => void,
  checkUserWallet: () => void
}

const Nav = styled.nav`
  display: block;
`

const NavList = styled.ul`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
`

const NavItem = styled.li`
  padding-left: 45px;

  @media (max-width: 768px) {
    padding: 20px 0;
  }
`

const StyleNavLink = Button.extend`
  font-size: 14px;
  font-weight: ${props => props.theme.fonts.weight.regular};
  text-transform: initial;
`

const NavLink = StyleNavLink.withComponent(Link)

const Anchor = StyleNavLink.withComponent('a')

class MainNavigation extends Component<Props, Object> {
  secureWallet: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.secureWallet = this.secureWallet.bind(this)
  }

  secureWallet (e: Object) {
    e.preventDefault()
    this.props.checkUserWallet()
    this.props.closeNavAndUserNav()
  }

  render () {
    const walletStringSecure: ?string = localStorage.getItem(WALLET_KEY_SECURE)

    return (
      <Nav>
        <NavList>
          <NavItem>
            <NavLink onClick={this.props.closeNavAndUserNav} to="/voucher">
              <TranslatedText message="navigation.voucher" />
            </NavLink>
          </NavItem>
          <Hidden>
            <NavItem>
              <NavLink onClick={this.props.closeNavAndUserNav} to="/my-videos">
                <TranslatedText message="navigation.myVideos" />
              </NavLink>
            </NavItem>
          </Hidden>
          <NavItem>
            <NavLink onClick={this.props.closeNavAndUserNav} to="/upload">
              <TranslatedText message="navigation.upload" />
            </NavLink>
          </NavItem>
          <NavItem>
            <Anchor
              onClick={this.props.closeNavAndUserNav}
              href="http://paratii.video/"
              target="_blank"
            >
              <TranslatedText message="navigation.about" />
            </Anchor>
          </NavItem>

          {!this.props.isWalletSecured ? (
            <NavItem>
              <ButtonColor
                data-test-id="login-signup"
                onClick={this.secureWallet}
                to="#"
              >
                {walletStringSecure ? (
                  <TranslatedText message="navigation.logIn" />
                ) : (
                  <TranslatedText message="navigation.signUp" />
                )}
              </ButtonColor>
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
