import React, { Component } from 'react'
import styled from 'styled-components'
import MainHeaderLogo from '../components/MainHeaderLogo'
import SearchInput from '../components/SearchInput'

//

type Props = {
  children: Object
};

//

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

const MainHeaderContent = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;

  form {
    flex-basis: 300px;
    transform: translate3d(82px, -5px, 0);
  }
`

//

class MainHeader extends Component<Props, void> {
  render () {
    return (
      <Header>
        {this.props.children}
        <HeaderWrapper>
          <MainHeaderLogo/>
          <MainHeaderContent>
            <SearchInput/>
          </MainHeaderContent>
        </HeaderWrapper>
      </Header>
    )
  }
}

export default MainHeader
