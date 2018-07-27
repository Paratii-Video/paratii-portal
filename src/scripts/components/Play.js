/* @flow */

import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import styled from 'styled-components'
import debounce from 'lodash.debounce'
import Transition from 'react-transition-group/Transition'
import TimeFormat from 'hh-mm-ss'
import playerjs from 'player.js'
import queryString from 'query-string'

import { PlaybackLevel } from 'records/PlayerRecords'
import VideoRecord from 'records/VideoRecords'
import VideoOverlayContainer from 'containers/VideoOverlayContainer'
import TextButton from 'components/foundations/TextButton'
import SVGIcon from 'components/foundations/SVGIcon'
import Title from 'components/foundations/Title'
import Text, { Span } from 'components/foundations/Text'
import Card from 'components/structures/Card'
import TipOverlayContainer from 'containers/tipping/TipOverlayContainer'
import TranslatedText from 'components/translations/TranslatedText'
import ShareOverlay from 'containers/widgets/ShareOverlayContainer'
import VideoNotFound from './pages/VideoNotFound'
import SidebarTCR from 'containers/widgets/tcr/SidebarTCRContainer'
import {
  requestFullscreen,
  requestCancelFullscreen,
  getAppRootUrl
} from 'utils/AppUtils'
import RawTranslatedText from 'utils/translations/RawTranslatedText'

import { PLAYER_PARAMS } from 'constants/PlayerConstants'
import { APP_TITLE } from 'constants/ApplicationConstants'
import {
  MAX_WIDTH,
  PLAYMAINWRAPPER_MARGIN_RIGHT,
  MEDIAQUERY_BREAKPOINT,
  MAINWRAPPER_PADDING_VERTICAL,
  CARD_MARGIN
} from 'constants/UIConstants'

import type { ClapprPlayer, PlayerPlugin } from 'types/ApplicationTypes'
import type { Match } from 'react-router-dom'

const PLAYER_ID = 'player'
const Z_INDEX_PLAYER: string = '1'
const Z_INDEX_OVERLAY: string = '2'

type Props = {
  match: Match,
  setSelectedVideo: (id: string) => void,
  setFullscreen: (isFullscreen: boolean) => void,
  fetchVideo: (id: string) => void,
  isPlaying: boolean,
  togglePlayPause: (play: ?boolean) => void,
  updateVideoTime: ({ time: number, id: string }) => void,
  updateVideoBufferedTime: ({ time: number }) => void,
  updateVolume: (percentage: number) => void,
  playbackLevelsLoaded: (levels: Array<Object>) => void,
  playbackLevelSet: (levelId: number) => void,
  isAttemptingPlay: boolean,
  attemptPlay: () => void,
  video?: VideoRecord,
  videoDurationSeconds: number,
  isEmbed?: boolean,
  currentTimeSeconds: number,
  currentBufferedTimeSeconds: number,
  currentPlaybackLevel: ?PlaybackLevel,
  playerReset: () => void,
  activePlugin: ?PlayerPlugin,
  userIsTipping: boolean
}

type State = {
  player?: ?ClapprPlayer,
  shouldShowStartScreen: boolean,
  isEmbed: boolean,
  mouseInOverlay: boolean,
  shouldShowVideoOverlay: boolean,
  showShareModal: boolean,
  showTipOverlay: boolean,
  videoHasNeverPlayed: boolean,
  videoNotFound: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: ${props => (props.isEmbed ? null : null)};
  padding-bottom: ${MAINWRAPPER_PADDING_VERTICAL};
  width: 100%;
`

// Video

const VideoWrapper = styled.div`
  background: black;
  width: 100%;
  height: ${props => (props.isEmbed ? '100%' : null)};
  margin: ${props => (props.isEmbed ? null : '0 auto ' + CARD_MARGIN)};

  @media (max-width: 930px) {
    margin: ${props => (props.isEmbed ? null : '0 0 ' + CARD_MARGIN)};
  }
`

const VideoContainer = styled.div`
  height: ${props => (props.isEmbed ? '100%' : '720px')};
  margin: 0 auto;
  max-width: ${props => (props.isEmbed ? null : MAX_WIDTH)};
  position: relative;
  width: 100%;

  @media (max-width: 1440px) {
    height: ${props => (props.isEmbed ? null : '576px')};
    max-width: ${props => (props.isEmbed ? null : '1024px')};
  }

  @media (max-width: 1200px) {
    height: ${props => (props.isEmbed ? null : '432px')};
    max-width: ${props => (props.isEmbed ? null : '768px')};
  }

  @media (max-width: 930px) {
    height: ${props => (props.isEmbed ? '100%' : '0')};
    max-width: initial;
    padding-top: ${props => (props.isEmbed ? null : CARD_MARGIN)};
    padding-bottom: ${props => (props.isEmbed ? null : '56.25%')};
  }
`

const PlayerWrapper = styled.div`
  background-color: ${props => props.theme.colors.background.primary};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

const Player = styled.div`
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEX_PLAYER};
`

const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEX_OVERLAY};
`

// Infos (Description and sidebar)

const PlayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${props => (props.isEmbed ? null : MAX_WIDTH)};
  width: 100%;

  @media ${MEDIAQUERY_BREAKPOINT} {
    flex-direction: column;
    max-width: initial;
  }
`

