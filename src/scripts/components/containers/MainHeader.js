import React, { Component } from 'react'
import styled from 'styled-components'
import MainHeaderLogo from '../components/MainHeaderLogo'
import SearchInput from '../components/SearchInput'
import MainNavigation from '../components/MainNavigation'
import { Link } from 'react-router-dom'

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

const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: space-between;

  form {
    flex-basis: 207px;
    transform: translate3d(82px, -5px, 0);
  }
`

const HeaderButtons = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`

//

const ButtonBucket = styled.button`
  flex: 0 0 20px;
  height: 23px;
  margin-left: 45px;
`

const ButtonBucketSVG = styled.svg`
  display: block;
  fill: ${props => props.theme.colors.header.color};
  height: 100%;
  width: 100%;
`

const ProfileAvatarLink = styled(Link)`
  background-color: ${props => props.theme.colors.header.color};
  border-radius: 100%;
  flex: 0 0 40px;
  height: 40px;
  margin-left: 45px;
`

//

class MainHeader extends Component<Props, void> {
  render () {
    return (
      <Header>
        {this.props.children}
        <HeaderWrapper>
          <MainHeaderLogo/>
          <HeaderContent>
            <SearchInput/>
            <HeaderButtons>
              <MainNavigation/>
              <ButtonBucket>
                <ButtonBucketSVG>
                  <use xlinkHref="#icon-bucket"></use>
                </ButtonBucketSVG>
              </ButtonBucket>
              <ProfileAvatarLink to='/signup'></ProfileAvatarLink>
            </HeaderButtons>
          </HeaderContent>
        </HeaderWrapper>
      </Header>
    )
  }
}

export default MainHeader
