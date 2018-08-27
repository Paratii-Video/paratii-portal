import React, { Component } from 'react'
import styled from 'styled-components'
import {
  MAINHEADER_HEIGHT,
  MAINWRAPPER_PADDING_VERTICAL,
  MAINWRAPPER_PADDING_VERTICAL_MOBILE,
  MAINWRAPPER_PADDING_HORIZONTAL,
  MAINWRAPPER_PADDING_HORIZONTAL_MOBILE
} from 'constants/UIConstants'
import AlphaBar from '../widgets/AlphaBar'

type Props = {
  landing: boolean,
  play: boolean,
  isWalletSecured: boolean,
  children: Object
}

const Wrapper = styled.main`
  background-color: ${props => props.theme.colors.background.body};
  display: block;
  flex: 1 1 100%;
  margin: ${MAINHEADER_HEIGHT} 0 0 0;
  min-height: 500px;
`

const Children = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ landing, play }) => (landing || play ? null : MAINWRAPPER_PADDING_VERTICAL + ' ' + MAINWRAPPER_PADDING_HORIZONTAL)};

  @media (max-width: 1024px) {
    padding: ${({ landing, play }) => (landing || play ? null : MAINWRAPPER_PADDING_VERTICAL)};
  }

  @media (max-width: 767px) {
    padding: ${({ landing, play }) => (landing || play ? null : MAINWRAPPER_PADDING_VERTICAL_MOBILE + ' ' + MAINWRAPPER_PADDING_HORIZONTAL_MOBILE)};
  }
`

class Main extends Component<Props, void> {
  render () {
    return (
      <Wrapper
        landing={this.props.landing}
        play={this.props.play}
        isWalletSecured={this.props.isWalletSecured}
      >
        <AlphaBar />
        <Children
          landing={this.props.landing}
          play={this.props.play}
        >
          {this.props.children}
        </Children>
      </Wrapper>
    )
  }
}

export default Main
