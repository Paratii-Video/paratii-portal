import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Button from 'components/foundations/Button'
import Hidden from 'components/foundations/Hidden'
import PTIBalanceContainer from 'containers/widgets/PTIBalanceContainer'

type Props = {
  closeNav: () => void
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

class MainNavigation extends Component<Props, void> {
  render () {
    return (
      <Nav>
        <NavList>
          <NavItem>
            <NavLink onClick={this.props.closeNav} to="/voucher">
              Get PTI
            </NavLink>
          </NavItem>
          <Hidden>
            <NavItem>
              <NavLink onClick={this.props.closeNav} to="/my-videos">
                My videos
              </NavLink>
            </NavItem>
          </Hidden>
          <NavItem>
            <NavLink onClick={this.props.closeNav} to="/upload">
              Upload
            </NavLink>
          </NavItem>
          <NavItem>
            <Anchor
              onClick={this.props.closeNav}
              href="http://paratii.video/"
              target="_blank"
            >
              About Paratii
            </Anchor>
          </NavItem>
          <NavItem data-test-id="nav-pti-balance">
            <PTIBalanceContainer />
          </NavItem>
        </NavList>
      </Nav>
    )
  }
}

export default MainNavigation
