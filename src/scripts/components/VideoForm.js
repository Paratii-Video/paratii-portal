/* @flow */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import VideoRecord from 'records/VideoRecords'

import Card from 'components/structures/Card'
import Button from './foundations/Button'
import Input from './widgets/forms/TextField'
import Textarea from './widgets/forms/TextareaField'
import RadioCheck, {
  RadioWrapper,
  RadioTitle
} from 'components/widgets/forms/RadioCheck'
import VideoProgress from 'components/widgets/VideoForm/VideoProgress'
import Hidden from 'components/foundations/Hidden'
import { prettyBytes } from 'utils/AppUtils'

type Props = {
  selectedVideo: VideoRecord,
  canSubmit: boolean,
  saveVideoInfo: Object => Object
}

const VideoFormWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
`

const VideoFormHeader = styled.div`
  border-bottom: 1px solid
    ${props => props.theme.colors.VideoForm.header.border};
  margin-bottom: 40px;
  padding-bottom: 20px;
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

  @media (max-width: 1024px) {
    flex: 1 1 100%;
    margin: 0 0 50px;
  }
`

const VideoFormInfoBox = styled.div`
  flex: 1 1 584px;

  @media (max-width: 1024px) {
    flex: 1 1 100%;
  }
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 50px 0 0;
`

const VideoMediaTimeText = styled.p`
  color: ${props => props.theme.colors.VideoForm.info.time.color};
  font-size: ${props => props.theme.fonts.video.info.time};
  position: relative;
  z-index: 1;
`

class VideoForm extends Component<Props, Object> {
  handleSubmit: (e: Object) => void
  handleInputChange: (input: string, e: Object) => void

  constructor (props: Props) {
    super(props)
    const selectedVideo = this.props.selectedVideo
    this.state = {
      video: new VideoRecord(selectedVideo),
      uploadProgress: 0,
      transcodingProgress: 0,
      totalProgress: 0,
      id: '',
      title: '',
      description: ''
    }
    if (selectedVideo) {
      this.setState({
        id: selectedVideo.id,
        title: selectedVideo.title,
        description: selectedVideo.description
      })
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps: Props): void {
    const nextSelectedVideo: ?VideoRecord = nextProps.selectedVideo
    if (nextSelectedVideo) {
      this.setState(nextSelectedVideo)
      this.setState({
        id: nextSelectedVideo.id,
        title: nextSelectedVideo.title,
        description: nextSelectedVideo.description
      })

      if (nextSelectedVideo.getIn(['uploadStatus', 'name']) === 'running') {
        const progress = nextSelectedVideo.getIn([
          'uploadStatus',
          'data',
          'progress'
        ])
        this.setState({ uploadProgress: progress })
      } else if (
        nextSelectedVideo.getIn(['uploadStatus', 'name']) ===
        'uploaded to remote'
      ) {
        this.setState({ uploadProgress: 100 })
      }

      if (
        nextSelectedVideo.getIn(['transcodingStatus', 'name']) === 'progress'
      ) {
        const progress = nextSelectedVideo.getIn([
          'transcodingStatus',
          'data',
          'progress'
        ])
        this.setState({ transcodingProgress: progress })
      } else if (
        nextSelectedVideo.getIn(['transcodingStatus', 'name']) === 'success'
      ) {
        this.setState({ transcodingProgress: 100 })
      }
    }

    this.setState((prevState, nextProps) => ({
      totalProgress: Math.round(
        (prevState.uploadProgress + prevState.transcodingProgress) / 2
      )
    }))
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
      description: this.state.description
    }
    this.props.saveVideoInfo(videoToSave)
  }

  render () {
    const video: ?VideoRecord = this.props.selectedVideo
    if (!video || !video.id) {
      return <Card>No video selected!</Card>
    }
    const title = video.title || video.filename
    const thumbImages =
      video &&
      video.getIn(['transcodingStatus', 'data', 'sizes', 'screenshots'])
    const fileSize = prettyBytes((video && video.get('filesize')) || 0)
    const ipfsHash = (video && video.get('ipfsHash')) || ''
    let thumbImage = ''
    if (thumbImages) {
      thumbImage = `https://gateway.paratii.video/ipfs/${ipfsHash}/${thumbImages.get(
        1
      )}`
    } else {
      thumbImage = 'https://paratii.video/public/images/paratii-src.png'
    }

    const urlToPlay = `/play/${video.id}`
    const urlForSharing = `https://portal.paratii.video/play/${video.id}`

    const state = JSON.stringify(this.state, null, 2)
    return (
      <Card full>
        <VideoFormHeader>
          <VideoFormTitle id="video-title">{title}</VideoFormTitle>
          <Hidden>
            ({this.state.id} - {ipfsHash})
          </Hidden>{' '}
          <VideoFormSubTitle purple>
            {video.title ? video.filename : ''} {fileSize}
          </VideoFormSubTitle>
        </VideoFormHeader>
        <VideoFormWrapper>
          <Form>
            <Input
              id="video-id"
              type="hidden"
              value={this.state.id}
              label="Title"
            />
            <Input
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
            <RadioWrapper>
              <RadioTitle>What kind of content?</RadioTitle>
              <RadioCheck name="content-type" value="free">
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
              <VideoMediaTime>
                <VideoMediaTimeText>28:26</VideoMediaTimeText>
              </VideoMediaTime>
            </VideoMedia>
            <VideoProgress
              progress={this.state.uploadProgress + '%'}
              marginBottom
            >
              Upload
              {video.uploadStatus.name}
              {video.uploadStatus.data.progress}
            </VideoProgress>
            <VideoProgress
              progress={this.state.transcodingProgress + '%'}
              marginBottom
            >
              Transcoding
              {video.transcodingStatus.name}
              {video.transcodingStatus.data.progress}
            </VideoProgress>
            <Hidden>
              <Input
                id="video-title"
                type="text"
                margin="0 0 30px"
                onChange={e => this.handleInputChange('title', e)}
                value="<iframe width=560 height=315 src=https://"
                label="Embed Code"
                readonly
              />
            </Hidden>
            <Input
              id="video-title"
              type="text"
              margin="0 0 30px"
              onChange={e => this.handleInputChange('title', e)}
              value={urlForSharing}
              label="Share this video"
              readonly
            />
            <Hidden>{state}</Hidden>
          </VideoFormInfoBox>
        </VideoFormWrapper>
      </Card>
    )
  }
}

export default VideoForm
