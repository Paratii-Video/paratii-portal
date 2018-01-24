import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

type Props = {}

const MainLogo = styled.h1`
  display: block;
  flex: 0 0 ${props => props.theme.sizes ? props.theme.sizes.mainHeaderLogo.width : ''};
  height: ${props => props.theme.sizes ? props.theme.sizes.mainHeaderLogo.height : ''};
`

const MainLogoAnchor = styled(Link)`
  display: block;
  height: 100%;
  width: 100%;
`

const MainLogoSVG = styled.svg`
  display: block;
  fill: ${props => props.theme.colors.header.logoFill};
  height: 100%;
  width: 100%;
`

class MainHeaderLogo extends Component<Props, void> {
  render () {
    return (
      <MainLogo>
        <MainLogoAnchor to='/'>
          <MainLogoSVG>
            <use xlinkHref="#paratii-logo"></use>
          </MainLogoSVG>
        </MainLogoAnchor>
      </MainLogo>
    )
  }
}

export default MainHeaderLogo
