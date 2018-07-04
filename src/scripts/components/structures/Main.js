import React, { Component } from 'react'
import styled from 'styled-components'
import {
  MAINHEADER_LOGO_HEIGHT,
  MEDIAQUERY_BREAKPOINT,
  USERNAV_WIDTH
} from 'constants/UIConstants'

type Props = {
  landing: boolean,
  isWalletSecured: boolean,
  children: Object
}

const MainWrapper = styled.main`
  background-color: ${props => props.theme.colors.body.background};
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  margin: ${MAINHEADER_LOGO_HEIGHT} 0 0
    ${({ isWalletSecured }) => (isWalletSecured ? USERNAV_WIDTH : '0')};
  min-height: 500px;
  padding: ${({ landing }) => (landing ? null : '40px 80px')};

  @media ${MEDIAQUERY_BREAKPOINT} {
    margin-left: 0;
  }

  @media (max-width: 1024px) {
    padding: ${({ landing }) => (landing ? null : '40px')};
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }

  @media (max-width: 767px) {
    padding: ${({ landing }) => (landing ? null : '16px 20px 0')};
  }
`

class Main extends Component<Props, void> {
  render () {
    return (
      <MainWrapper
        landing={this.props.landing}
        isWalletSecured={this.props.isWalletSecured}
      >
        {this.props.children}
      </MainWrapper>
    )
  }
}

export default Main
