import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import MainSvg from '../foundations/svgs/MainSvg'

type Props = {
  children: Object
}

injectGlobal`
  html, body {
    background-color: ${props => props.theme.colors.body.background};
    font-family: ${props =>
    props.theme.fonts.family ? props.theme.fonts.family : 'Monospace'},
      sans-serif;
    font-size: ${props => props.theme.fonts.base};
  }
`

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.body.background};
  font-family: ${props =>
    props.theme.fonts.family ? props.theme.fonts.family : 'Monospace'},
    sans-serif;
  font-size: ${props => props.theme.fonts.base};
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  h1,
  h2,
  h3. h4,
  h5,
  h6 {
    font-weight: ${props => props.theme.fonts.weight.light};
  }
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
