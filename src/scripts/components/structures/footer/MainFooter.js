import React, { Component } from 'react'
import styled from 'styled-components'
import Button from 'components/foundations/Button'

type Props = {}

const Footer = styled.footer`
  align-items: center;
  background-color: ${props => props.theme.colors.footer.background};
  display: flex;
  flex: 0 0 ${props => props.theme.sizes.mainFooter.height};
  justify-content: space-between;
  padding: ${props => props.theme.sizes.mainFooter.padding};

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 55px 40px 50px;
    flex: initial;
  }
`

const FooterOpenSourceText = styled.p`
  color: ${props => props.theme.colors.footer.color};
  font-size: ${props => props.theme.fonts.footer.text};
  display: block;
`

const FooterOpenSourceText2 = FooterOpenSourceText.extend`
  color: ${props => props.theme.colors.footer.color2};

  @media (max-width: 900px) {
    margin-top: 30px;
  }
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
        <FooterOpenSourceText2>
          v0.0.1: This is a beta tool! We &hearts; to get feedback on Telegram{' '}
          <Anchor
            anchor
            href="https://t.me/paratiivideo"
            target="_blank"
            underline
          >
            BR
          </Anchor>{' '}
          or{' '}
          <Anchor
            anchor
            href="https://t.me/joinchat/EWZMBQ9mnqJ1--NKHpyF8A"
            target="_blank"
            underline
          >
            EN
          </Anchor>
        </FooterOpenSourceText2>
      </Footer>
    )
  }
}

export default MainFooter
