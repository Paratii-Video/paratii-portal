import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  landing: Boolean,
  children: Object
}

const MainWrapper = styled.main`
  background-color: ${props => props.theme.colors.body.background};
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  justify-content: center;
  margin-top: 69px;
  min-height: 500px;
  padding: ${({ landing }) => (landing ? null : '40px 80px')};

  @media (max-width: 1024px) {
    padding: ${({ landing }) => (landing ? null : '40px')};
  }

  @media (max-width: 767px) {
    padding: ${({ landing }) => (landing ? null : '16px 20px 0')};
  }
`

class Main extends Component<Props, void> {
  render () {
    return (
      <MainWrapper landing={this.props.landing}>
        {this.props.children}
      </MainWrapper>
    )
  }
}

export default Main
