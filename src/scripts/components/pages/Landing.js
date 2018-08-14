import React, { Component } from 'react'
import styled from 'styled-components'
import type { Map } from 'immutable'
import type VideoRecord from 'records/VideoRecords'
import {
  BUTTON_HEIGHT,
  BUTTON_PADDING_LEFT,
  LANDING_HEADERWRAPPER_MARGIN_VERTICAL,
  MAINHEADER_LOGO_HEIGHT,
  MAINHEADER_PADDING_LEFT,
  MAINHEADER_PADDING_LEFT_BP,
  MAX_WIDTH,
  MEDIAQUERY_BREAKPOINT
} from 'constants/UIConstants'
import { Link } from 'react-router-dom'
import { FlexCenterStyle, AbsoluteFullStyle } from '../foundations/Styles'
import Title from '../foundations/Title'
import Text from '../foundations/Text'
import Button from '../foundations/Button'
import TruncatedText from '../foundations/TruncatedText'
import VideoTimeDisplay from '../foundations/VideoTimeDisplay'
import { ButtonStyleHover } from '../foundations/Button'
import SVGIcon from '../foundations/SVGIcon'
import TranslatedText from '../translations/TranslatedText'

type Props = {
  videos: Map<string, VideoRecord> // maps video ids to upload records
}

const ZINDEX_LANDINGVIDEOITEMSHADOW: Number = 2
const ZINDEX_LANDINGVIDEOITEMBACKGROUND: Number = 1
const ZINDEX_LANDINGVIDEOITEMLINK: Number = 3
const VIDEOLINK_POSITION: String = '40px'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  ${FlexCenterStyle}
  background: ${props => props.theme.colors.background.primary}
    url(${props => props.background}) no-repeat 50%;
  background-size: cover;
  box-shadow: ${props => props.theme.colors.LandingPage.secondary};
  flex-direction: column;
  padding: 0 ${MAINHEADER_PADDING_LEFT};

  @media ${MEDIAQUERY_BREAKPOINT} {
    background-image: url(${props => props.backgroundMobile});
    padding: 0 ${MAINHEADER_PADDING_LEFT_BP};
  }
`

const HeaderWrapper = styled.div`
  margin: ${LANDING_HEADERWRAPPER_MARGIN_VERTICAL} 0;
  width: 100%;

  @media (max-width: 767px) {
    margin: 20px 0;
  }
`

const HeaderContent = styled.div`
  width: 100%;
`

const HeaderContentItem = styled.div`
  max-width: 500px;
  width: 100%;

  @media (max-width: 500px) {
    max-width: 100%;
  }
`

const HeaderTitle = Title.extend`
  font-size: ${props => props.theme.fonts.title.huge};
  line-height: ${props => props.theme.fonts.title.hugeLineHeight};

  @media (max-width: 500px) {
    font-size: ${props => props.theme.fonts.title.big};
    line-height: ${props => props.theme.fonts.title.bigLineHeight};
  }
`

const HeaderText = Text.extend`
  margin: 15px 0 30px;
  opacity: 0.7;
`

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    flex-wrap: wrap;
  }
`

const HeaderButtonsItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  min-height: ${BUTTON_HEIGHT};

  @media (max-width: 500px) {
    flex: 1 1 50%;
    margin: 0 0 20px;
  }
`

const HeaderButton = Button.withComponent(Link)

const Videos = styled.div`
  display: block;
`

const VideosContainer = styled.div`
  margin: 175px auto 150px;
  max-width: 880px;
  width: 100%;
`

const VideosHeader = styled.div`
  padding: 0 248px 100px;
  text-align: center;
  width: 100%;

  @media (max-width: 900px) {
    padding: 0 100px 100px;
  }

  @media (max-width: 650px) {
    padding: 0 40px 100px;
  }
`

const LandingVideoList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 0 20px;
  }

  @media (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const LandingVideoItem = styled.article`
  height: 128px;
  overflow: hidden;
  position: relative;

  &::before {
    ${AbsoluteFullStyle}
    content: '';
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0)
    );
    transition: opacity 0.7s;
    z-index: ${ZINDEX_LANDINGVIDEOITEMSHADOW};
  }

  &:hover {
    &::before {
      opacity: 0.8;
    }
  }
`

const LandingVideoItemBackground = styled.div`
  ${AbsoluteFullStyle}
  background: ${props => props.theme.colors.background.primary}
    url(${props => props.background}) no-repeat 50%;
  background-size: cover;
  transition: transform 7s ${({ theme }) => theme.animation.ease.outexpo} 0.1s;
  z-index: ${ZINDEX_LANDINGVIDEOITEMBACKGROUND};
  ${LandingVideoItem}:hover & {
    transform: scale(1.1);
    transition-delay: 0s;
    transition-timing-function: ${({ theme }) =>
    theme.animation.ease.easeinexpo};
    transition-duration: 3s;
  }
`

const LandingVideoItemLink = styled(Link)`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 15px;
  position: relative;
  transition: opacity 0.3s;
  z-index: ${ZINDEX_LANDINGVIDEOITEMLINK};
`

const LandingVideoItemTitle = styled(Text)`
  width: 100%;
