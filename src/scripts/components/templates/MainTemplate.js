import React, { Component } from 'react'
import styled from 'styled-components'
import Svgs from '../foundations/Svgs'

//

type Props = {
  children: Object
};

//

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.body.background};
  font-family: ${props => props.theme.fonts.family ? props.theme.fonts.family : 'Monospace'}, sans-serif;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

//

class MainTemplate extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <Svgs/>
        {this.props.children}
      </Wrapper>
    )
  }
}

export default MainTemplate
