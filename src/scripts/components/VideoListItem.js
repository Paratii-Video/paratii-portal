import React, { Component } from 'react'
import styled from 'styled-components'
import type { VideoRecord } from 'records/VideoRecords'
import { Link } from 'react-router-dom'
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
  padding: 0 50px;
  transition: opacity ${props => props.theme.animation.time.repaint},
    background 0.25s;
  background-color: ${props =>
    (props.selected && props.theme.colors.VideoList.selectedBackground) || ''};

  &:hover {
    opacity: ${props => props.theme.animation.opacity.hover};
  }
`

const ListItemLink = styled(Link)`
  display: block;
`

const ListItemWrapper = styled.div`
  position: relative;
  width: 100%;
`

const ListItemContent = styled.div`
  display: flex;
  padding: 10px 0;
`

const VideoImage = styled.div`
  background-color: black;
  background-image: url(${({ source }) => source});
  background-size: cover;
  background-position: center center;
  height: 60px;
  width: 30%;

  @media (max-width: 1024px) {
    width: 20%;
  }

  @media (max-width: 767px) {
    width: 40%;
  }
`

const ListItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 25px;
  width: 60%;

  @media (max-width: 1007px) {
    width: 80%;
  }

  @media (max-width: 767px) {
    width: 60%;
  }
`

const ListItemHeader = styled.h4`
  color: ${props => props.theme.colors.VideoList.filename};
  font-size: ${props => props.theme.fonts.video.list.filename};
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
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

class VideoListItem extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.setSelectedVideo(this.props.video.id)
  }

  render () {
    const { video, selected } = this.props

    let isReady = false

    const title = video.title || video.filename
    const ipfsHash = (video && video.get('ipfsHash')) || ''
    const thumbImages = video && video.getIn(['thumbnails'])

    let thumbImage = 'https://paratii.video/public/images/paratii-src.png'
    if (thumbImages && ipfsHash) {
      const firstThumb = thumbImages.get(0)
      if (firstThumb !== undefined) {
        thumbImage = `https://gateway.paratii.video/ipfs/${ipfsHash}/${firstThumb}`
      }
    }

    if (!video || !video.id) {
      return <ListItem>Something went wrong - no video known</ListItem>
    }

    let statusMessage = ''

    if (
      video.uploadStatus.name === 'success' &&
      video.transcodingStatus.name === 'success'
    ) {
      if (video.title.length < 1) {
        statusMessage = 'Please provide a title and description'
      } else {
        statusMessage = 'Your video is ready'
        isReady = true
      }
    } else {
      if (video.uploadStatus.name === 'failed') {
        statusMessage = 'Your video could not be uploaded'
      } else if (video.transcodingStatus.name === 'failed') {
        statusMessage = 'Your video could not be transcoded'
      } else if (video.uploadStatus.name === 'success') {
        statusMessage = 'Transcoding your video'
      } else {
        statusMessage = 'Uploading your video'
      }
    }

    const uploadProgress = video.uploadStatus.data.progress
    const transcodingStatus = video.transcodingStatus.data.progress
    const progress = Math.ceil((uploadProgress + transcodingStatus) / 2)
    const uploaderVideoUrl = `/upload/${this.props.video.id}`

    return (
      <ListItem
        onClick={this.handleClick}
        id={`video-list-item-${video.get('id')}`}
        selected={selected}
      >
        <ListItemLink to={uploaderVideoUrl}>
          <ListItemWrapper>
            <ListItemContent>
              <VideoImage source={thumbImage} />
              <ListItemInfo>
                <ListItemHeader>{title}</ListItemHeader>
                <ListItemStatus done={isReady}>{statusMessage}</ListItemStatus>
              </ListItemInfo>
            </ListItemContent>
            <Bar>
              <VideoProgressBar progress={progress + '%'} nopercentual small />
            </Bar>
          </ListItemWrapper>
        </ListItemLink>
      </ListItem>
    )
  }
}

export default VideoListItem
