/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import paratii from 'utils/ParatiiLib'

import { getAppRootUrl } from 'utils/AppUtils'
import RawTranslatedText from 'utils/translations/RawTranslatedText'

import TranslatedText from './translations/TranslatedText'
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
import type VideoRecord from 'records/VideoRecords'
import UserRecord from 'records/UserRecords'
import {
  isVideoPublished,
  isVideoPublishable,
  videoProgress,
  videoDuration,
  stakedAmount
} from 'operators/VideoOperators'
import { MODAL } from 'constants/ModalConstants'

type Props = {
  user: UserRecord,
  balance: string,
  video: VideoRecord,
  videoId: string,
  isWalletSecured: boolean,
  saveVideoInfo: Object => Object,
  openModal: string => void,
  notification: (Object, string) => void,
  checkUserWallet: () => void,
  setVideoToPublish: string => void
}

const PADDING_HORIZONTAL: string = '50px'
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

  button {
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

const LabelStake = styled.div`
  background-color: ${props => props.theme.colors.body.background};
  color: white;
  padding: 5px;
  min-width: 100px;
  text-align: center;
  font-size: 14px;
`

const VideoMediaTimeText = styled.p`
  color: ${props => props.theme.colors.VideoForm.info.time.color};
  font-size: ${props => props.theme.fonts.video.info.time};
  position: relative;
  z-index: 1;
`

class VideoForm extends Component<Props, Object> {
  handleInputChange: (input: string, e: Object) => void
  onPublishVideo: (e: Object) => void
  onSaveData: (e: Object) => void
  handleHeight: (e: Object) => string
  toggleOpen: (e: Object) => void

  formWrapperRef: Object

  constructor (props: Props, formWrapperRef: Object) {
    super(props)
    const theVideo = this.props.video
    this.state = {
      open: false,
      id: theVideo.id,
      title: theVideo.title || '',
      description: theVideo.description || '',
      ownershipProof: theVideo.ownershipProof || '',
      duration: theVideo.duration,
      author: theVideo.author,
      height: '0px',
      stakeAmount: 0
    }

    this.formWrapperRef = formWrapperRef

    this.handleHeight = this.handleHeight.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.onSaveData = this.onSaveData.bind(this)
    this.onPublishVideo = this.onPublishVideo.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  async componentDidMount () {
    const stakeAmountBN = await paratii.eth.tcrPlaceholder.getMinDeposit()
    const stakeAmount = stakeAmountBN.toString()
    this.setState({
      stakeAmount
    })
  }

  handleInputChange (input: string, e: Object) {
    this.setState({
      [input]: e.target.value
    })
  }

  onSaveData (e: Object) {
    e.preventDefault()
    if (this.props.isWalletSecured) {
      const videoToSave = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        ownershipProof: this.state.ownershipProof,
        author: this.props.user.name
      }
      this.props.saveVideoInfo(videoToSave)
    } else {
      // If wallet not secure open the modal
      this.props.checkUserWallet()
    }
  }

  async onPublishVideo (e: Object) {
    e.preventDefault()
    const videoId = this.state.id
    const balance = Number(this.props.user.balances.PTI) // paratii.eth.web3.utils.fromWei(balance)
    const stakeAmountWei = this.state.stakeAmount
    const stakeAmount = Number(
      paratii.eth.web3.utils.fromWei(stakeAmountWei + '')
    )
    this.props.setVideoToPublish(videoId)
    if (balance < stakeAmountWei) {
      this.props.notification(
        {
          title: 'Not enough tokens',
          message: `You need at least ${stakeAmount} PTIs to make a stake.`
        },
        'error'
      )
    } else {
      if (this.props.isWalletSecured) {
        this.props.openModal(MODAL.STAKE)
      } else {
        // If wallet not secure open the modal for signup / login
        this.props.checkUserWallet()
      }
    }
  }

  toggleOpen (e: Object) {
    this.setState({
      open: !this.state.open
    })
  }

  handleHeight (e: Object) {
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
        statusMessage = (
          <TranslatedText message="uploadListItem.statusMessage.needsTitle" />
        )
      } else {
        statusMessage = (
          <TranslatedText message="uploadListItem.statusMessage.videoReady" />
        )
        videoIsReady = true
      }
    } else {
      if (video.uploadStatus.name === 'failed') {
        statusMessage = (
          <TranslatedText message="uploadListItem.statusMessage.uploadFailed" />
        )
      } else if (video.transcodingStatus.name === 'failed') {
        statusMessage = (
          <TranslatedText message="uploadListItem.statusMessage.transcodeFailed" />
        )
      } else if (video.transcodingStatus.name === 'requested') {
        statusMessage = (
          <TranslatedText message="uploadListItem.statusMessage.transcoding" />
        )
      } else {
        statusMessage = (
          <TranslatedText message="uploadListItem.statusMessage.uploading" />
        )
      }
    }

    // Media box
    let poster = ''
    let videoPoster = ''
    const isPublished = isVideoPublished(video)
    const stakedPTI = paratii.eth.web3.utils.fromWei(
      String(stakedAmount(video))
    )
    const isPublishable = isVideoPublishable(video)
    const duration = videoDuration(video)

    let durationBox = null
    if (duration) {
      const durationNoMillis = duration.substring(0, duration.indexOf('.'))
      durationBox = (
        <VideoMediaTime>
          <VideoMediaTimeText>{durationNoMillis}</VideoMediaTimeText>
        </VideoMediaTime>
      )
    }

    const urlToPlay = '/play/' + video.id
    const urlForSharing =
      getAppRootUrl(process.env.NODE_ENV) + '/play/' + video.id

    if (video && video.thumbnails.size === 4) {
      poster = video.thumbnails.get(0)
      videoPoster =
        'https://gateway.paratii.video/ipfs/' + video.ipfsHash + '/' + poster
    }

    return (
      <Item data-test-id="uploader-item">
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
              {!isPublished ? (
                <Button
                  data-test-id="video-submit-publish"
                  type="submit"
                  onClick={this.onPublishVideo}
                  disabled={!isPublishable}
                  purple
                >
                  <TranslatedText message="uploadListItem.publish" />
                </Button>
              ) : (
                <LabelStake>{stakedPTI} PTI Staked</LabelStake>
              )}
            </ItemHeaderButtons>
          </ItemHeaderContent>
          <ItemHeaderBar>
            <VideoProgressBar
              progress={videoProgress(video) + '%'}
              nopercentual
            />
          </ItemHeaderBar>
        </ItemHeader>
        <ItemContent offsetHeight={this.handleHeight}>
          <ItemContentHeight
            innerRef={(ref: HTMLElement) => {
              this.formWrapperRef = ref
            }}
          >
            <Form onSubmit={this.onPublishVideo}>
              <input
                data-test-id="video-id"
                id={'video-id-' + videoId}
                type="hidden"
                value={this.state.id}
                label={RawTranslatedText({ message: 'uploadListItem.videoId' })}
              />
              <TextField
                label={RawTranslatedText({ message: 'uploadListItem.title' })}
                id={'input-video-title-' + videoId}
                type="text"
                value={this.state.title}
                onChange={e => this.handleInputChange('title', e)}
                margin="0 0 30px"
                maxLength="100"
                tabIndex="0"
              />
              <Textarea
                id={'input-video-description-' + videoId}
                value={this.state.description}
                onChange={e => this.handleInputChange('description', e)}
                label={RawTranslatedText({
                  message: 'uploadListItem.description'
                })}
                rows="1"
                margin="0 0 30px"
                tabIndex="0"
              />
              <Textarea
                label={RawTranslatedText({
                  message: 'uploadListItem.ownership'
                })}
                id={'input-video-ownership-proof-' + videoId}
                type="text"
                value={this.state.ownershipProof}
                onChange={e => this.handleInputChange('ownershipProof', e)}
                margin="0 0 30px"
                maxLength="50"
                tabIndex="0"
              />
              <RadioWrapper>
                <RadioTitle>
                  <TranslatedText message="uploadListItem.contentType.title" />
                </RadioTitle>
                <RadioCheck
                  name="content-type"
                  value="free"
                  tabIndex="0"
                  defaultChecked
                >
                  <TranslatedText message="uploadListItem.contentType.free" />
                </RadioCheck>
                <RadioCheck
                  name="content-type"
                  value="paid"
                  tabIndex="-1"
                  nomargin
                  disabled
                >
                  <TranslatedText message="uploadListItem.contentType.paid" />
                </RadioCheck>
              </RadioWrapper>
              <FormButtons>
                <Button
                  data-test-id="video-submit-save"
                  type="submit"
                  onClick={this.onSaveData}
                  purple
                  disabled={this.props.video.storageStatus.name === 'running'}
                >
                  <TranslatedText message="uploadListItem.save" />
                </Button>
              </FormButtons>
            </Form>
            <PreviewBox>
              {isPublished ? (
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
              ) : (
                <VideoMedia>
                  <div>
                    <VideoMediaOverlay>{durationBox}</VideoMediaOverlay>
                    <VideoImage source={videoPoster} />
                  </div>
                </VideoMedia>
              )}
              {!isPublished ? (
                <Text gray small>
                  <TranslatedText message="uploadListItem.termsOfService" />
                </Text>
              ) : (
                <Text>{urlForSharing}</Text>
              )}
            </PreviewBox>
          </ItemContentHeight>
        </ItemContent>
      </Item>
    )
  }
}

export default VideoForm