`

const LandingVideoItemIcon = styled.div`
  color: ${props => props.theme.colors.text.accent};
  height: 20px;
  left: 50%;
  margin: -10px 0 0 -10px;
  position: absolute;
  top: 50%;
  width: 20px;
  transform: scale(0);
  transition: transform 0.45s ${({ theme }) => theme.animation.ease.smooth};
  ${LandingVideoItemLink}:hover & {
    transform: scale(1);
  }
`

class Landing extends Component<Props, void> {
  headerVideosList: Array
  headerVideo: string
  videosList: Array

  constructor (props: Props) {
    super(props)

    const videosListTemp = [
      {
        title: 'O que é Algoritmo',
        url: 'play/D93ftQHK3OXN',
        image: 'o-que-e-algoritimo.png',
        time: '02:48'
      },
      {
        title: 'Around the Block - Trailer',
        url: 'play/a4Dbd26pLu0X',
        image: 'around-the-block-trailer.png',
        time: '02:56'
      },
      {
        title: 'Todo Tempo do Mundo - Ep. 1',
        url: 'play/mF7YHwBeGqZq',
        image: 'todo-tempo-do-mundo-ep-1.png',
        time: '18:38'
      },
      {
        title: 'Só Quero Fazer Falta',
        url: 'play/9Jh8KlGxtRIC',
        image: 'so-quero-fazer-falta.png',
        time: '02:03'
      },
      {
        title: 'Vlog 1 - O começo',
        url: 'play/10wBsdyp4biH',
        image: 'vlog-1-o-comeco.png',
        time: '05:46'
      },
      {
        title: 'Palafita Filmes Reel',
        url: 'play/pNK5nsGL2WYw',
        image: 'palafita-filmes-reel.png',
        time: '01:28'
      },
      {
        title: 'Comece Logo Sua HQ',
        url: 'play/VLOLj6iVhuP8',
        image: 'comece-logo-sua-hq.png',
        time: '04:14'
      },
      {
        title: 'Hipótese do Tempo Fantasma | Beirologia',
        url: 'play/tJxLXRZimSn8',
        image: 'hipotese-do-tempo-fantasma-beirologia.png',
        time: '04:55'
      },
      {
        title: 'Garage',
        url: 'play/WKj68pwWOm5a',
        image: 'garage.png',
        time: '00:30'
      },
      {
        title: 'Final de Semana Dourado - Rolê com Dom',
        url: 'play/dTyzjCmg5mvc',
        image: 'final-de-semana-dourado-role-com-dom.png',
        time: '02:17'
      },
      {
        title: 'Gurufim Na Mangueira',
        url: 'play/CDjEPRDCO1ED',
        image: 'gurufim-na-mangueira.png',
        time: '25:14'
      }
    ]

    // this.videosList = this.headerVideosList.concat(videosListTemp)
    this.videosList = videosListTemp
    this.videosList = this.videosList
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]) // shuffle the array
    this.videosList.splice(16, 1) // always keep just 16 videos
  }
  render () {
    return (
      <Wrapper>
        <Header
          background={'/assets/img/landing/big/around-the-block.png'}
          backgroundMobile={'/assets/img/landing/big/around-the-block-mobile.png'}
        >
          <HeaderWrapper>
            <HeaderContent>
              <HeaderContentItem>
                <HeaderTitle bold accent>
                  <TranslatedText message="landingPage.header.title_html" />
                </HeaderTitle>
                <HeaderText big primary>
                  <TranslatedText message="landingPage.header.description_html" />
                </HeaderText>
                <HeaderButtons>
                  <HeaderButtonsItem>
                    <HeaderButton iconbutton="true" to="/play/65te9Z7bXDM4">
                      <SVGIcon
                        icon="icon-player-play"
                        width="14px"
                        height="14px"
                        margin="0 10px 0 0"
                      />
                      Episode 1
                    </HeaderButton>
                  </HeaderButtonsItem>
                  <HeaderButtonsItem><Text accent>Episode 2</Text></HeaderButtonsItem>
                  <HeaderButtonsItem><Text accent>Episode 3</Text></HeaderButtonsItem>
                  <HeaderButtonsItem><Text accent>Episode 4</Text></HeaderButtonsItem>
                </HeaderButtons>
              </HeaderContentItem>
            </HeaderContent>
          </HeaderWrapper>
        </Header>
        <Videos>
          <VideosContainer>
            <VideosHeader>
              <Title big accent>
                <TranslatedText message="landingPage.videos.title" />
              </Title>
              <Text>
                <TranslatedText message="landingPage.videos.description" />
              </Text>
            </VideosHeader>
            <LandingVideoList>
              {this.videosList.map((item, index) => {
                return (
                  <LandingVideoItem key={index}>
                    <LandingVideoItemBackground
                      background={'/assets/img/landing/small/' + item.image}
                    />
                    <LandingVideoItemLink to={item.url}>
                      <LandingVideoItemTitle small bold accent>
                        <TruncatedText>{item.title}</TruncatedText>
                      </LandingVideoItemTitle>
                      <VideoTimeDisplay>{item.time}</VideoTimeDisplay>
                      <LandingVideoItemIcon>
                        <SVGIcon icon="icon-player-play" />
                      </LandingVideoItemIcon>
                    </LandingVideoItemLink>
                  </LandingVideoItem>
                )
              })}
            </LandingVideoList>
          </VideosContainer>
        </Videos>
      </Wrapper>
    )
  }
}

export default Landing
