import React, { Component } from 'react'
import styled from 'styled-components'
import MainHeaderLogo from 'components/widgets/MainHeaderLogo'
import SearchInput from 'components/widgets/SearchInput'
import MainNavigation from 'components/structures/header/MainNavigation'
import { Link } from 'react-router-dom'
import Blockies from 'react-blockies'

type Props = {
  children: Object
}

const Header = styled.header`
  background-color: ${props => props.theme.colors.header.background};
  height: ${props => props.theme.sizes.mainHeader.height};
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
    flex: 0 0 207px;
    transform: translate3d(82px, -5px, 0);
  }
`

const HeaderButtons = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`

// foundation/widgets(move?)

const ButtonBucket = styled.button`
  flex: 0 0 20px;
  height: 23px;
  margin-left: 45px;
`

const ButtonBucketSVG = styled.svg`
  display: block;
  fill: ${props => props.theme.colors.header.iconsFill};
  height: 100%;
  width: 100%;
`

const ProfileAvatarLink = styled(Link)`
  background-color: ${props => props.theme.colors.header.color};
  border-radius: 100%;
  flex: 0 0 40px;
  height: 40px;
  margin-left: 45px;
  overflow: hidden;
`

// const ProfileAvatarImage = styled.img`
//   transition: filter ${props => props.theme.animation.time.repaint};
//
//   ${ProfileAvatarLink}:hover & {
//     filter: brightness(1.5);
//   }
// `

class MainHeader extends Component<Props, void> {
  render () {
    return (
      <Header>
        {this.props.children}
        <HeaderWrapper>
          <MainHeaderLogo />
          <HeaderContent>
            <SearchInput />
            <HeaderButtons>
              <MainNavigation />
              <ButtonBucket>
                <ButtonBucketSVG>
                  <use xlinkHref="#icon-bucket" />
                </ButtonBucketSVG>
              </ButtonBucket>
              <ProfileAvatarLink to="/signup">
                <Blockies
                  seed="{window.paratii.config.account.address}"
                  size={10}
                  scale={4}
                />
              </ProfileAvatarLink>
            </HeaderButtons>
          </HeaderContent>
        </HeaderWrapper>
      </Header>
    )
  }
}

export default MainHeader
