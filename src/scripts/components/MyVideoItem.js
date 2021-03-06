import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { FlexCenterStyle } from './foundations/Styles'
import Text, { Span } from './foundations/Text'
import { ButtonStyleHover } from './foundations/Button'
import { ButtonStyleColor } from './foundations/TextButton'
import SVGIcon from './foundations/SVGIcon'
import VideoTimeDisplay from './foundations/VideoTimeDisplay'
import Card from 'components/structures/Card'
import TranslatedText from './translations/TranslatedText'
import {
  MYVIDEOITEMMEDIA_HEIGHT,
  MYVIDEOITEM_ICONPLAY_HEIGHT,
  MYVIDEOITEM_ICONPLAY_WIDTH,
  MYVIDEOITEMINFO_PADDING,
  MYVIDEOITEMINFO_MARGIN_BOTTOM,
  MYVIDEOITEM_EDITBUTTONWRAPPER_BOTTOM,
  MYVIDEOITEM_EDITBUTTONWRAPPER_RIGHT
} from 'constants/UIConstants'
import { isVideoPublished, videoDuration } from 'operators/VideoOperators'
import { formatDuration } from '../utils/VideoUtils'
import type VideoRecord from 'records/VideoRecords'

type Props = {
  video: VideoRecord
}

const ZINDEX_MYVIDEOSITEM_IMAGE: number = 1
const ZINDEX_MYVIDEOSITEM_COVER: number = 3
const ZINDEX_MYVIDEOSITEM_PLAY: number = 4

export const MyVideosContainer = styled.ul`
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

const Wrapper = styled(Card)`
  position: relative;
`

const MyVideoItemButton = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const MyVideoItemLink = MyVideoItemButton.withComponent(Link)

const MyVideoItemMedia = styled.div`
  ${FlexCenterStyle} background: ${props =>
  props.theme.colors.background.secondary};
  height: ${MYVIDEOITEMMEDIA_HEIGHT};
  position: relative;
  width: 100%;
`

const VideoMediaBackground = styled.span`
  background: ${props => props.theme.colors.background.body};
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: opacity 0.2s linear 0.2s;
  width: 100%;
  z-index: ${ZINDEX_MYVIDEOSITEM_COVER};
  ${MyVideoItemLink}:hover & {
    opacity: 0.7;
    transition-delay: 0;
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
  color: ${props => props.theme.colors.text.accent};
  height: ${MYVIDEOITEM_ICONPLAY_HEIGHT};
  position: relative;
  width: ${MYVIDEOITEM_ICONPLAY_WIDTH};
  transform: scale(0);
  transition: transform 0.5s ${({ theme }) => theme.animation.ease.smooth};
  z-index: ${ZINDEX_MYVIDEOSITEM_PLAY};
  ${MyVideoItemLink}:hover & {
    transform: scale(1);
    transition-delay: 0.1s;
  }
`

const MyVideoItemInfo = styled.div`
  padding: ${MYVIDEOITEMINFO_PADDING};
`

const MyVideoItemsTitle = Text.extend`
  margin-bottom: ${MYVIDEOITEMINFO_MARGIN_BOTTOM};
`

const EditButtonWrapper = styled.div`
  bottom: ${MYVIDEOITEM_EDITBUTTONWRAPPER_BOTTOM};
  position: absolute;
  right: ${MYVIDEOITEM_EDITBUTTONWRAPPER_RIGHT};
`

const EditButton = styled(Link)`
  ${ButtonStyleColor} ${ButtonStyleHover} display: block;
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
              <VideoTimeDisplay>{durationNoMillis}</VideoTimeDisplay>
              <IconPlay>
                <SVGIcon icon="icon-player-play" />
              </IconPlay>
              <VideoMediaBackground />
            </Fragment>
          ) : null}
        </MyVideoItemMedia>
        <MyVideoItemInfo>
          <MyVideoItemsTitle bold accent>
            {title}
          </MyVideoItemsTitle>
          <Text small>0 views</Text>
          <Text small>
            <TranslatedText message="myVideos.item.status.label" />
            {': '}
            <Span highlight={isPublished} small>
              <TranslatedText message={statusMsg} />
            </Span>
          </Text>
          <Text small>0 days ago</Text>
        </MyVideoItemInfo>
      </Fragment>
    )

    const MyVideoItemContent = isPublished ? (
      <MyVideoItemLink to={urlToPlay}>{videoContent}</MyVideoItemLink>
    ) : (
      <MyVideoItemButton>{videoContent}</MyVideoItemButton>
    )

    return (
      <Wrapper nopadding>
        {MyVideoItemContent}
        <EditButtonWrapper>
          <EditButton to={urlToEdit}>
            <SVGIcon width="20px" height="20px" icon="icon-edit" />
          </EditButton>
        </EditButtonWrapper>
      </Wrapper>
    )
  }
}

export default MyVideoItem
