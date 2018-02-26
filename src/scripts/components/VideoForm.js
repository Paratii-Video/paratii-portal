/* @flow */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import VideoRecord from 'records/VideoRecords'

import Card from './structures/Card'
import Button from './foundations/Button'
import TextField from './widgets/forms/TextField'
import Textarea from './widgets/forms/TextareaField'
import RadioCheck, {
  RadioWrapper,
  RadioTitle
} from './widgets/forms/RadioCheck'
import VideoProgress from 'components/widgets/VideoForm/VideoProgress'
import Hidden from 'components/foundations/Hidden'
import { prettyBytes } from 'utils/AppUtils'
import ModalStake from 'components/widgets/modals/ModalStake'

const VideoFormHeader = styled.div`
  border-bottom: 1px solid
    ${props => props.theme.colors.VideoForm.header.border};
  margin-bottom: 40px;
  padding-bottom: 20px;
`

const VideoFormWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 1150px) {
    flex-wrap: wrap;
  }
`

const VideoFormTitle = styled.h1`
  color: ${props => props.theme.colors.VideoForm.header.title};
  font-size: ${props => props.theme.fonts.video.form.title};
`

const VideoFormSubTitle = styled.p`
  color: ${props =>
    props.purple
      ? props.theme.colors.VideoForm.header.subtitle2
      : props.theme.colors.VideoForm.header.subtitle};
  font-size: ${props => props.theme.fonts.video.form.subtitle};
  margin-top: 3px;
`

const Form = styled.div`
  flex: 1 1 100%;
  margin-right: 45px;
  padding-bottom: 70px;
  position: relative;

  @media (max-width: 1150px) {
    flex: 1 1 100%;
    margin: 0 0 50px;
  }
`

const VideoFormInfoBox = styled.div`
  flex: 1 1 584px;
  padding-bottom: 70px;
  position: relative;

  @media (max-width: 1150px) {
    flex: 1 1 100%;
  }
`

const ButtonWrapper = styled.div`
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  left: 0;
  margin: 50px 0 0;
  position: absolute;
  width: 100%;
`

const VideoMedia = styled.div`
  margin-bottom: 15px;
  position: relative;
  width: 100%;
`

const VideoImage = styled.img`
  display: block;
  width: 100%;
`

const VideoMediaTime = styled.div`
  bottom: 10px;
  padding: 10px;
  position: absolute;
  right: 10px;

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

type Props = {
  selectedVideo: VideoRecord,
  canSubmit: boolean,
  progress: Number,
  saveVideoInfo: Object => Object,
  showModal: (View: Object) => void,
  closeModal: () => void
}

class VideoForm extends Component<Props, Object> {
  handleSubmit: (e: Object) => void
  handleInputChange: (input: string, e: Object) => void

  constructor (props: Props) {
    super(props)
    const selectedVideo = this.props.selectedVideo
    this.state = {
      id: selectedVideo.id,
      title: selectedVideo.title,
      description: selectedVideo.description,
      duration: selectedVideo.duration,
      author: selectedVideo.author
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps: Props): void {
    const selectedVideo: ?VideoRecord = nextProps.selectedVideo
    if (selectedVideo && this.state.id !== selectedVideo.id) {
      this.setState({
        id: selectedVideo.id,
        title: selectedVideo.title,
        description: selectedVideo.description,
        duration: selectedVideo.duration,
        author: selectedVideo.author
      })
    }
  }

  handleInputChange (input: string, e: Object) {
    this.setState({
      [input]: e.target.value
    })
  }

  handleSubmit (e: Object) {
    e.preventDefault()
    const videoToSave = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      author: this.state.author
    }
    this.props.saveVideoInfo(videoToSave)
  }

