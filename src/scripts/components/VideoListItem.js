import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from 'components/foundations/Button'
import type { VideoRecord } from 'records/VideoRecords'
import VideoProgressBar from 'components/widgets/VideoForm/VideoProgressBar'

type Props = {
  video: VideoRecord,
  selected?: boolean,
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

  &:nth-child(odd),
  &:nth-child(even) {
    background-color: ${props =>
    (props.selected && props.theme.colors.VideoList.selectedBackground) ||
      ''};
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
    const { video, selected } = this.props

    let statusMessage, linkToVideo
    let isReady = false

    const title = video.title || video.filename
    if (!video || !video.id) {
      return <ListItem>Something when wrong - no video known</ListItem>
    }
    if (video.storageStatus.name !== 'success') {
      statusMessage = 'Please provide a title and description'
      isReady = false
    } else if (video.transcodingStatus.name === 'success') {
      statusMessage = 'Your video is now ready to play'
      isReady = true
    } else if (video.transcodingStatus.name === 'failed') {
      statusMessage = 'Your video could not be transcoded'
      isReady = true
    } else if (!video.filename) {
      statusMessage = 'No file was uploaded (this is an error)'
      isReady = false
    }
    if (isReady) {
      const link = `/play/${video.id}`
      linkToVideo = <NavLink to={link}>Play video</NavLink>
    }

    return (
      <ListItem
        onClick={this.handleClick}
        id={`video-list-item-${video.get('id')}`}
        selected={selected}
      >
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
