/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import MainHeaderLogo from '../components/MainHeaderLogo'

type Props = {
}

const Header = styled.header`
  background-color: ${props => props.theme ? props.theme.colors.header.background : 'black'};
  height: ${props => props.theme.sizes ? props.theme.sizes.mainHeader.height : 'auto'};
  padding-left: 80px;
  padding-right: 80px;
`

const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`

class MainHeader extends Component<Props, void> {
  render () {
    return (
      <Header>
        <HeaderWrapper>
          <MainHeaderLogo/>
        </HeaderWrapper>
      </Header>
    )
  }
}

export default MainHeader
