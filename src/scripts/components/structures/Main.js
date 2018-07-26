import React, { Component } from 'react'
import styled from 'styled-components'
import {
  MAINHEADER_LOGO_HEIGHT,
  MEDIAQUERY_BREAKPOINT,
  USERNAV_WIDTH,
  MAINWRAPPER_PADDING_VERTICAL,
  MAINWRAPPER_PADDING_VERTICAL_MOBILE,
  MAINWRAPPER_PADDING_HORIZONTAL,
  MAINWRAPPER_PADDING_HORIZONTAL_MOBILE
} from 'constants/UIConstants'

type Props = {
  landing: boolean,
  play: boolean,
  isWalletSecured: boolean,
  children: Object
}

const MainWrapper = styled.main`
  background-color: ${props => props.theme.colors.background.body};
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  margin: ${MAINHEADER_LOGO_HEIGHT} 0 0
    ${({ isWalletSecured }) => (isWalletSecured ? USERNAV_WIDTH : '0')};
  min-height: 500px;
  padding: ${({ landing, play }) => (landing || play ? null : MAINWRAPPER_PADDING_VERTICAL + ' ' + MAINWRAPPER_PADDING_HORIZONTAL)};

  @media ${MEDIAQUERY_BREAKPOINT} {
    margin-left: 0;
  }

  @media (max-width: 1024px) {
    padding: ${({ landing, play }) => (landing || play ? null : MAINWRAPPER_PADDING_VERTICAL)};
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }

  @media (max-width: 767px) {
    padding: ${({ landing, play }) => (landing || play ? null : MAINWRAPPER_PADDING_VERTICAL_MOBILE + ' ' + MAINWRAPPER_PADDING_HORIZONTAL_MOBILE)};
  }
`

class Main extends Component<Props, void> {
  render () {
    return (
      <MainWrapper
        landing={this.props.landing}
        play={this.props.play}
        isWalletSecured={this.props.isWalletSecured}
      >
        {this.props.children}
      </MainWrapper>
    )
  }
}

export default Main
