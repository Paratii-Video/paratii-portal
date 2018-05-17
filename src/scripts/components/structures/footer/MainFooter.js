import React, { Component } from 'react'
import styled from 'styled-components'
import Button from 'components/foundations/Button'
import { MAINFOOTER_HEIGHT, Z_INDEX_FOOTER } from 'constants/UIConstants'

type Props = {}

const Footer = styled.footer`
  align-items: center;
  background-color: ${props => props.theme.colors.footer.background};
  box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.16);
  display: flex;
  flex: 0 0 ${MAINFOOTER_HEIGHT};
  justify-content: space-between;
  padding: 0 80px;
  z-index: ${Z_INDEX_FOOTER};

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 55px 40px 50px;
    flex: initial;
  }

  @media (max-width: 767px) {
    text-align: center;
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

  @media (max-width: 767px) {
    padding: 0 40px;
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
