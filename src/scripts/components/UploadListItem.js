import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import type { VideoRecord } from 'records/VideoRecords'
import { getAppRootUrl } from 'utils/AppUtils'
import Text from './foundations/Text'
import Button from './foundations/Button'
import SVGIcon from './foundations/SVGIcon'
import VideoProgressBar from './widgets/VideoForm/VideoProgressBar'
import TextField from './widgets/forms/TextField'
import Textarea from './widgets/forms/TextareaField'
import RadioCheck, {
  RadioWrapper,
  RadioTitle
} from './widgets/forms/RadioCheck'

type Props = {
  video: VideoRecord,
  videoId: 'String'
}

const PADDING_HORIZONTAL: String = '50px'
const Z_INDEX_TIME = 1
const Z_INDEX_MEDIAICON = 2

const Item = styled.div`
  background: ${props => props.theme.colors.UploadListItem.background};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  overflow: hidden;
`

const ItemHeader = styled.div`
  cursor: ${({ open }) => (!open ? 'pointer' : 'pointer')};
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  user-select: none;
`

const ItemHeaderContent = styled.div`
  align-items: center;
  display: flex;
  padding: 25px ${PADDING_HORIZONTAL};
`

const Icon = styled.span`
  flex: 0 0 22px;
  height: 12px;
  transition: transform 0.7s ${({ theme }) => theme.animation.ease.smooth};
  transform: ${({ flip }) => (flip ? 'rotateX(180deg)' : null)};
`

const ItemHeaderData = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  padding-left: 25px;
`

const ItemHeaderStatus = styled.div`
  color: ${props =>
    props.done
      ? props.theme.colors.VideoList.done
      : props.theme.colors.VideoList.status};
  font-size: ${props => props.theme.fonts.video.list.status};
  font-weight: ${props =>
    props.done
      ? props.theme.fonts.weight.bold
      : props.theme.fonts.weight.regular};
`

const ItemHeaderButtons = styled.div`
  display: flex;
  flex: 0 1 auto;

  Button {
    margin-left: 20px;
  }
`

const ItemHeaderBar = styled.div`
  display: block;
`

const ItemContent = styled.div`
  height: ${({ offsetHeight }) => offsetHeight};
  overflow: hidden;
`

const ItemContentHeight = styled.div`
  display: flex;
  padding: 20px ${PADDING_HORIZONTAL} ${PADDING_HORIZONTAL};
`

const Form = styled.form`
  flex: 1 1 100%;
  opacity: ${props => (props.disabled ? '0.5' : null)};
  padding-right: 45px;
  pointer-events: ${props => (props.disabled ? 'none' : null)};
  position: relative;

  @media (max-width: 1150px) {
    flex: 1 1 100%;
  }
`

const FormButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`

const PreviewBox = styled.div`
  flex: 1 1 100%;
  max-width: 360px;
`

const VideoMedia = styled.div`
  margin-bottom: 20px;
  position: relative;
  width: 100%;
`

const VideoMediaLink = styled(Link)`
  display: block;
`

const VideoImage = styled.div`
  background-color: ${props => props.theme.colors.body.background};
  background-image: url(${({ source }) => source});
  background-size: cover;
  background-position: center center;
  padding-top: 60%;
  width: 100%;
`

const VideoMediaOverlay = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  &::before {
    background-color: ${props =>
    props.theme.colors.VideoForm.info.imageBackground};
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.5;
    position: absolute;
    transition: opacity ${props => props.theme.animation.time.repaint};
    top: 0;
    width: 100%;
    ${VideoMediaLink}:hover & {
      opacity: 0.7;
    }
  }
`
const VideoMediaIcon = styled.div`
  height: 20%;
  transition: transform 0.3s ${props => props.theme.animation.ease.smooth};
  position: relative;
  width: 20%;
  z-index: ${Z_INDEX_MEDIAICON};
  ${VideoMediaLink}:hover & {
    transform: scale(0.9);
  }
