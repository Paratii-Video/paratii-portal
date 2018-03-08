import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  children: Object
}

const MainWrapper = styled.main`
  background-color: ${props => props.theme.colors.body.background};
  flex: 1 1 100%;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  min-height: 500px;

  @media (max-width: 1024px) {
    padding: 40px;
  }
`

class Main extends Component<Props, void> {
  render () {
    return <MainWrapper>{this.props.children}</MainWrapper>
  }
}

export default Main
