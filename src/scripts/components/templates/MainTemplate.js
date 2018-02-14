import React, { Component } from 'react'
import styled from 'styled-components'
import MainSvg from '../foundations/svgs/MainSvg'

type Props = {
  children: Object
}

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.body.background};
  font-family: ${props =>
    props.theme.fonts.family ? props.theme.fonts.family : 'Monospace'},
    sans-serif, sans-serif;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

class MainTemplate extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <MainSvg />
        {this.props.children}
      </Wrapper>
    )
  }
}

export default MainTemplate
