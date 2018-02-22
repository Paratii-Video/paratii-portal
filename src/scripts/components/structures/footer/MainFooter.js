import React, { Component } from 'react'
import styled from 'styled-components'
import Button from 'components/foundations/Button'

type Props = {}

const Footer = styled.footer`
  background-color: ${props =>
    props.theme ? props.theme.colors.footer.background : 'black'};
  padding: ${props => props.theme.sizes.mainFooter.padding};
`

const FooterOpenSourceText = styled.p`
  color: ${props => props.theme.colors.footer.color};
  font-size: ${props => props.theme.fonts.footer.text};
  display: block;
`

const Anchor = Button.withComponent('a')

class MainFooter extends Component<Props, void> {
  render () {
    return (
      <Footer>
        <FooterOpenSourceText>
          Discover all about Paratii on{' '}
          <Anchor anchor purple href="http://paratii.video/" target="_blank">
            paratii.video
          </Anchor>
        </FooterOpenSourceText>
      </Footer>
    )
  }
}

export default MainFooter
