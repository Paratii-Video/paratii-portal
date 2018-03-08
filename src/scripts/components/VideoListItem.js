import React, { Component } from 'react'
import styled from 'styled-components'
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
  padding: 0 50px;
  transition: opacity ${props => props.theme.animation.time.repaint};
  background-color: ${props =>
    (props.selected && props.theme.colors.VideoList.selectedBackground) || ''};

  &:hover {
    opacity: ${props => props.theme.animation.opacity.hover};
  }
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
  height: 72px;
  width: 40%;

  @media (max-width: 1007px) {
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
    this.state = {
      uploadProgress: 0,
      transcodingProgress: 0,
      totalProgress: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    console.log(this.props)
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

    let isReady = false

    const title = video.title || video.filename
    const ipfsHash = (video && video.get('ipfsHash')) || ''
    const thumbImages = video && video.getIn(['thumbnails'])

    let thumbImage = 'https://paratii.video/public/images/paratii-src.png'
    if (thumbImages && ipfsHash) {
      const firstThumb = thumbImages[0]
      if (firstThumb !== undefined) {
        thumbImage = `https://gateway.paratii.video/ipfs/${ipfsHash}/${firstThumb}`
      }
    }

    if (!video || !video.id) {
      return <ListItem>Something went wrong - no video known</ListItem>
    }
    if (
      video.storageStatus.name === 'success' &&
      video.transcodingStatus.name === 'success'
    ) {
      isReady = true
    }

    let statusMessage = ''

    if (video.storageStatus.name !== 'success' && title === null) {
      statusMessage = 'Please provide a title and description'
    } else if (video.transcodingStatus.name === 'success') {
      statusMessage = 'Your video is ready to play'
    } else if (video.transcodingStatus.name === 'failed') {
      statusMessage = 'Your video could not be transcoded'
    }
    // } else if (!video.filename) {
    //   statusMessage = 'No file was uploaded (this is an error)'
    // }

    const uploadProgress = video.uploadStatus.data.progress
    const transcodingStatus = video.transcodingStatus.data.progress
    const progress = Math.ceil((uploadProgress + transcodingStatus) / 2)

    return (
      <ListItem
        onClick={this.handleClick}
        id={`video-list-item-${video.get('id')}`}
        selected={selected}
      >
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
      </ListItem>
    )
  }
}

export default VideoListItem
