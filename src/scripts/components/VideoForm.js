/* @flow */
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import paratii from 'utils/ParatiiLib'

import { getAppRootUrl } from 'utils/AppUtils'
import RawTranslatedText from 'utils/translations/RawTranslatedText'

import TranslatedText from './translations/TranslatedText'
import { FlexCenterStyle, AbsoluteFullStyle } from './foundations/Styles'
import Text from './foundations/Text'
import TextButton from './foundations/TextButton'
import SVGIcon from './foundations/SVGIcon'
import VideoTimeDisplay from './foundations/VideoTimeDisplay'
import VideoProgressBar from './widgets/VideoForm/VideoProgressBar'
import TextField from './widgets/forms/TextField'
import Textarea from './widgets/forms/TextareaField'
import RadioCheck, {
  RadioWrapper,
  RadioTitle
} from './widgets/forms/RadioCheck'
import UserRecord from 'records/UserRecords'
import {
  isVideoPublished,
  isVideoPublishable,
  videoProgress,
  videoDuration,
  stakedAmount
} from 'operators/VideoOperators'
import { PROFILE_MYVIDEOS_PATH } from 'constants/UrlConstants'
import { MODAL } from 'constants/ModalConstants'
import {
  BORDER_RADIUS,
  MEDIAQUERY_BREAKPOINT,
  VIDEOFORM_PADDING_VERTICAL,
  VIDEOFORM_PADDING_VERTICAL_BP,
  VIDEOFORM_PADDING_HORIZONTAL,
  VIDEOFORM_PADDING_HORIZONTAL_BP,
  VIDEOFORM_CONTAINER_MARGIN_BOTTOM,
  VIDEOFORM_HEADER_PADDING_BOTTOM,
  VIDEOFORM_HEADER_PADDING_BOTTOM_EDIT,
  VIDEOFORM_HEADER_ICON_WIDTH,
  VIDEOFORM_HEADER_ICON_HEIGHT
} from 'constants/UIConstants'

import type VideoRecord from 'records/VideoRecords'
import type { RouterHistory } from 'react-router-dom'

type Props = {
  user: UserRecord,
  balance: string,
  video: VideoRecord,
  videoId: string,
  isWalletSecured: boolean,
  edit: boolean,
  history: RouterHistory,
  saveVideoInfo: Object => Object,
  openModal: string => void,
  notification: (Object, string) => void,
  checkUserWallet: () => void,
  setVideoToPublish: string => void
}

const Z_INDEX_MEDIAICON = 2

const Container = styled.div`
  background: ${props => props.theme.colors.background.primary};
  border-radius: ${BORDER_RADIUS};
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ edit }) =>
    edit ? null : VIDEOFORM_CONTAINER_MARGIN_BOTTOM};
  overflow: hidden;
`
const Header = styled.div`
  cursor: ${({ edit }) => (edit ? null : 'pointer')};
  display: flex;
  flex-direction: column;
  padding-bottom: ${VIDEOFORM_HEADER_PADDING_BOTTOM};
  user-select: none;
`

const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  padding: ${VIDEOFORM_PADDING_VERTICAL} ${VIDEOFORM_PADDING_HORIZONTAL};

  @media ${MEDIAQUERY_BREAKPOINT} {
    padding: ${VIDEOFORM_PADDING_VERTICAL_BP} ${VIDEOFORM_PADDING_HORIZONTAL_BP};
  }
`

const HeaderIcon = styled.button`
  color: ${props =>
    props.open
      ? props.theme.colors.text.secondary
      : props.theme.colors.text.highlight};
  flex: 0 0
    ${({ edit }) =>
    edit ? VIDEOFORM_HEADER_ICON_HEIGHT : VIDEOFORM_HEADER_ICON_WIDTH};
  height: ${({ edit }) =>
    edit ? VIDEOFORM_HEADER_ICON_WIDTH : VIDEOFORM_HEADER_ICON_HEIGHT};
  margin-right: calc(${VIDEOFORM_PADDING_VERTICAL} / 2);
  transition: all 0.5s,
    transform 0.7s ${({ theme }) => theme.animation.ease.smooth};
  transform: ${({ flip, edit }) =>
    flip ? 'rotateX(180deg)' : edit ? 'rotateY(180deg)' : null};

  &:hover {
    filter: brightness(1.3);
  }

  ${Header}:hover & {
    filter: ${({ edit }) => (edit ? null : 'brightness(1.3)')};
  }
