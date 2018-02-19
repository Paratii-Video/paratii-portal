import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from 'components/foundations/Button'
import type { VideoRecord } from 'records/VideoRecords'
import VideoProgressBar from 'components/widgets/VideoForm/VideoProgressBar'
import { humanReadableStatus } from 'utils/AppUtils'

type Props = {
  video: VideoRecord,
  setSelectedVideo: (id: string) => void
}

const ListItem = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 20px 50px 0;
  transition: opacity ${props => props.theme.animation.time.repaint};

  &:nth-child(odd) {
    background-color: ${props => props.theme.colors.VideoList.background};
  }

  &:hover {
    opacity: ${props => props.theme.animation.opacity.hover};
  }
`

const ListItemWrapper = styled.div`
  position: relative;
  width: 100%;

  &::after {
    content: '';
    display: block;
    height 20px;
    width: 100%;
  }
`

const ListItemHeader = styled.h4`
  color: ${props => props.theme.colors.VideoList.filename};
  font-size: ${props => props.theme.fonts.video.list.filename};
  margin-bottom: 4px;
`

const ListItemStatus = styled.div`
  color: ${props =>
    props.done
      ? props.theme.colors.VideoList.done
      : props.theme.colors.VideoList.status};
  font-size: ${props => props.theme.fonts.video.list.status};
  font-weight: ${props =>
    props.done
      ? props.theme.fonts.weight.bold
      : props.theme.fonts.weight.regular};
  margin-bottom: 2px;
`

const Bar = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
`

const NavLink = Button.withComponent(Link)

class VideoListItem extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.state = {
      uploadProgress: 0,
      transcodingProgress: 0,
      totalProgress: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.setSelectedVideo(this.props.video.id)
  }

  componentWillReceiveProps (nextProps: Props): void {
    this.setState((prevState, nextProps) => ({
      totalProgress: Math.round(
        (prevState.uploadProgress + prevState.transcodingProgress) / 2
      )
    }))
  }

  render () {
    let linkToVideo
    let isReady = false
    const video = this.props.video

    const title = video.title || video.filename
    if (!video || !video.id) {
      return <ListItem>Something when wrong - no video known</ListItem>
    }
    if (
      video.storageStatus.name === 'success' &&
      video.transcodingStatus.name === 'success'
    ) {
      isReady = true
    }
    if (isReady) {
      const link = `/play/${video.id}`
      linkToVideo = <NavLink to={link}>Play video</NavLink>
    }
    const statusMessage = humanReadableStatus(video, 'main')

    return (
      <ListItem onClick={this.handleClick} id="video-list-item-{video.id}">
        <ListItemWrapper>
          <ListItemHeader>{title}</ListItemHeader>
          <ListItemStatus done={isReady}>
            <b>{statusMessage}</b>
            {linkToVideo}
          </ListItemStatus>
          <Bar>
            <VideoProgressBar
              progress={this.state.totalProgress + '%'}
              nopercentual
            />
          </Bar>
        </ListItemWrapper>
      </ListItem>
    )
  }
}

export default VideoListItem
