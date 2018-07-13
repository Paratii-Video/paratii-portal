import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import TranslatedText from './translations/TranslatedText'
import Text from './foundations/Text'
import { ButtonStyleHover } from './foundations/Button'
import SVGIcon from './foundations/SVGIcon'
import { isVideoPublished, videoDuration } from 'operators/VideoOperators'
import { formatDuration } from '../utils/VideoUtils'
import type VideoRecord from 'records/VideoRecords'

type Props = {
  video: VideoRecord
}

export const MyVideosWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const Wrapper = styled.li`
  background: ${props => props.theme.colors.MyVideoItem.background};
  position: relative;
`

const MyVideoItemButton = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const MyVideoItemLink = MyVideoItemButton.withComponent(Link)

const ZINDEX_MYVIDEOSITEM_COVER: number = 3
const ZINDEX_MYVIDEOSITEM_IMAGE: number = 1
const ZINDEX_MYVIDEOSITEM_PLAY: number = 4
const ZINDEX_MYVIDEOSITEM_TIME: number = 2

const MyVideoItemMedia = styled.div`
  align-items: center;
  background: ${props => props.theme.colors.MyVideoItem.imageBackground};
  display: flex;
  height: 200px;
  justify-content: center;
  position: relative;
  width: 100%;

  &::before {
    background: ${props => props.theme.colors.MyVideoItem.coverMediaBackground};
    content: ${({ isPublished }) => (isPublished ? '' : null)};
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity 0.2s linear 0.2s;
    width: 100%;
    z-index: ${ZINDEX_MYVIDEOSITEM_COVER};
    ${MyVideoItemLink}:hover & {
      opacity: 1;
      transition-delay: 0;
    }
  }
`

const MyVideoItemImage = styled.div`
  background: url(${({ source }) => source}) no-repeat 50%;
  background-size: cover;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${ZINDEX_MYVIDEOSITEM_IMAGE};
`

const IconPlay = styled.span`
  height: 33px;
  position: relative;
  width: 26px;
  transform: scale(0);
  transition: transform 0.5s ${({ theme }) => theme.animation.ease.smooth};
  z-index: ${ZINDEX_MYVIDEOSITEM_PLAY};
  ${MyVideoItemLink}:hover & {
    transform: scale(1);
    transition-duration: 0.65s;
    transition-delay: 0.2s;
  }
`

const VideoMediaTime = styled.div`
  bottom: 10px;
  padding: 10px;
  position: absolute;
  right: 10px;
  z-index: ${ZINDEX_MYVIDEOSITEM_TIME};

  &::before {
    background-color: ${props =>
    props.theme.colors.VideoForm.info.time.background};
    border-radius: 2px;
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.8;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

const VideoMediaTimeText = styled.p`
  color: ${props => props.theme.colors.VideoForm.info.time.color};
  font-size: ${props => props.theme.fonts.video.info.time};
  position: relative;
  z-index: 1;
`

const MyVideoItemInfo = styled.div`
  background: ${props => props.theme.colors.MyVideoItem.background};
  padding: 20px;
`

const MyVideoItemsTitle = Text.extend`
  margin-bottom: 15px;
`

const MyVideoItemsStatus = Text.withComponent('span')

const EditButtonWrapper = styled.div`
  ${ButtonStyleHover} bottom: 30px;
  position: absolute;
  right: 24px;
`

class MyVideoItem extends Component<Props, void> {
  render () {
    const { video } = this.props
    const duration = videoDuration(video)
    const isPublished = isVideoPublished(video)
    const title = video.title || video.filename
    const urlToPlay = '/play/' + video.id
    const urlToEdit = '/edit/' + video.id
    let poster = ''
    let videoPoster = ''
    let durationNoMillis = '00:00'
    const statusMsg = isPublished
      ? 'myVideos.item.status.published'
      : 'myVideos.item.status.unpublished'

    if (video && video.thumbnails.size === 4) {
      poster = video.thumbnails.get(0)
      videoPoster =
        'https://gateway.paratii.video/ipfs/' + video.ipfsHash + '/' + poster
    }

    if (duration) {
      durationNoMillis = formatDuration(duration)
    }

    const videoContent = (
      <Fragment>
        <MyVideoItemMedia isPublished={isPublished}>
          <MyVideoItemImage source={videoPoster} />
          {isPublished ? (
            <Fragment>
              <VideoMediaTime>
                <VideoMediaTimeText>{durationNoMillis}</VideoMediaTimeText>
              </VideoMediaTime>
              <IconPlay>
                <SVGIcon color="white" icon="icon-player-play" />
              </IconPlay>
            </Fragment>
          ) : null}
        </MyVideoItemMedia>
        <MyVideoItemInfo>
          <MyVideoItemsTitle bold>{title}</MyVideoItemsTitle>
          <Text gray small>
            <TranslatedText message="myVideos.item.status.label" />
            {': '}
            <MyVideoItemsStatus purple={isPublished} gray={!isPublished} small>
              <TranslatedText message={statusMsg} />
            </MyVideoItemsStatus>
          </Text>
        </MyVideoItemInfo>
      </Fragment>
    )

    const MyVideoItemContent = isPublished ? (
      <MyVideoItemLink to={urlToPlay}>{videoContent}</MyVideoItemLink>
    ) : (
      <MyVideoItemButton>{videoContent}</MyVideoItemButton>
    )

    return (
      <Wrapper>
        {MyVideoItemContent}
        <EditButtonWrapper>
          <Link to={urlToEdit}>
            <SVGIcon width="20px" height="20px" icon="icon-edit" />
          </Link>
        </EditButtonWrapper>
      </Wrapper>
    )
  }
}

export default MyVideoItem
