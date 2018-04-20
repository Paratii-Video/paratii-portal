import React, { Component } from 'react'
import styled from 'styled-components'
import MainSvg from '../foundations/svgs/MainSvg'

type Props = {
  children: Object
}

// injectGlobal`
//   html {
//     font-size: 16px;
//   }

//   body {
//     font-family: 'Roboto', sans-serif;
//     font-size: 1rem;
//   }
// `

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.body.background};
  display: flex;
  min-height: 100vh;
  height: 100vh;
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
