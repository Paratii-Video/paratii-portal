/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import logo from 'assets/img/paratii_logo.png'
import Wrapper from './foundations/Wrapper'

type Props = {}

const Header = styled.header`
  background-color: #222;
  flex: 0 0 50px;
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  height: 80px;
`

class MainHeader extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <Header>
          <Logo src={logo} alt='logo' />
        </Header>
      </Wrapper>
    )
  }
}

export default MainHeader