  render () {
    const video: VideoRecord = this.props.selectedVideo
    if (!this.state.id) {
      return (
        <Card>
          No video selected!
          {this.props.selectedVideo.id}
        </Card>
      )
    }

    const title = video.title || video.filename
    const duration = (video && video.get('duration')) || ''
    let durationBox = null
    if (duration) {
      durationBox = (
        <VideoMediaTime>
          <VideoMediaTimeText>{duration}</VideoMediaTimeText>
        </VideoMediaTime>
      )
    }

    const fileSize = prettyBytes((video && video.get('filesize')) || 0)
    // console.log((video && video.get('filesize')) || 0)
    const ipfsHash = (video && video.get('ipfsHash')) || ''
    const urlToPlay = `/play/${video.id}`
    const urlForSharing = `https://portal.paratii.video/play/${video.id}`

    const thumbImages =
      video &&
      video.getIn(['transcodingStatus', 'data', 'sizes', 'screenshots'])

    let thumbImage = ''
    if (thumbImages) {
      thumbImage = `https://gateway.paratii.video/ipfs/${ipfsHash}/${thumbImages.get(
        1
      )}`
    } else {
      thumbImage = 'https://paratii.video/public/images/paratii-src.png'
    }

    const uploadProgress = video.uploadStatus.data.progress
    const transcodingStatus = video.transcodingStatus.data.progress
    const progress = Math.ceil((uploadProgress + transcodingStatus) / 2)

    return (
      <Card full>
        <VideoFormHeader>
          <VideoFormTitle id="video-title">{title}</VideoFormTitle>
          <VideoFormSubTitle purple>
            {video.title ? video.filename : ''} {fileSize}
          </VideoFormSubTitle>
        </VideoFormHeader>
        <VideoFormWrapper>
          <Form>
            <TextField
              id="video-id"
              type="hidden"
              value={this.state.id}
              label="Title"
            />
            <TextField
              label="Title"
              id="input-video-title"
              type="text"
              value={this.state.title}
              onChange={e => this.handleInputChange('title', e)}
              margin="0 0 30px"
            />
            <Textarea
              id="input-video-description"
              value={this.state.description}
              onChange={e => this.handleInputChange('description', e)}
              label="Description"
              rows="1"
              margin="0 0 30px"
            />
            <TextField
              label="Video Owner"
              id="input-video-owner"
              type="text"
              value={this.state.author}
              onChange={e => this.handleInputChange('author', e)}
              margin="0 0 30px"
            />
            <RadioWrapper>
              <RadioTitle>What kind of content?</RadioTitle>
              <RadioCheck name="content-type" value="free" defaultChecked>
                Free
              </RadioCheck>
              <RadioCheck name="content-type" value="paid" nomargin disabled>
                Paid (not available yet)
              </RadioCheck>
            </RadioWrapper>
            <ButtonWrapper>
              <Button
                id="video-submit"
                type="submit"
                onClick={this.handleSubmit}
                // disabled={!this.props.canSubmit}
                purple
              >
                Save data
              </Button>
            </ButtonWrapper>
          </Form>

          <VideoFormInfoBox>
            <VideoMedia>
              <Link to={urlToPlay}>
                <VideoImage data-src={thumbImage} src={thumbImage} />
              </Link>
              {durationBox}
            </VideoMedia>
            <VideoProgress progress={progress + '%'} marginBottom marginTop>
              {video.uploadStatus.data.progress === 100
                ? '2/2 - Transcoder: ' + video.transcodingStatus.name
                : '1/2 - Uploader: ' + video.uploadStatus.name}
            </VideoProgress>
            <Hidden>
              <TextField
                id="video-title"
                type="text"
                margin="0 0 30px"
                onChange={e => this.handleInputChange('title', e)}
                value="<iframe width=560 height=315 src=https://"
                label="Embed Code"
                readonly
              />
            </Hidden>
            <TextField
              id="video-title"
              type="text"
              margin="0 0 25px"
              onChange={e => this.handleInputChange('title', e)}
              value={urlForSharing}
              label="Share this video"
              readonly
            />
            <ButtonWrapper>
              <Button margin="0 20px 0 0" type="button">
                Cancel
              </Button>
              <Button
                type="submit"
                purple
                disabled={video.uploadStatus.data.progress !== 100}
                onClick={() => {
                  this.props.showModal(
                    <ModalStake
                      videoId={this.state.id}
                      closeModal={this.props.closeModal}
                    />
                  )
                }}
              >
                Publish
              </Button>
            </ButtonWrapper>
          </VideoFormInfoBox>
        </VideoFormWrapper>
      </Card>
    )
  }
}

export default VideoForm
