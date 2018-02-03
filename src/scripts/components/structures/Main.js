import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  children: Object
}

const MainWrapper = styled.main`
  background-color: ${props => props.theme.colors.body.background};
  flex: 1 1 100%;
  display: flex;
  padding: 80px;
`

class Main extends Component<Props, void> {
  render () {
    return <MainWrapper>{this.props.children}</MainWrapper>
  }
}

export default Main
