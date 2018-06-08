import React, { Component } from 'react'
import styled from 'styled-components'
import type { Map } from 'immutable'
import type VideoRecord from 'records/VideoRecords'
import { MAINHEADER_LOGO_HEIGHT } from 'constants/UIConstants'
import Title from '../foundations/Title'
import Text from '../foundations/Text'
import TruncatedText from '../foundations/TruncatedText'
import { ButtonStyleHover } from '../foundations/Button'
import SVGIcon from '../foundations/SVGIcon'
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
  background: ${props => props.theme.colors.LandingPage.headerBackground}
    url(${props => props.background}) no-repeat 50%;
  background-size: cover;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  display: flex;
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

const VideoLink = styled.a`
  ${ButtonStyleHover} align-items: center;
  background: ${props => props.theme.colors.LandingPage.VideoLinkBackground};
  bottom: ${VIDEOLINK_POSITION};
  border-radius: 4px;
  color: ${props => props.theme.colors.LandingPage.VideoLinkColor};
  display: flex;
  font-size: 1rem;
  font-weight: ${props => props.theme.fonts.weight.bold};
  padding: 16px 24px;
  overflow: hidden;
  margin: 20px 0 0;
  max-width: 200px;
  width: 100%;

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
    background: ${props =>
    props.theme.colors.LandingPage.headerContentBackground};
    border-radius: 5px;
    box-shadow: inset 0 0 200px
      ${props => props.theme.colors.LandingPage.headerContentBackgroundShadow};
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
  padding: 90px 40px 10px;
  position: relative;
  width: 100%;
  z-index: 4;
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
  background: ${props => props.theme.colors.LandingPage.listItemBackground}
    url(${props => props.background}) no-repeat 50%;
  background-size: cover;
  height: 100%;
  position: absolute;
  transition: transform 1.7s ${({ theme }) => theme.animation.ease.outexpo} 0.1s;
  width: 100%;
  z-index: ${ZINDEX_LANDINGVIDEOITEMBACKGROUND};
  ${LandingVideoItem}:hover & {
    transform: scale(1.1);
    transition-delay: 0s;
    transition-timing-function: ${({ theme }) =>
    theme.animation.ease.easeinexpo};
    transition-duration: 2s;
  }
`

const LandingVideoItemLink = styled.a`
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
  background: ${props => props.theme.colors.LandingPage.listItemTimeBackground};
  border-radius: 4px;
  color: ${props => props.theme.colors.LandingPage.listItemTimeColor};
  display: flex;
  padding: 4px 6px 2px;
  text-align: center;
`

const LandingVideoItemIcon = styled.div`
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
  headerVideo: String
  videosList: Array

  constructor (props: Props) {
    super(props)

    this.headerVideosList = [
      {
        title: 'Vento Na Janela',
        url: 'https://portal.paratii.video/play/65te9Z7bXDM4',
        image: 'vento-na-janela.png',
        time: '02:58'
      },
      {
        title: 'Johnny B. Goode',
        url: 'https://portal.paratii.video/play/cpApjlvwRK8O',
        image: 'johnny-b-goode.png',
        time: '05:37'
      },
      {
        title: 'Yunta',
        url: 'https://portal.paratii.video/play/A9SftW9yaPcJ',
        image: 'yunta.png',
        time: '04:03'
      },
      {
        title: 'A Mysterious Clip',
        url: 'https://portal.paratii.video/play/XTCgW0oToNnc',
        image: 'a-mysterious-clip.png',
        time: '03:21'
      },
      {
        title: 'CHONPS | Robin & Batman',
        url: 'https://portal.paratii.video/play/rOHszskLtIEy',
        image: 'chonps-robin-and-batman.png',
        time: '03:54'
      },
      {
        title: 'Venice Beach',
        url: 'https://portal.paratii.video/play/9qMA3KhZir2Z',
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
        url: 'https://portal.paratii.video/play/D93ftQHK3OXN',
        image: 'o-que-e-algoritimo.png',
        time: '02:48'
      },
      {
        title: 'Around the Block - Trailer',
        url: 'https://portal.paratii.video/play/a4Dbd26pLu0X',
        image: 'around-the-block-trailer.png',
        time: '02:56'
      },
      {
        title: 'Todo Tempo do Mundo - Ep. 1',
        url: 'https://portal.paratii.video/play/mF7YHwBeGqZq',
        image: 'todo-tempo-do-mundo-ep-1.png',
        time: '18:38'
      },
      {
        title: 'Só Quero Fazer Falta',
        url: 'https://portal.paratii.video/play/9Jh8KlGxtRIC',
        image: 'so-quero-fazer-falta.png',
        time: '02:03'
      },
      {
        title: 'Vlog 1 - O começo',
        url: 'https://portal.paratii.video/play/10wBsdyp4biH',
        image: 'vlog-1-o-comeco.png',
        time: '05:46'
      },
      {
        title: 'Palafita Filmes Reel',
        url: 'https://portal.paratii.video/play/pNK5nsGL2WYw',
        image: 'palafita-filmes-reel.png',
        time: '01:28'
      },
      {
        title: 'Comece Logo Sua HQ',
        url: 'https://portal.paratii.video/play/VLOLj6iVhuP8',
        image: 'comece-logo-sua-hq.png',
        time: '04:14'
      },
      {
        title: 'Hipótese do Tempo Fantasma | Beirologia',
        url: 'https://portal.paratii.video/play/tJxLXRZimSn8',
        image: 'hipotese-do-tempo-fantasma-beirologia.png',
        time: '04:55'
      },
      {
        title: 'Garage',
        url: 'https://portal.paratii.video/play/WKj68pwWOm5a',
        image: 'garage.png',
        time: '00:30'
      },
      {
        title: 'Final de Semana Dourado - Rolê com Dom',
        url: 'https://portal.paratii.video/play/dTyzjCmg5mvc',
        image: 'final-de-semana-dourado-role-com-dom.png',
        time: '02:17'
      },
      {
        title: 'Gurufim Na Mangueira',
        url: 'https://portal.paratii.video/play/CDjEPRDCO1ED',
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
                <Title huge bold>
                  Bring your videos<br /> to the future
                </Title>
                <Text gray big>
                  Decentralisation is changing the business of online video and
                  giving the power back to peers
                </Text>
                <FilesUploader white />
              </HeaderContentWrapper>
            </HeaderContent>
            <VideoLink href={this.headerVideo.url}>
              <SVGIcon icon="icon-player-play" width="13px" height="16px" />
              <TruncatedText>{this.headerVideo.title}</TruncatedText>
            </VideoLink>
          </HeaderWrapper>
        </Header>
        <Videos>
          <VideosWrapper>
            <VideosHeader>
              <Title big>Meet your fellow pioneers</Title>
              <Text gray>
                Explore short stories, music clips, and formats that our
                community is inventing every day.
              </Text>
            </VideosHeader>
            <LandingVideoList>
              {this.videosList.map((item, index) => {
                return (
                  <LandingVideoItem key={index}>
                    <LandingVideoItemBackground
                      background={'/assets/img/landing/small/' + item.image}
                    />
                    <LandingVideoItemLink href={item.url}>
                      <LandingVideoItemTitle small bold>
                        <TruncatedText>{item.title}</TruncatedText>
                      </LandingVideoItemTitle>
                      <LandingVideoItemTimeText tiny>
                        {item.time}
                      </LandingVideoItemTimeText>
                      <LandingVideoItemIcon>
                        <SVGIcon color="white" icon="icon-player-play" />
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