`

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

class UploadListItem extends Component<Props, void> {
  constructor (props) {
    super(props)
    const theVideo = this.props.video
    this.state = {
      open: false,
      id: theVideo.id,
      title: theVideo.title,
      description: theVideo.description,
      // FIXME: we are not editing duration, so we do not need to store it in the state
      duration: theVideo.duration,
      author: theVideo.author
    }

    this.handleHeight = this.handleHeight.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.clickButton = this.clickButton.bind(this)
    this.onPublishVideo = this.onPublishVideo.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (input: string, e: Object) {
    this.setState({
      [input]: e.target.value
    })
  }

  onPublishVideo (e: Object) {
    e.preventDefault()
  }

  clickButton (e) {
    e.stopPropagation()
    console.log(this.props.video)
    console.log(
      this.props.video.transcodingStatus,
      this.props.video.uploadStatus
    )
  }

  toggleOpen (e) {
    this.setState({
      open: !this.state.open
    })
  }

  handleHeight (e) {
    let height = '0px'
    if (this.formWrapperRef && this.state.open) {
      height = this.formWrapperRef.offsetHeight + 'px'
    }
    return height
  }

  render () {
    const { video, videoId } = this.props

    // Title
    const title = video.title || video.filename

    // Need to do this below
    // if (!video || !video.id) {
    //   return <ListItem>Something went wrong - no video known</ListItem>
    // }

    // Status
    let videoIsReady = false
    let statusMessage = ''

    if (
      video.uploadStatus.name === 'success' &&
      video.transcodingStatus.name === 'success'
    ) {
      if (video.title.length < 1) {
        statusMessage = 'Please provide a title and description'
      } else {
        statusMessage = 'Your video is ready'
        videoIsReady = true
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

    // Progress
    const uploadProgress = video.uploadStatus.data.progress
    const transcodingStatus = video.transcodingStatus.data.progress
    const progress = Math.ceil((uploadProgress + transcodingStatus) / 2)
    // const uploaderVideoUrl = `/upload/${this.props.video.id}`

    // Media box
    const isPublished = true
    const isPublishable = true
    let poster = ''
    let videoPoster = ''
    let videoMediaBox = null
    const duration = (video && video.get('duration')) || ''

    let durationBox = null
    if (duration) {
      const durationNoMillis = duration.substring(0, duration.indexOf('.'))
      durationBox = (
        <VideoMediaTime>
          <VideoMediaTimeText>{durationNoMillis}</VideoMediaTimeText>
        </VideoMediaTime>
      )
    }

    // const ipfsHash = (video && video.get('ipfsHash')) || ''
    const urlToPlay = '/play/' + video.id
    const urlForSharing =
      getAppRootUrl(process.env.NODE_ENV) + '/play/' + video.id

    if (video && video.thumbnails.size === 4) {
      poster = video.thumbnails.get(0)
      videoPoster =
        'https://gateway.paratii.video/ipfs/' + video.ipfsHash + '/' + poster
    }

    if (isPublished) {
      videoMediaBox = (
        <VideoMedia>
          <VideoMediaLink to={urlToPlay}>
            <VideoMediaOverlay>
              <VideoMediaIcon>
                <SVGIcon color="white" icon="icon-player-play" />
              </VideoMediaIcon>
              {durationBox}
            </VideoMediaOverlay>
            <VideoImage source={videoPoster} />
          </VideoMediaLink>
        </VideoMedia>
      )
    } else if (isPublishable) {
      videoMediaBox = (
        <VideoMedia>
          <div>
            <VideoMediaOverlay>{durationBox}</VideoMediaOverlay>
            <VideoImage source={videoPoster} />
          </div>
        </VideoMedia>
      )
    } else {
      videoMediaBox = (
        <VideoMedia>
          <div>
            <VideoMediaOverlay>{durationBox}</VideoMediaOverlay>
            <VideoImage source={videoPoster} />
          </div>
        </VideoMedia>
      )
    }

    return (
      <Item>
        <ItemHeader open={this.state.open} onClick={this.toggleOpen}>
          <ItemHeaderContent>
            <Icon flip={!this.state.open}>
              <SVGIcon
                icon="icon-arrow-vertical"
                color={this.state.open ? 'gray' : 'purple'}
              />
            </Icon>
            <ItemHeaderData>
              <Text>{title}</Text>
              <ItemHeaderStatus done={videoIsReady}>
                {statusMessage}
              </ItemHeaderStatus>
            </ItemHeaderData>
            <ItemHeaderButtons>
              <Button onClick={this.clickButton} gray>
                Cancel
              </Button>
              <Button onClick={this.clickButton} purple>
                Publish
              </Button>
            </ItemHeaderButtons>
          </ItemHeaderContent>
          <ItemHeaderBar>
            <VideoProgressBar progress={progress + '%'} nopercentual />
          </ItemHeaderBar>
        </ItemHeader>
        <ItemContent offsetHeight={this.handleHeight}>
          <ItemContentHeight
            innerRef={(ref: HTMLElement) => {
              this.formWrapperRef = ref
            }}
          >
            <Form onSubmit={this.onPublishVideo}>
              <TextField
                id={'video-id' + videoId}
                type="hidden"
                value={this.state.id}
                label="Title"
              />
              <TextField
                label="Title"
                id={'input-video-title' + videoId}
                type="text"
                value={this.state.title}
                onChange={e => this.handleInputChange('title', e)}
                margin="0 0 30px"
                maxLength="100"
                tabIndex="0"
              />
              <Textarea
                id={'input-video-description' + videoId}
                value={this.state.description}
                onChange={e => this.handleInputChange('description', e)}
                label="Description"
                rows="1"
                margin="0 0 30px"
                tabIndex="0"
              />
              <TextField
                label="Video Owner"
                id={'input-video-owner' + videoId}
                type="text"
                value={this.state.author}
                onChange={e => this.handleInputChange('author', e)}
                margin="0 0 30px"
                maxLength="50"
                tabIndex="0"
              />
              <RadioWrapper>
                <RadioTitle>What kind of content?</RadioTitle>
                <RadioCheck
                  name="content-type"
                  value="free"
                  tabIndex="0"
                  defaultChecked
                >
                  Free
                </RadioCheck>
                <RadioCheck
                  name="content-type"
                  value="paid"
                  tabIndex="-1"
                  nomargin
                  disabled
                >
                  Paid (not available yet)
                </RadioCheck>
              </RadioWrapper>
              <FormButtons>
                <Button disabled={true} purple type="submit">
                  Save
                </Button>
              </FormButtons>
            </Form>
            <PreviewBox>
              {videoMediaBox}
              <Text gray small>
                By clicking on the “Publish” button you acknowledge that you
                agree to Paratii’s Terms of Service and Community Guidelines.
                Please be sure not to violate others’ copyright or privacy
                rights. Learn more
              </Text>
              <Text hidden>{urlForSharing}</Text>
            </PreviewBox>
          </ItemContentHeight>
        </ItemContent>
      </Item>
    )
  }
}

export default UploadListItem
