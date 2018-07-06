import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Text, { Span } from './foundations/Text'
import TextButton from './foundations/TextButton'
import SVGIcon from './foundations/SVGIcon'
import { videoDuration } from '../operators/VideoOperators'
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
  position: relative;
`

const MyVideoItemLink = styled(Link)`
  background: ${props => props.theme.colors.background.primary};
  display: block;
`

const ZINDEX_MYVIDEOSITEM_COVER: number = 3
const ZINDEX_MYVIDEOSITEM_IMAGE: number = 1
const ZINDEX_MYVIDEOSITEM_PLAY: number = 4
const ZINDEX_MYVIDEOSITEM_TIME: number = 2

const MyVideoItemMedia = styled.div`
  align-items: center;
  background: ${props => props.theme.colors.background.secondary};
  display: flex;
  height: 200px;
  justify-content: center;
  position: relative;
  width: 100%;

  &::before {
    background: ${props => props.theme.colors.background.body};
    content: '';
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity 0.3s linear 0.1s;
    width: 100%;
    z-index: ${ZINDEX_MYVIDEOSITEM_COVER};
    ${MyVideoItemLink}:hover & {
      opacity: 0.8;
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
  color: ${props => props.theme.colors.text.accent};
  height: 33px;
  position: relative;
  width: 26px;
  transform: scale(0);
  transition: transform 0.5s ${({ theme }) => theme.animation.ease.smooth};
  z-index: ${ZINDEX_MYVIDEOSITEM_PLAY};
  ${MyVideoItemLink}:hover & {
    transform: scale(1);
    transition-delay: 0.1s;
  }
`

const VideoMediaTime = styled.div`
  bottom: 10px;
  padding: 10px;
  position: absolute;
  right: 10px;
  z-index: ${ZINDEX_MYVIDEOSITEM_TIME};

  &::before {
    background-color: ${props => props.theme.colors.background.body};
    border-radius: 2px;
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.7;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

const VideoMediaTimeText = Text.extend`
  position: relative;
  z-index: 1;
`

const MyVideoItemInfo = styled.div`
  padding: 20px;
`

const MyVideoItemsTitle = Text.extend`
  margin-bottom: 15px;
`

const EditButton = TextButton.extend`
  bottom: 30px;
  height: 20px;
  position: absolute;
  right: 24px;
  width: 20px;
`

class MyVideoItem extends Component<Props, void> {
  render () {
    const { video } = this.props
    const title = video.title || video.filename
    const urlToPlay = '/play/' + video.id
    let poster = ''
    let videoPoster = ''
    const duration = videoDuration(video)
    let durationNoMillis = '00:00'

    if (video && video.thumbnails.size === 4) {
      poster = video.thumbnails.get(0)
      videoPoster =
        'https://gateway.paratii.video/ipfs/' + video.ipfsHash + '/' + poster
    }

    if (duration) {
      durationNoMillis = formatDuration(duration)
    }

    console.log(video)

    return (
      <Wrapper>
        <MyVideoItemLink to={urlToPlay}>
          <MyVideoItemMedia>
            <MyVideoItemImage source={videoPoster} />
            <VideoMediaTime>
              <VideoMediaTimeText tiny accent>
                {durationNoMillis}
              </VideoMediaTimeText>
            </VideoMediaTime>
            <IconPlay>
              <SVGIcon icon="icon-player-play" />
            </IconPlay>
          </MyVideoItemMedia>
          <MyVideoItemInfo>
            <MyVideoItemsTitle bold accent>
              {title}
            </MyVideoItemsTitle>
            <Text small>10000 views</Text>
            <Text small primary bold>
              Status:{' '}
              <Span warn={true} error={false} small regular>
                Published
              </Span>
            </Text>
            <Text small>11 months ago</Text>
          </MyVideoItemInfo>
        </MyVideoItemLink>
        <EditButton primary>
          <SVGIcon icon="icon-edit" />
        </EditButton>
      </Wrapper>
    )
  }
}

export default MyVideoItem
