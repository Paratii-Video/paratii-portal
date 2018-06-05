import React, { Component } from 'react'
import styled from 'styled-components'
import { videoDuration } from '../../operators/VideoOperators'
import { Link } from 'react-router-dom'
import Title from '../foundations/Title'
import Text from '../foundations/Text'
import TruncatedText from '../foundations/TruncatedText'
import { ButtonStyleHover } from '../foundations/Button'
import FilesUploader from '../../containers/FileUploaderContainer'
import SVGIcon from '../foundations/SVGIcon'
import type VideoRecord from 'records/VideoRecords'
import type { Map } from 'immutable'
import { MAINHEADER_LOGO_HEIGHT } from 'constants/UIConstants'

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
  min-height: calc(100vh - ${MAINHEADER_LOGO_HEIGHT});
  justify-content: center;
  position: relative;
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
  left: ${VIDEOLINK_POSITION};
  padding: 16px 24px;
  position: absolute;
  overflow: hidden;
  max-width: 200px;

  svg {
    margin-right: 10px;
  }
`

const HeaderContent = styled.div`
  align-items: center;
  background: ${props =>
    props.theme.colors.LandingPage.headerContentBackground};
  // filter: url('blur.svg#blur');
  // filter: blur(10px);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 40px 0;
  max-width: 1200px;
  padding: 90px 40px 20px;
  width: calc(100% - 40px);
`

const HeaderContentWrapper = styled.div`
  max-width: 500px;
  text-align: center;
  width: 100%;
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
  padding: 0 100px 100px;
  text-align: center;
  width: 100%;
`

const LandingVideoList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
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
  transition: transform 3s ${({ theme }) => theme.animation.ease.easeoutexpo}
    0.1s;
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
  headerVideositem: String

  constructor (props: Props) {
    super(props)

    this.headerVideosList = []
    this.headerVideosList = [
      {
        title: 'Vento Na Janela',
        url: 'https://portal.paratii.video/play/65te9Z7bXDM4',
        image: '/assets/img/landing/header/vento-na-janela.png'
      },
      {
        title: 'Johnny B. Goode',
        url: 'https://portal.paratii.video/play/cpApjlvwRK8O',
        image: '/assets/img/landing/header/vento-na-janela.png'
      },
      {
        title: 'Yunta',
        url: 'https://portal.paratii.video/play/A9SftW9yaPcJ',
        image: '/assets/img/landing/header/yunta.png'
      },
      {
        title: 'A Mysterious Clip',
        url: 'https://portal.paratii.video/play/XTCgW0oToNnc',
        image: '/assets/img/landing/header/a-mysterious-clip.png'
      },
      {
        title: 'CHONPS | Robin & Batman',
        url: 'https://portal.paratii.video/play/rOHszskLtIEy',
        image: '/assets/img/landing/header/chonps-robin-and-batman.png'
      },
      {
        title: 'Venice Beach',
        url: 'https://portal.paratii.video/play/9qMA3KhZir2Z',
        image: '/assets/img/landing/header/venice-beach.png'
      }
    ]

    const itemIndex = Math.floor(Math.random() * this.headerVideosList.length)
    this.headerVideositem = this.headerVideosList[itemIndex]
  }

  render () {
    return (
      <Wrapper>
        <Header background={this.headerVideositem.image}>
          <HeaderContent>
            <HeaderContentWrapper>
              <Title huge bold>
                Bring your videos<br /> to the future
              </Title>
              <Text gray big>
                Decentralisation is breeding novel monetization models and
                giving the power back to peers.
              </Text>
            </HeaderContentWrapper>
            <FilesUploader white />
          </HeaderContent>
          <VideoLink href={this.headerVideositem.url}>
            <SVGIcon icon="icon-player-play" width="13px" height="16px" />
            <TruncatedText>{this.headerVideositem.title}</TruncatedText>
          </VideoLink>
        </Header>
        <Videos>
          <VideosWrapper>
            <VideosHeader>
              <Title big>Meet your fellow pioneers</Title>
              <Text gray>
                Explore short stories, music clips, and formats that our
                community is inventing every day. They’re responsible for this
                curation.
              </Text>
            </VideosHeader>
            <LandingVideoList>
              {this.props.videos.entrySeq().map(([videoId, videoInfo]) => {
                const title = videoInfo.title || videoInfo.filename
                const urlToPlay = '/play/' + videoInfo.id
                let poster = ''
                let videoPoster = ''
                const duration = videoDuration(videoInfo)
                let durationNoMillis = '00:00:00'

                if (videoInfo && videoInfo.thumbnails.size === 4) {
                  poster = videoInfo.thumbnails.get(0)
                  videoPoster =
                    'https://gateway.paratii.video/ipfs/' +
                    videoInfo.ipfsHash +
                    '/' +
                    poster
                }

                if (duration) {
                  durationNoMillis = duration.substring(
                    0,
                    duration.indexOf('.')
                  )
                }

                return (
                  <LandingVideoItem key={videoId}>
                    <LandingVideoItemBackground background={videoPoster} />
                    <LandingVideoItemLink to={urlToPlay}>
                      <LandingVideoItemTitle small bold>
                        <TruncatedText>{title}</TruncatedText>
                      </LandingVideoItemTitle>
                      <LandingVideoItemTimeText tiny>
                        {durationNoMillis}
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
