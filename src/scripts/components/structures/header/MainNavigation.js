/* @flow */

import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  NAVITEM_PADDING_HORIZONTAL,
  NAVITEM_PADDING_VERTICAL_BP,
  MEDIAQUERY_BREAKPOINT_MAINHEADER,
  MAINHEADER_PADDING_LEFT_BP } from 'constants/UIConstants'
import {
  JOIN_US_ON_TELEGRAM,
  ABOUT_US
} from 'constants/UrlConstants'
import Button from 'components/foundations/Button'
import TextButton from 'components/foundations/TextButton'
import SVGIcon from 'components/foundations/SVGIcon'
import TranslatedText from 'components/translations/TranslatedText'

type Props = {
  isWalletSecured: boolean,
  closeMainNavAndUserNav: () => void,
  checkUserWallet: () => void
}

const Nav = styled.nav`
  display: block;

  @media ${MEDIAQUERY_BREAKPOINT_MAINHEADER} {
    margin: 0 0 0 ${MAINHEADER_PADDING_LEFT_BP};
  }
`

const NavList = styled.ul`
  display: flex;
  align-items: center;

  @media ${MEDIAQUERY_BREAKPOINT_MAINHEADER} {
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
`

const NavItem = styled.li`
  display: ${({ onlyMobile }) => onlyMobile ? 'none' : 'flex'};
  padding-left: ${NAVITEM_PADDING_HORIZONTAL};

  @media ${MEDIAQUERY_BREAKPOINT_MAINHEADER} {
    display: flex;
    padding: ${NAVITEM_PADDING_VERTICAL_BP} 0;
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
          {this.props.isWalletSecured && (
            <Fragment>
              <NavItem>
                <NavLink onClick={this.props.closeMainNavAndUserNav} to="/profile">
                  <TranslatedText message="navigation.profile" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.props.closeMainNavAndUserNav} to="/profile/my-videos">
                  <TranslatedText message="navigation.myVideos" />
                </NavLink>
              </NavItem>
            </Fragment>
          )}
          {!this.props.isWalletSecured && (
            <NavItem>
              <Anchor
                onClick={this.props.closeMainNavAndUserNav}
                href={JOIN_US_ON_TELEGRAM}
                target="_blank"
                iconbutton
              >
                <SVGIcon
                  icon="icon-telegram"
                  width="18px"
                  height="16px"
                  margin="0 18px 0 0"
                />
                <TranslatedText message="navigation.telegram" />
              </Anchor>
            </NavItem>
          )}
          <NavItem>
            <Anchor
              onClick={this.props.closeMainNavAndUserNav}
              href={ABOUT_US}
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
          ) : null}
        </NavList>
      </Nav>
    )
  }
}

export default MainNavigation
