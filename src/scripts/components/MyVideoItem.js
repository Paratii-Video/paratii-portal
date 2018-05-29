import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Text, { Strong } from './foundations/Text'
import Button from './foundations/Button'
import SVGIcon from './foundations/SVGIcon'
import { videoDuration } from '../operators/VideoOperators'
import type VideoRecord from 'records/VideoRecords'

type Props = {
  video: VideoRecord
}

const Z_INDEX_TIME = 2

const Wrapper = styled.li`
  background: ${props => props.theme.colors.MyVideoItem.background};
  position: relative;
`

const MyVideoItemLink = styled(Link)`
  display: block;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.5;
  }
`

const MyVideoItemMedia = styled.div`
  background: ${props => props.theme.colors.MyVideoItem.imageBackground};
  height: 200px;
  position: relative;
  width: 100%;
`

const MyVideoItemImage = styled.div`
  background: url(${({ source }) => source}) no-repeat 50%;
  background-size: cover;
  height: 100%;
  width: 100%;
`

// <export or import from Videoform>
const VideoMediaTime = styled.div`
  bottom: 10px;
  padding: 10px;
  position: absolute;
  right: 10px;
  z-index: ${Z_INDEX_TIME};

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
// </export or import from Videoform>

const MyVideoItemInfo = styled.div`
  background: ${props => props.theme.colors.MyVideoItem.background};
  padding: 20px;
`

const MyVideoItemButtons = styled.div`
  align-items: center;
  bottom: 20px;
  display: flex;
  position: absolute;
  right: 20px;
`

const MyVideoItemButton = styled(Button)`
  margin-left: 10px;
`

class MyVideoItem extends Component<Props, void> {
  render () {
    const { video } = this.props
    const title = video.title || video.filename
    const urlToPlay = '/play/' + video.id
    let poster = ''
    let videoPoster = ''
    const duration = videoDuration(video)
    let durationNoMillis = '00:00:00'

    if (video && video.thumbnails.size === 4) {
      poster = video.thumbnails.get(0)
      videoPoster =
        'https://gateway.paratii.video/ipfs/' + video.ipfsHash + '/' + poster
    }

    if (duration) {
      durationNoMillis = duration.substring(0, duration.indexOf('.'))
    }

    return (
      <Wrapper>
        <MyVideoItemLink to={urlToPlay}>
          <MyVideoItemMedia>
            <MyVideoItemImage source={videoPoster} />

            <VideoMediaTime>
              <VideoMediaTimeText>{durationNoMillis}</VideoMediaTimeText>
            </VideoMediaTime>
          </MyVideoItemMedia>
          <MyVideoItemInfo>
            <Text small>{title}</Text>
            <Text small gray>
              10 000 views
            </Text>
            <Text small>
              Status: <Strong purple>Published</Strong>
            </Text>
            <Text small gray>
              11 months ago
            </Text>
          </MyVideoItemInfo>
        </MyVideoItemLink>
        <MyVideoItemButtons>
          <MyVideoItemButton>
            <SVGIcon
              icon="icon-player-share"
              color="gray"
              width="24px"
              height="15px"
            />
          </MyVideoItemButton>
          <MyVideoItemButton>
            <SVGIcon
              icon="icon-settings"
              color="gray"
              width="17px"
              height="17px"
            />
          </MyVideoItemButton>
        </MyVideoItemButtons>
      </Wrapper>
    )
  }
}

export default MyVideoItem
