import React, { Component } from 'react'
import styled from 'styled-components'
import NavLink from 'components/foundations/buttons/NavLink'
import Anchor from 'components/foundations/buttons/Anchor'

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
const AnchorNav = styled(Anchor)`
  font-size: 14px;
`

class MainNavigation extends Component<Props, void> {
  render () {
    return (
      <Nav>
        <NavList>
          <NavItem>
            <NavLink to="/upload">Upload video</NavLink>
          </NavItem>
          <NavItem>
            <AnchorNav href="http://paratii.video/" target="_blank">
              About Paratii
            </AnchorNav>
          </NavItem>
        </NavList>
      </Nav>
    )
  }
}

export default MainNavigation
