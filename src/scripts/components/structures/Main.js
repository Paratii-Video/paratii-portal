import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  children: Object
}

const MainWrapper = styled.main`
  background-color: ${props => props.theme.colors.body.background};
  flex: 1 1 100%;
  padding: 80px;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  margin-top: ${props => props.theme.sizes.mainHeader.height};

  @media (max-width: 930px) {
    padding: 40px;
  }
`

class Main extends Component<Props, void> {
  render () {
    return <MainWrapper>{this.props.children}</MainWrapper>
  }
}

export default Main
