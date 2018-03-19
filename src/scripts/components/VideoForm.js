import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import VideoRecord from 'records/VideoRecords'
import UserRecord from 'records/UserRecords'

import Card from './structures/Card'
import Button from './foundations/Button'
import TextField from './widgets/forms/TextField'
import Textarea from './widgets/forms/TextareaField'
import RadioCheck, {
  RadioWrapper,
  RadioTitle
} from './widgets/forms/RadioCheck'
import VideoFormInfoBox from 'containers/VideoFormInfoBoxContainer'
import { prettyBytes } from 'utils/AppUtils'

const VideoFormHeader = styled.div`
  border-bottom: 1px solid
    ${props => props.theme.colors.VideoForm.header.border};
  margin-bottom: 40px;
  padding-bottom: 20px;
`

const VideoFormWrapper = styled.div`
  display: flex;
  position: relative;
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
  opacity: ${props => (props.disabled ? '0.5' : null)};
  padding-bottom: 70px;
  pointer-events: ${props => (props.disabled ? 'none' : null)};
  position: relative;

  @media (max-width: 1150px) {
    flex: 1 1 100%;
    margin: 0 0 50px;
  }
`

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 50px 0 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
`

const ButtonWrapper = styled.div`
  margin-left: 20px;
  z-index: 5;
`

type Props = {
  selectedVideo: VideoRecord,
  canSubmit: boolean,
  progress: Number,
  saveVideoInfo: Object => Object,
  transcodeVideo: Object => Object,
  uploadAndTranscode: Object => Object,
  showModal: (View: Object) => void,
  closeModal: () => void,
  openModal: () => void,
  notification: (Object, string) => void,
  isUploaded: Boolean,
  isPublished: Boolean,
  isPublishable: Boolean,
  user: UserRecord,
  balance: String,
  innerRef: Object
}

class VideoForm extends Component<Props, Object> {
  handleInputChange: (input: string, e: Object) => void
  onPublishVideo: (e: Object) => void
  onSaveData: (e: Object) => void
  publishVideo: (publish: boolean) => void
  saveData: (publish: boolean) => void

  constructor (props: Props) {
    super(props)
    const selectedVideo = this.props.selectedVideo
    this.state = {
      id: selectedVideo.id,
      title: selectedVideo.title,
      description: selectedVideo.description,
      // FIXME: we are not editing duration, so we do not need to store it in the state
      duration: selectedVideo.duration,
      author: selectedVideo.author
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.onPublishVideo = this.onPublishVideo.bind(this)
    this.onSaveData = this.onSaveData.bind(this)
    this.publishVideo = this.publishVideo.bind(this)
    this.saveData = this.saveData.bind(this)
    this.onFileChosen = this.onFileChosen.bind(this)
  }

  handleInputChange (input: string, e: Object) {
    this.setState({
      [input]: e.target.value
    })
  }

  onPublishVideo (e: Object) {
    e.preventDefault()
    const balance = Number(this.props.user.balances.PTI) // paratii.eth.web3.utils.fromWei(balance)
    console.log(balance)
    // FIXME we need to manage this globally and not hardcoded
    const stakeAmount = 5
    const stakeAmountWei = Number(
      paratii.eth.web3.utils.toWei(stakeAmount + '')
    )
    console.log(stakeAmountWei)
    if (balance < stakeAmountWei) {
      this.props.notification(
        {
          title: 'Not enough tokens',
          message: `You need at least ${stakeAmount}PTIs to make a stake.`
        },
        'error'
      )
    } else {
      this.publishVideo(true)
    }
  }

  onFileChosen (e) {
    const file = e.target.files[0]
    this.props.uploadAndTranscode(file, this.props.selectedVideo.id)
  }

  onSaveData (e: Object) {
    e.preventDefault()
    this.saveData(false)
  }

  publishVideo (publish: false) {
    this.props.openModal('ModalStake')
  }

  saveData (publish: false) {
    const videoToSave = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      author: this.state.author
      // published: publish
    }
    this.props.saveVideoInfo(videoToSave)
  }

  componentWillReceiveProps (nextProps: Props): void {
    const selectedVideo: ?VideoRecord = nextProps.selectedVideo
    if (selectedVideo && this.state.id !== selectedVideo.id) {
      this.setState({
        id: selectedVideo.id,
        title: selectedVideo.title,
        description: selectedVideo.description,
        // FIXME: we are not editing duration, so we do not need to store it in the state
        duration: selectedVideo.duration,
        author: selectedVideo.author
      })
    }
  }

  render () {
    const video: VideoRecord = this.props.selectedVideo
    if (!this.state.id) {
      return (
        <Card title="No video selected!">{this.props.selectedVideo.id}</Card>
      )
    }

    const title = video.title || video.filename
    const fileSize = prettyBytes((video && video.get('filesize')) || 0)

    const isPublished = this.props.isPublished
    const isPublishable = this.props.isPublishable

    let publishButton = ''
    if (isPublishable && !isPublished) {
      publishButton = (
        <ButtonWrapper>
          <Button
            id="video-submit"
            type="submit"
            onClick={this.onPublishVideo}
            disabled={!isPublishable}
            purple
          >
            Publish
          </Button>
        </ButtonWrapper>
      )
    }

    const saveButton = (
      <ButtonWrapper>
        <Button
          id="video-submit"
          type="submit"
          onClick={this.onSaveData}
          purple
          disabled={this.props.selectedVideo.storageStatus.name === 'running'}
        >
          Save Changes
        </Button>
      </ButtonWrapper>
    )

    // The restart button is just for convenicene, for testing
    let restartButton
    // if (process.env.NODE_ENV === 'development') {
    //   restartButton = (
    //     <div>
    //       Use this for testing (this will not be visible in production)
    //       <input type="file" onChange={this.onFileChosen} />
    //     </div>
    //   )
    // } else {
    //   restartButton = ''
    // }

    return (
      <Card full innerRef={this.props.innerRef} nobackground>
        <VideoFormHeader>
          <VideoFormTitle id="video-title">{title}</VideoFormTitle>
          <VideoFormSubTitle purple>{fileSize}</VideoFormSubTitle>
        </VideoFormHeader>
        <VideoFormWrapper>
          <Form
            onSubmit={this.onPublishVideo}
            // disabled={this.props.selectedVideo.storageStatus.name === 'running'}
          >
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
            <ButtonContainer>
              {publishButton}
              {saveButton}
              {restartButton}
            </ButtonContainer>
          </Form>
          <VideoFormInfoBox />
        </VideoFormWrapper>
      </Card>
    )
  }
}

export default VideoForm
