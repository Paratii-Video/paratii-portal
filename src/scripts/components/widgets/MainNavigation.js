import React, { Component } from 'react'
import styled from 'styled-components'
import NavLink from '../foundations/buttons/NavLink'

//

type Props = {
}

//

const Nav = styled.nav`
  display: block;
`

const NavList = styled.ul`
  display: flex;
`

const NavItem = styled.li`
  padding-left: 45px;
`

//

class MainNavigation extends Component<Props, void> {
  render () {
    return (
      <Nav>
        <NavList>
          <NavItem>
            <NavLink to='/uploader/upload-file'>Upload video</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='/about'>About Paratii</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='/about'>Outro item</NavLink>
          </NavItem>
        </NavList>
      </Nav>
    )
  }
}

export default MainNavigation
