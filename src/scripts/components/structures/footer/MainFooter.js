import React, { Component } from 'react'
import styled from 'styled-components'
import TextButton from 'components/foundations/TextButton'
import Text from 'components/foundations/Text'
import { MAINFOOTER_HEIGHT, Z_INDEX_FOOTER } from 'constants/UIConstants'
import TranslatedText from 'components/translations/TranslatedText'

type Props = {}

const Footer = styled.footer`
  align-items: center;
  background-color: ${props => props.theme.colors.background.primary};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
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

const FooterOpenSourceText = Text.extend`
  display: block;
`

const FooterOpenSourceText2 = FooterOpenSourceText.extend`
  @media (max-width: 900px) {
    margin-top: 30px;
  }

  @media (max-width: 767px) {
    padding: 0 40px;
  }
`

const Anchor = TextButton.withComponent('a')

class MainFooter extends Component<Props, void> {
  render () {
    return (
      <Footer>
        <FooterOpenSourceText tiny>
          <TranslatedText
            message="footer.discover_html"
            options={{
              homePageLink: (
                <Anchor anchor href="http://paratii.video/" target="_blank">
                  <TranslatedText message="footer.homePage" />
                </Anchor>
              )
            }}
          />
        </FooterOpenSourceText>
        <FooterOpenSourceText2 tiny>
          <TranslatedText
            message="footer.betaTool_html"
            options={{
              telegramBrazilLink: (
                <Anchor anchor href="https://t.me/paratiivideo" target="_blank">
                  <TranslatedText message="footer.brazil" />
                </Anchor>
              ),
              telegramEnglishLink: (
                <Anchor
                  anchor
                  href="https://t.me/joinchat/EWZMBQ9mnqJ1--NKHpyF8A"
                  target="_blank"
                >
                  <TranslatedText message="footer.english" />
                </Anchor>
              )
            }}
          />
        </FooterOpenSourceText2>
      </Footer>
    )
  }
}

export default MainFooter
