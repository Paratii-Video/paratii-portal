import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.header.color};
  display: block;
  font-size: 14px;
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
        </NavList>
      </Nav>
    )
  }
}

export default MainNavigation
