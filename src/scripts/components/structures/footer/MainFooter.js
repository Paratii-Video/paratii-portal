import React, { Component } from 'react'
import styled from 'styled-components'
import { FlexCenterStyle } from 'components/foundations/Styles'
import TextButton from 'components/foundations/TextButton'
import Text from 'components/foundations/Text'
import {
  MAINFOOTER_PADDING,
  MAINFOOTER_PADDING_BP,
  MAINFOOTER_BUTTONSCONTAINER_MARGIN,
  MAINFOOTER_LOGO_WIDTH,
  MAINFOOTER_LOGO_HEIGHT,
  MAINFOOTER_LOGO_MARGIN,
  Z_INDEX_FOOTER
} from 'constants/UIConstants'
import TranslatedText from 'components/translations/TranslatedText'

type Props = {}

const Footer = styled.footer`
  align-items: center;
  background-color: ${props => props.theme.colors.background.primary};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  padding: ${MAINFOOTER_PADDING};
  text-align: center;
  z-index: ${Z_INDEX_FOOTER};

  @media (max-width: 900px) {
    flex-direction: column;
    padding: ${MAINFOOTER_PADDING_BP};
    flex: initial;
  }
`

const FooterOpenSourceText = Text.extend`
  display: block;
`

const Anchor = TextButton.withComponent('a')

const ButtonsContainer = styled.div`
  ${FlexCenterStyle}
  margin: ${MAINFOOTER_BUTTONSCONTAINER_MARGIN};
  width: 100%;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`

const FooterLogoLink = styled.a`
  flex: 0 1 auto;
  display: block;
  height: ${MAINFOOTER_LOGO_HEIGHT};
  margin: ${MAINFOOTER_LOGO_MARGIN};
  transition: opacity 0.5s;

  &:hover {
    opacity: 0.6;
  }
`

const FooterLogo = styled.img`
  display: block;
  height: 100%;
  max-width: ${MAINFOOTER_LOGO_WIDTH};
`

class MainFooter extends Component<Props, void> {
  render () {
    return (
      <Footer>
        <FooterOpenSourceText tiny>
          <TranslatedText
            message="footer.discover_html"
            options={{
              homePageLink: (
                <Anchor
                  anchor
                  highlight
                  href="http://paratii.video/"
                  target="_blank"
                >
                  <TranslatedText message="footer.homePage" />
                </Anchor>
              )
            }}
          />
        </FooterOpenSourceText>
        <ButtonsContainer>
          <FooterLogoLink anchor href="https://github.com/clappr/clappr"><FooterLogo src="/assets/svg/footer/logo-clappr.svg" /></FooterLogoLink>
          <FooterLogoLink anchor href="https://www.ethereum.org/"><FooterLogo src="/assets/svg/footer/logo-ethereum.svg" /></FooterLogoLink>
          <FooterLogoLink anchor href="https://ipfs.io/"><FooterLogo src="/assets/svg/footer/logo-ipfs.svg" /></FooterLogoLink>
        </ButtonsContainer>
        <FooterOpenSourceText tiny>
          <TranslatedText
            message="footer.betaTool_html"
            options={{
              telegramBrazilLink: (
                <Anchor
                  anchor
                  highlight
                  href="https://t.me/paratiivideo"
                  target="_blank"
                >
                  <TranslatedText message="footer.brazil" />
                </Anchor>
              ),
              telegramEnglishLink: (
                <Anchor
                  anchor
                  highlight
                  href="https://t.me/joinchat/EWZMBQ9mnqJ1--NKHpyF8A"
                  target="_blank"
                >
                  <TranslatedText message="footer.english" />
                </Anchor>
              )
            }}
          />
        </FooterOpenSourceText>
      </Footer>
    )
  }
}

export default MainFooter