`

const HeaderData = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
`

const HeaderStatus = styled.div`
  color: ${props =>
    props.done
      ? props.theme.colors.text.highlight
      : props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fonts.video.list.status};
  font-weight: ${props =>
    props.done
      ? props.theme.fonts.weight.bold
      : props.theme.fonts.weight.regular};
`

const HeaderButtons = styled.div`
  display: flex;
  flex: 0 1 auto;

  button {
    margin-left: 20px;
  }
`

const LabelStake = styled.div`
  background-color: ${props => props.theme.colors.background.body};
  color: white;
  padding: 5px;
  min-width: 100px;
  text-align: center;
  font-size: 14px;
`

const HeaderBar = styled.div`
  display: ${({ edit }) => (edit ? 'none' : 'block')};
`

const Content = styled.div`
  height: ${({ offsetHeight }) => offsetHeight};
  overflow: hidden;
`

const ContentHeight = styled.div`
  display: flex;
  padding: 20px ${VIDEOFORM_PADDING_HORIZONTAL} ${VIDEOFORM_PADDING_HORIZONTAL};

  @media ${MEDIAQUERY_BREAKPOINT} {
    flex-wrap: wrap;
    padding: 20px ${VIDEOFORM_PADDING_HORIZONTAL_BP} ${VIDEOFORM_PADDING_HORIZONTAL_BP};
  }
`

const Form = styled.form`
  flex: 1 1 100%;
  opacity: ${props => (props.disabled ? '0.5' : null)};
  padding-right: ${VIDEOFORM_PADDING_HORIZONTAL};
  pointer-events: ${props => (props.disabled ? 'none' : null)};
  position: relative;

  @media ${MEDIAQUERY_BREAKPOINT} {
    padding-right: 0;
    margin-bottom: ${VIDEOFORM_PADDING_HORIZONTAL};
  }
`

const FormButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`

const PreviewBox = styled.div`
  flex: 1 1 100%;
  max-width: 360px;

  @media ${MEDIAQUERY_BREAKPOINT} {
    max-width: 100%;
  }
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
  background-color: ${props => props.theme.colors.background.body};
  background-image: url(${({ source }) => source});
  background-size: cover;
  background-position: center center;
  padding-top: 60%;
  width: 100%;
`

const VideoMediaOverlay = styled.div`
  ${FlexCenterStyle}
  ${AbsoluteFullStyle}

  &::before {
    ${AbsoluteFullStyle}
    background-color: ${props => props.theme.colors.background.body};
    content: '';
    opacity: 0.3;
    transition: opacity ${props => props.theme.animation.time.repaint};
    ${VideoMediaLink}:hover & {
      opacity: 0.7;
    }
  }
`

const VideoMediaIcon = styled.div`
  color: ${props => props.theme.colors.text.accent};
  height: 20%;
  transition: transform 0.3s ${props => props.theme.animation.ease.smooth};
  position: relative;
  width: 20%;
  z-index: ${Z_INDEX_MEDIAICON};
  ${VideoMediaLink}:hover & {
    transform: scale(0.9);
  }
`

const URLForShare = Text.extend`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

class VideoForm extends Component<Props, Object> {
  handleInputChange: (input: string, e: Object) => void
  onPublishVideo: (e: Object) => void
  onSaveData: (e: Object) => void
  handleHeight: (e: Object) => string
  toggleOpen: (e: Object) => void
  onBackToMyVideos: () => void