const PlayMainWrapper = styled.div`
  flex: 1 1 100%;
  flex-direction: column;
  margin-right: ${({ noSidebar }) => noSidebar ? null : PLAYMAINWRAPPER_MARGIN_RIGHT};
`

const PlaySidebarWrapper = styled.div`
  flex: 1 0 410px;
  flex-direction: column;
`

const VideoInfoButtons = styled.div`
  display: flex;
  margin: 15px 0 15px;
`

const DescriptionWrapper = styled.div`
  margin-top: 30px;
`

const TipOverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEX_OVERLAY};
`

const HIDE_CONTROLS_THRESHOLD: number = 2000

class Play extends Component<Props, State> {
  player: ?ClapprPlayer
  onOverlayClick: () => void
  toggleShareModal: () => void
  lastMouseMove: number
  playerHideTimeout: number
  wrapperRef: ?HTMLElement
  playerWrapperRef: ?HTMLElement
  stagedPlaybackLevel: number
  shouldShowStartScreen: () => boolean

  constructor (props: Props) {
    super(props)

    this.state = {
      shouldShowStartScreen: true,
      mouseInOverlay: false,
      shouldShowVideoOverlay: false,
      videoNotFound: false,
      playerCreated: '',
      isEmbed: this.props.isEmbed || false,
      showShareModal: false,
      videoHasNeverPlayed: true,
      showTipOverlay: false
    }

    this.lastMouseMove = 0
    this.playerHideTimeout = 0
    this.stagedPlaybackLevel = -1

    this.onOverlayClick = this.onOverlayClick.bind(this)
    this.toggleShareModal = this.toggleShareModal.bind(this)

    this.props.setSelectedVideo(this.getVideoIdFromRequest())

    if (this.props.video) {
      this.props.updateVideoTime({
        id: this.props.video.get('id'),
        time: 0
      })
      this.props.updateVideoBufferedTime({
        time: 0
      })
    }
  }

  bindClapprEvents ({ eventsMap }: Object): void {
    const {
      attemptPlay,
      playbackLevelsLoaded,
      playbackLevelSet,
      togglePlayPause,
      updateVolume,
      video
    } = this.props
    const { player } = this.state
    if (player) {
      player.on(eventsMap.PLAYER_PLAY, (params): void => {
        if (!player.isPlaying()) {
          this.setState({
            shouldShowStartScreen: true
          })
          return
        }

        togglePlayPause(true)

        this.setState((prevState: State) => {
          if (prevState.shouldShowStartScreen) {
            return { shouldShowStartScreen: false }
          }
        })
      })
      player.on(eventsMap.PLAYER_PAUSE, (): void => {
        togglePlayPause(false)
      })

      player.on(eventsMap.PLAYER_VOLUMEUPDATE, (volume: number): void => {
        updateVolume(volume)
      })

      const playback = player.core && player.core.getCurrentPlayback()
      if (playback && video) {
        playback.on(eventsMap.PLAYBACK_PLAY_INTENT, () => {
          this.setState({
            shouldShowStartScreen: false
          })
          attemptPlay()
        })

        playback.on(eventsMap.PLAYBACK_ENDED, () => {
          this.setState({
            shouldShowStartScreen: true
          })
        })

        playback.on(
          eventsMap.PLAYBACK_TIMEUPDATE,
          ({
            current,
            total
          }: {
            total: number,
            current: number,
            total: number
          }): void => {
            this.props.updateVideoTime({
              id: video.get('id'),
              time: current,
              duration: TimeFormat.fromS(total, 'hh:mm:ss.sss')
            })
          }
        )
        playback.on(
          eventsMap.PLAYBACK_PROGRESS,
          ({ current }: { current: number }): void => {
            this.setState((prevState: State) => {
              if (!prevState.shouldShowStartScreen) {
                return {
                  shouldShowStartScreen: false
                }
              }
            })
            this.props.updateVideoBufferedTime({
              time: current
            })
          }
        )
        playback.on(
          eventsMap.PLAYBACK_LEVELS_AVAILABLE,
          (levels = []): void => {
            playbackLevelsLoaded(
              levels.map((level: Object = {}): Object => ({
                id: level.id,
                label: level.label
              }))
            )
          }
        )
        playback.on(eventsMap.PLAYBACK_LEVEL_SWITCH_START, () => {
          playbackLevelSet(this.stagedPlaybackLevel)
        })
        playback.on(eventsMap.PLAYBACK_LEVEL_SWITCH_END, () => {
          const { isPlaying } = this.props
          if (isPlaying && this.state.player) {
            this.state.player.play()
          }
        })
      }
    }
  }

  onOverlayClick (e: Object): void {
    if (this.state.player) {
      e.stopPropagation()
      this.togglePlayPause()
    }
  }

  toggleShareModal (): void {
    this.setState((prevState: State) => ({
      showShareModal: !prevState.showShareModal
    }))
  }

  onTipButtonClick = (e: Object): void => {
    e.stopPropagation()
    this.setState((prevState: State) => ({
      showTipOverlay: !prevState.showTipOverlay
    }))
  }

  closeTipOverlay = (): void => {
    this.setState({ showTipOverlay: false })
  }

  onMouseEnter = (): void => {
    if (this.state.player) {
      clearTimeout(this.playerHideTimeout)
      this.showControls()
    }
  }

  showControls = (): void => {
    clearTimeout(this.playerHideTimeout)
    this.setState((prevState: State) => {
      if (!prevState.shouldShowVideoOverlay) {
        return {
          shouldShowVideoOverlay: true
        }
      }
    })
    this.playerHideTimeout = setTimeout(() => {
      this.setState((prevState: State) => {
        if (prevState.shouldShowVideoOverlay) {
          return {
            shouldShowVideoOverlay: false
          }
        }
      })
    }, HIDE_CONTROLS_THRESHOLD)
  }

  scrubVideo = (percentage: number): void => {
    const { videoDurationSeconds, video } = this.props
    if (video) {
      if (this.state.player) {
        this.state.player.seek(videoDurationSeconds * percentage / 100)
      }
    }
  }

  changeVolume = (percentage: number): void => {
    const { player } = this.state

    if (player) {
      player.setVolume(percentage)
    }
  }

  toggleMute = (mute: boolean): void => {
    const { player } = this.state

    if (player) {
      if (mute) {
        player.mute()
      } else {
        player.unmute()
      }
    }
  }

  changePlaybackLevel = (levelId: number): void => {
    const { player } = this.state

    this.stagedPlaybackLevel = levelId

    if (player) {
      // $FlowFixMe
      const playback = player.core && player.core.getCurrentPlayback()

      if (playback) {
        playback.currentLevel = levelId
      }
    }
  }

  onMouseMove = debounce(
    (): void => {
      this.lastMouseMove = Date.now()
      this.showControls()
    },
    150,
    { leading: true, trailing: false }
  )

  onMouseLeave = (): void => {
    if (this.state.player) {
      clearTimeout(this.playerHideTimeout)
      this.playerHideTimeout = setTimeout(() => {
        this.setState({
          shouldShowVideoOverlay: false
        })
      })
    }
  }

  maybeHideControls = (): void => {
    this.playerHideTimeout = setTimeout(() => {
      if (Date.now() - this.lastMouseMove > HIDE_CONTROLS_THRESHOLD) {
      }
    }, HIDE_CONTROLS_THRESHOLD + 250)
  }

  getVideoIdFromRequest (): string {
    const params: Object = this.props.match.params
    return params.id || ''
  }

  setFullscreen = (): void => {
    const { setFullscreen } = this.props
    setFullscreen(
      !!document.fullscreenElement ||
        !!document.webkitFullscreenElement ||
        !!document.mozFullScreenElement ||
        // $FlowFixMe
        !!document.msFullscreenElement
    )
  }

  addFullScreenEventListeners () {
    document.addEventListener('fullscreenchange', this.setFullscreen)
    document.addEventListener('mozfullscreenchange', this.setFullscreen)
    document.addEventListener('webkitfullscreenchange', this.setFullscreen)
    document.addEventListener('MSFullscreenChange', this.setFullscreen)
  }

  removeFullScreenEventListeners () {
    document.removeEventListener('fullscreenchange', this.setFullscreen)
    document.removeEventListener('mozfullscreenchange', this.setFullscreen)
    document.removeEventListener('webkitfullscreenchange', this.setFullscreen)
    document.removeEventListener('MSFullscreenChange', this.setFullscreen)
  }

  handleKeyDown = (e: Object): void => {
    const activeElement: ?HTMLElement = document.activeElement

    if (activeElement && activeElement.nodeName === 'INPUT') {
      return
    }

    // Space key
    if (e.keyCode === 32) {
      e.preventDefault()
      this.togglePlayPause()
    }
  }

  addKeyDownEventListeners () {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  removeKeyDownEventListeners () {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  destroyPlayer () {
    if (this.state.player) {
      this.state.player.destroy()
    }

    const playerNode = document.querySelector(`#${PLAYER_ID}`)
    if (playerNode) {
      const parentNode: ?Node = playerNode.parentNode
      if (parentNode) {
        parentNode.removeChild(playerNode)
      }
    }
  }

  componentDidMount (): void {
    const videoId = this.getVideoIdFromRequest()
    if (videoId) {
      if (this.props.video && this.props.video.ipfsHash) {
        this.createPlayer(this.props.video)
      } else {
        this.props.fetchVideo(videoId)
      }
    } else {
      this.setState({ videoNotFound: true })
    }

    this.addFullScreenEventListeners()
    this.addKeyDownEventListeners()
  }

  componentWillUnmount (): void {
    const { playerReset } = this.props
    this.removeFullScreenEventListeners()
    this.removeKeyDownEventListeners()

    this.destroyPlayer()

    playerReset()
  }

  componentWillReceiveProps (nextProps: Props): void {
    const { video, isPlaying } = this.props
    const { video: nextVideo, isPlaying: nextIsPlaying } = nextProps
    if (nextVideo) {
      const fetchStatus = nextVideo.getIn(['fetchStatus', 'name'])
      if (nextProps.video && fetchStatus === 'success') {
        if (
          !video ||
          !this.state.player ||
          video.get('ipfsHash') !== nextVideo.get('ipfsHash')
        ) {
          this.createPlayer(nextProps.video)
        }
      } else if (fetchStatus === 'failed') {
        // If video not exist we set in the component state
        this.setState({ videoNotFound: true })
      }
    }
    if (isPlaying !== nextIsPlaying) {
      this.setState((prevState: State): ?Object => {
        if (prevState.videoHasNeverPlayed) {
          return {
            videoHasNeverPlayed: false
          }
        }
      })
    }
  }

  configureVideoAdapter = (): void => {
    if (this.playerWrapperRef) {
      const videoEl: ?HTMLElement = this.playerWrapperRef.querySelector('video')

      if (videoEl) {
        const adapter = playerjs.HTML5Adapter(videoEl)
        adapter.ready()
      }
    }
  }

  createPlayer = (video: VideoRecord): void => {
    const { updateVolume } = this.props

    if (!video.ipfsHash) {
      throw new Error("Can't create player without ipfsHash")
    }
    let poster = ''
    if (video && video.thumbnails.size === 4) {
      poster = video.thumbnails.get(0)
    }

    import('paratii-mediaplayer').then(CreatePlayer => {
      if (this.state.player && this.state.player.destroy) {
        this.state.player.destroy()
      }

      const autoPlay: boolean = this.getAutoPlaySetting()

      this.setState(
        {
          player: CreatePlayer({
            selector: `#${PLAYER_ID}`,
            source: `https://gateway.paratii.video/ipfs/${
              video.ipfsHash
            }/master.m3u8`,
            poster: `https://gateway.paratii.video/ipfs/${
              video.ipfsHash
            }/${poster}`,
            mimeType: 'application/x-mpegURL',
            ipfsHash: video.ipfsHash,
            autoPlay
          })
        },
        () => {
          if (this.state.player) {
            this.bindClapprEvents({
              eventsMap: this.state.player.clappr.Events
            })
            this.configureVideoAdapter()
          }
        }
      )

      if (this.state.player) {
        updateVolume(this.state.player.getVolume())
      }
    })
  }

  togglePlayPause = (): void => {
    const { player } = this.state
    if (player) {
      if (player.isPlaying()) {
        player.pause()
      } else {
        player.play()
      }
    }
  }

  onPlayerClick = (e: Object): void => {
    clearTimeout(this.playerHideTimeout)
    this.showControls()
  }

  shouldShowVideoOverlay (): boolean {
    const { activePlugin } = this.props
    const { shouldShowVideoOverlay, videoHasNeverPlayed } = this.state
    return shouldShowVideoOverlay || videoHasNeverPlayed || !!activePlugin
  }

  getAutoPlaySetting (): boolean {
    const { isEmbed } = this.props

    const parsedQueryString = queryString.parse(location.search)

    const hasAutoPlayParam: boolean = Object.prototype.hasOwnProperty.call(
      parsedQueryString,
      PLAYER_PARAMS.AUTOPLAY
    )

    if (!hasAutoPlayParam) {
      if (isEmbed) {
        return false
      }
      return true
    }

    const paramValue: string = parsedQueryString[PLAYER_PARAMS.AUTOPLAY]

    if (!paramValue) {
      return true
    }

    const parsedNumberValue: number = parseInt(paramValue, 10)

    if (!isNaN(parsedNumberValue)) {
      return !!parsedNumberValue
    }

    const valueIsFalse: boolean = paramValue.toLowerCase() === 'false'

    return !valueIsFalse
  }

  getFacebookHref () {
    const { video } = this.props
    const appRootUrl = getAppRootUrl(process.env.NODE_ENV)
    if (video) {
      var baseurl = 'https://www.facebook.com/sharer/sharer.php?u='
      return baseurl + appRootUrl + '/play/' + video.id
    }
  }

  getTwitterHref () {
    const { video } = this.props
    const appRootUrl = getAppRootUrl(process.env.NODE_ENV)

    if (video) {
      const baseurl = 'https://twitter.com/intent/tweet'
      const url = '?url=' + appRootUrl + '/play/' + video.id
      const text = '&text=🎬 Worth a watch: ' + video.title
      return baseurl + url + text
    }
  }

  getWhatsAppMobileHref () {
    const { video } = this.props
    const appRootUrl = getAppRootUrl(process.env.NODE_ENV)

    if (video) {
      const baseurl = 'whatsapp://send?text='
      const url = appRootUrl + '/play/' + video.id
      const text = '🎬 Worth a watch: ' + video.title + ' '
      return baseurl + text + url
    }
  }

  getWhatsAppDesktopHref () {
    const { video } = this.props
    const appRootUrl = getAppRootUrl(process.env.NODE_ENV)

    if (video) {
      const baseurl = 'https://web.whatsapp.com/send?text='
      const url = appRootUrl + '/play/' + video.id
      const text = '🎬 Worth a watch: ' + video.title + ' '
      return baseurl + text + url
    }
  }

  getTelegramHref () {
    const { video } = this.props
    const appRootUrl = getAppRootUrl(process.env.NODE_ENV)

    if (video) {
      const baseurl = 'https://t.me/share/url'
      const url = '?url=' + appRootUrl + '/play/' + video.id
      const text = '&text=🎬 Worth a watch: ' + video.title
      return baseurl + url + text
    }
  }

  getVideoName (): string {
    const { video } = this.props

    if (video) {
      return video.title || video.filename
    }

    return ''
  }

  shouldShowStartScreen (): boolean {
    return this.state.shouldShowStartScreen && !!this.state.player
  }

  render () {
    const { isEmbed, video } = this.props

    const shareOptions = [
      {
        href: this.getTelegramHref(),
        icon: 'telegram',
        label: RawTranslatedText({ message: 'player.share.options.telegram' })
      },
      {
        href: this.getTwitterHref(),
        icon: 'twitter',
        label: RawTranslatedText({ message: 'player.share.options.twitter' })
      },
      {
        href: this.getWhatsAppMobileHref(),
        icon: 'whatsapp',
        label: RawTranslatedText({ message: 'player.share.options.whatsapp' })
      }
    ]

    if (this.state.videoNotFound) {
      return <VideoNotFound />
    } else {
      const videoName: string = this.getVideoName()

      return (
        <DocumentTitle title={videoName || APP_TITLE}>
          <Wrapper isEmbed={isEmbed}>
            <VideoWrapper isEmbed={isEmbed}>
              <VideoContainer isEmbed={isEmbed}>
                <PlayerWrapper
                  data-test-id="player-wrapper"
                  onClick={this.onPlayerClick}
                  onMouseEnter={this.onMouseEnter}
                  innerRef={(ref: HTMLElement) => {
                    this.wrapperRef = ref
                  }}
                >
                  <Transition in={this.shouldShowVideoOverlay()} timeout={0}>
                    {(transitionState: ?string) => (
                      <OverlayWrapper
                        onMouseLeave={this.onMouseLeave}
                        onMouseMove={this.onMouseMove}
                      >
                        <VideoOverlayContainer
                          onClick={this.onOverlayClick}
                          video={video}
                          isEmbed={isEmbed}
                          showStartScreen={this.shouldShowStartScreen()}
                          toggleShareModal={this.toggleShareModal}
                          onTipButtonClick={this.onTipButtonClick}
                          showShareModal={this.state.showShareModal}
                          onScrub={this.scrubVideo}
                          onVolumeChange={this.changeVolume}
                          onToggleMute={this.toggleMute}
                          onPlaybackLevelChange={this.changePlaybackLevel}
                          transitionState={transitionState}
                          togglePlayPause={this.togglePlayPause}
                          toggleFullscreen={(goToFullscreen: boolean): void => {
                            if (goToFullscreen && this.wrapperRef) {
                              requestFullscreen(this.wrapperRef)
                            } else {
                              requestCancelFullscreen()
                            }
                          }}
                        />
                      </OverlayWrapper>
                    )}
                  </Transition>
                  <Player
                    datat-test-id={PLAYER_ID}
                    id={PLAYER_ID}
                    innerRef={(ref: HTMLElement) => {
                      this.playerWrapperRef = ref
                    }}
                  />
                  {this.props.video ? (
                    <ShareOverlay
                      show={this.state.showShareModal}
                      onToggle={this.toggleShareModal}
                      portalUrl={getAppRootUrl(process.env.NODE_ENV)}
                      videoId={video && video.id}
                      videoLabelUrl={
                        getAppRootUrl(process.env.NODE_ENV) +
                        '/play/' +
                        ((video && video.id) || '')
                      }
                      shareOptions={shareOptions}
                    />
                  ) : null}
                  {this.props.userIsTipping && this.props.video ? (
                    <TipOverlayWrapper>
                      <TipOverlayContainer />
                    </TipOverlayWrapper>
                  ) : null}
                </PlayerWrapper>
              </VideoContainer>
            </VideoWrapper>
            {!isEmbed &&
              video && (
              <PlayWrapper>
                <PlayMainWrapper>
                  <Card>
                    {videoName && <Title accent>{videoName}</Title>}
                    {video.author && <Text>By {video.author}</Text>}
                    {video.share && (
                      <VideoInfoButtons>
                        <TextButton iconButton margin="0 20px 0 0">
                          <SVGIcon
                            width="20px"
                            height="20px"
                            margin="0 5px 0 0"
                            icon="icon-play-view"
                          />
                          <Text small>
                            <TranslatedText message="player.views.zero" />
                          </Text>
                        </TextButton>
                        <TextButton iconButton margin="0 20px 0 0">
                          <SVGIcon
                            width="20px"
                            height="20px"
                            margin="0 5px 0 0"
                            icon="icon-play-like"
                          />
                          <Text small>
                            <TranslatedText message="player.views.zero" />
                          </Text>
                        </TextButton>
                        <TextButton iconButton>
                          <SVGIcon
                            width="20px"
                            height="20px"
                            margin="0 5px 0 0"
                            icon="icon-play-dislike"
                          />
                          <Text small>
                            <TranslatedText message="player.views.zero" />
                          </Text>
                        </TextButton>
                      </VideoInfoButtons>
                    )}
                    <Text>
                        Price{' '}
                      <Span highlight>
                        {video.free ? (
                          <TranslatedText message="player.free" />
                        ) : (
                          <TranslatedText message="player.free" />
                        )}
                      </Span>
                    </Text>
                    {video.description && (
                      <DescriptionWrapper>
                        <Text>{video.description}</Text>
                      </DescriptionWrapper>
                    )}
                  </Card>
                </PlayMainWrapper>
                <PlaySidebarWrapper>
                  <SidebarTCR video={video} videoId={video && video.id} />
                </PlaySidebarWrapper>
              </PlayWrapper>
            )}
          </Wrapper>
        </DocumentTitle>
      )
    }
  }
}

export default Play
