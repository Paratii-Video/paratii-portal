import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SVGIcon from 'components/foundations/SVGIcon'

type Props = {
  clickOnLogo: (e: Object) => void
}

const MainLogo = styled.h1`
  display: block;
  height: 100%;
  width: 100%;
`

const MainLogoAnchor = styled(Link)`
  display: block;
  height: 100%;
  width: 100%;
`

class MainHeaderLogo extends Component<Props, void> {
  render () {
    return (
      <MainLogo>
        <MainLogoAnchor to="/" onClick={this.props.clickOnLogo}>
          <SVGIcon color="white" icon="paratii-logo" />
        </MainLogoAnchor>
      </MainLogo>
    )
  }
}

export default MainHeaderLogo