  formWrapperRef: Object

  constructor (props: Props, formWrapperRef: Object) {
    super(props)
    const theVideo = this.props.video
    this.state = {
      open: this.props.edit,
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
    this.onBackToMyVideos = this.onBackToMyVideos.bind(this)
  }

  async componentDidMount () {
    const stakeAmountBN = await paratii.eth.tcr.getMinDeposit()
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

  onBackToMyVideos (e: Object) {
    this.props.history.push(PROFILE_MYVIDEOS_PATH)
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
    e.stopPropagation()
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
    const { video, videoId, edit } = this.props
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
      durationBox = <VideoTimeDisplay>{durationNoMillis}</VideoTimeDisplay>
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
      <Container data-test-id="uploader-item">
        <Header
          open={this.state.open}
          edit={edit}
          onClick={edit ? null : this.toggleOpen}
        >
          <HeaderContent>
            <HeaderIcon
              onClick={edit ? this.onBackToMyVideos : this.toggleOpen}
              flip={!this.state.open}
              edit={edit}
            >
              <SVGIcon
                icon={edit ? 'icon-arrow-horizontal' : 'icon-arrow-vertical'}
              />
            </HeaderIcon>
            <HeaderData>
              <Text accent>{title}</Text>
              <HeaderStatus done={videoIsReady}>{statusMessage}</HeaderStatus>
            </HeaderData>
            <HeaderButtons>
              {!isPublished ? (
                <TextButton
                  data-test-id="video-submit-publish"
                  type="submit"
                  onClick={this.onPublishVideo}
                  disabled={!isPublishable}
                  accent
                >
                  <TranslatedText message="uploadListItem.publish" />
                </TextButton>
              ) : (
                <LabelStake>{stakedPTI} PTI Staked</LabelStake>
              )}
            </HeaderButtons>
          </HeaderContent>
          <HeaderBar>
            <VideoProgressBar
              progress={videoProgress(video) + '%'}
              nopercentual
            />
          </HeaderBar>
        </Header>
        <Content offsetHeight={this.handleHeight}>
          <ContentHeight
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
                  margin="0 20px 20px 0"
                  tabIndex="0"
                  defaultChecked
                >
                  <TranslatedText message="uploadListItem.contentType.free" />
                </RadioCheck>
                <RadioCheck
                  name="content-type"
                  value="paid"
                  margin="0 20px 20px 0"
                  tabIndex="-1"
                  disabled
                >
                  <TranslatedText message="uploadListItem.contentType.paid" />
                </RadioCheck>
              </RadioWrapper>
              <FormButtons>
                <TextButton
                  data-test-id="video-submit-save"
                  type="submit"
                  onClick={this.onSaveData}
                  accent
                  disabled={this.props.video.storageStatus.name === 'running'}
                >
                  <TranslatedText message="uploadListItem.save" />
                </TextButton>
              </FormButtons>
            </Form>
            <PreviewBox>
              {isPublished ? (
                <VideoMedia>
                  <VideoMediaLink to={urlToPlay}>
                    <VideoMediaOverlay>
                      <VideoMediaIcon>
                        <SVGIcon icon="icon-player-play" />
                      </VideoMediaIcon>
                      {durationBox}
                    </VideoMediaOverlay>
                    <VideoImage source={videoPoster} />
                  </VideoMediaLink>
                </VideoMedia>
              ) : (
                <VideoMedia>
                  <Fragment>
                    <VideoMediaOverlay>{durationBox}</VideoMediaOverlay>
                    <VideoImage source={videoPoster} />
                  </Fragment>
                </VideoMedia>
              )}
              {!isPublished ? (
                <Text small>
                  <TranslatedText message="uploadListItem.termsOfService" />
                </Text>
              ) : (
                <URLForShare>{urlForSharing}</URLForShare>
              )}
            </PreviewBox>
          </ContentHeight>
        </Content>
      </Container>
    )
  }
}

export default withRouter(VideoForm)
