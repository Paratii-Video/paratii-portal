import React, { Component } from 'react'
import styled from 'styled-components'

//

type Props = {
}

//

const Footer = styled.footer`
  background-color: ${props => props.theme ? props.theme.colors.footer.background : 'black'};
  height: ${props => props.theme.sizes ? props.theme.sizes.mainFooter.height : 'auto'};
  padding-left: 64px;
  padding-right: 64px;
`

//

class MainFooter extends Component<Props, void> {
  render () {
    return (
      <Footer>
      </Footer>
    )
  }
}

export default MainFooter
