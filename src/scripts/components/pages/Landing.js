import React, { Component } from 'react'
import styled from 'styled-components'
import type { Map } from 'immutable'
import type VideoRecord from 'records/VideoRecords'
import { MAINHEADER_LOGO_HEIGHT } from 'constants/UIConstants'
import { Link } from 'react-router-dom'
import Title from '../foundations/Title'
import Text from '../foundations/Text'
import TruncatedText from '../foundations/TruncatedText'
import { ButtonStyleHover } from '../foundations/Button'
import SVGIcon from '../foundations/SVGIcon'
import TranslatedText from '../translations/TranslatedText'
import FilesUploader from '../../containers/FileUploaderContainer'

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
  align-items: center;
  background: ${props => props.theme.colors.background.primary}
    url(${props => props.background}) no-repeat 50%;
  background-size: cover;
  box-shadow: ${props => props.theme.colors.LandingPage.secondary};
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - (${MAINHEADER_LOGO_HEIGHT} * 2));
  justify-content: center;
  padding: 0 20px;
  position: relative;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const HeaderWrapper = styled.div`
  margin: 40px 100px;
  max-width: 980px;
  width: 100%;

  @media (max-width: 767px) {
    margin: 20px 0;
  }
`

const HeaderLinkWrapper = styled.div`
  padding: 0 ${VIDEOLINK_POSITION} ${VIDEOLINK_POSITION};
  width: 100%;

  @media (max-width: 1024px) {
    padding: 0 0 ${VIDEOLINK_POSITION} 0;
  }
`

const VideoLink = styled(Link)`
  ${ButtonStyleHover} align-items: center;
  background: ${props => props.theme.colors.background.body};
  border-radius: 4px;
  color: ${props => props.theme.colors.button.color};
  display: flex;
  font-size: 1rem;
  font-weight: ${props => props.theme.fonts.weight.bold};
  padding: 16px 24px;
  overflow: hidden;
  max-width: 200px;
  width: 100%;

  @media (max-width: 767px) {
    max-width: initial;
  }

  svg {
    margin-right: 10px;
  }
`

const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;

  &::before {
    background: ${props => props.theme.colors.background.transparent};
    border-radius: 5px;
    box-shadow: inset 0 0 200px
      ${props => props.theme.colors.background.secondary};
    content: '';
    height: 100%;
    left: 50%;
    position: absolute;
    transform: translate3d(-50%, -50%, 0);
    top: 50%;
    width: 100%;
    z-index: 2;
  }
`

const HeaderContentWrapper = styled.div`
  max-width: 500px;
  text-align: center;
  padding: 90px 40px;
  width: 100%;
  z-index: 4;
`

const HeaderText = Text.extend`
  margin: 15px 0 60px;
  opacity: 0.7;
`

const Videos = styled.div`
  display: block;
`

const VideosWrapper = styled.div`
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
    content: '';
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0)
    );
    height: 100%;
    position: absolute;
    transition: opacity 0.7s;
    width: 100%;
    z-index: ${ZINDEX_LANDINGVIDEOITEMSHADOW};
  }

  &:hover {
    &::before {
      opacity: 0.8;
    }
  }
`

const LandingVideoItemBackground = styled.div`
  background: ${props => props.theme.colors.background.primary}
    url(${props => props.background}) no-repeat 50%;
  background-size: cover;
  height: 100%;
  position: absolute;
  transition: transform 7s ${({ theme }) => theme.animation.ease.outexpo} 0.1s;
  width: 100%;
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

const LandingVideoItemTimeText = styled(Text)`
  justify-content: center;
  background: ${props => props.theme.colors.background.transparent};
  border-radius: 4px;
  display: flex;
  padding: 4px 6px 2px;
  text-align: center;
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

    this.headerVideosList = [
      {
        title: 'Vento Na Janela',
        url: 'play/65te9Z7bXDM4',
        image: 'vento-na-janela.png',
        time: '02:58'
      },
      {
        title: 'Johnny B. Goode',
        url: 'play/cpApjlvwRK8O',
        image: 'johnny-b-goode.png',
        time: '05:37'
      },
      {
        title: 'Yunta',
        url: 'play/A9SftW9yaPcJ',
        image: 'yunta.png',
        time: '04:03'
      },
      {
        title: 'A Mysterious Clip',
        url: 'play/XTCgW0oToNnc',
        image: 'a-mysterious-clip.png',
        time: '03:21'
      },
      {
        title: 'CHONPS | Robin & Batman',
        url: 'play/rOHszskLtIEy',
        image: 'chonps-robin-and-batman.png',
        time: '03:54'
      },
      {
        title: 'Venice Beach',
        url: 'play/9qMA3KhZir2Z',
        image: 'venice-beach.png',
        time: '01:06'
      }
    ]

    const itemIndex = Math.floor(Math.random() * this.headerVideosList.length)
    this.headerVideo = this.headerVideosList[itemIndex]

    this.headerVideosList.splice(itemIndex, 1) // removes the header video

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

    this.videosList = this.headerVideosList.concat(videosListTemp)
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
          background={'/assets/img/landing/big/' + this.headerVideo.image}
        >
          <HeaderWrapper>
            <HeaderContent>
              <HeaderContentWrapper>
                <Title huge bold accent>
                  <TranslatedText message="landingPage.header.title_html" />
                </Title>
                <HeaderText big primary>
                  <TranslatedText message="landingPage.header.description" />
                </HeaderText>
                <FilesUploader white />
              </HeaderContentWrapper>
            </HeaderContent>
          </HeaderWrapper>
          <HeaderLinkWrapper>
            <VideoLink to={this.headerVideo.url}>
              <SVGIcon icon="icon-player-play" width="13px" height="16px" />
              <TruncatedText>{this.headerVideo.title}</TruncatedText>
            </VideoLink>
          </HeaderLinkWrapper>
        </Header>
        <Videos>
          <VideosWrapper>
            <VideosHeader>
              <Title big accent>
                <TranslatedText message="landingPage.videos.title" />
              </Title>
              <Text gray>
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
                      <LandingVideoItemTimeText tiny accent>
                        {item.time}
                      </LandingVideoItemTimeText>
                      <LandingVideoItemIcon>
                        <SVGIcon icon="icon-player-play" />
                      </LandingVideoItemIcon>
                    </LandingVideoItemLink>
                  </LandingVideoItem>
                )
              })}
            </LandingVideoList>
          </VideosWrapper>
        </Videos>
      </Wrapper>
    )
  }
}

export default Landing
