import React, { Component } from 'react'
import styled from 'styled-components'
import Button from 'components/foundations/Button'
import { Link } from 'react-router-dom'

type Props = {}

const Nav = styled.nav`
  display: block;
`

const NavList = styled.ul`
  display: flex;
`

const NavItem = styled.li`
  padding-left: 45px;
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
            <NavLink to="/my-videos">My videos</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/upload">Upload video</NavLink>
          </NavItem>
          <NavItem>
            <Anchor href="http://paratii.video/" target="_blank">
              About Paratii
            </Anchor>
          </NavItem>
        </NavList>
      </Nav>
    )
  }
}

export default MainNavigation
