import React, { Component } from 'react'
import styled from 'styled-components'
import HR from '../foundations/HR'

//

type Props = {
}

//

const Footer = styled.footer`
  background-color: ${props => props.theme ? props.theme.colors.footer.background : 'black'};
  padding: 42px 64px;
`

const FooterOpenSourceText = styled.p`
  color: ${props => props.theme.colors.footer.color};
  display: block;
  text-align: center;
`

//

class MainFooter extends Component<Props, void> {
  render () {
    return (
      <Footer>
        <HR/>
        <FooterOpenSourceText>we ❤ open source</FooterOpenSourceText>
      </Footer>
    )
  }
}

export default MainFooter
