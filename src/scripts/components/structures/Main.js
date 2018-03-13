import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  children: Object
}

const MainWrapper = styled.main`
  background-color: ${props => props.theme.colors.body.background};
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  justify-content: center;
  margin-top: ${props => props.theme.sizes.mainHeader.height};
  min-height: 500px;
  padding: 40px 80px;

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
