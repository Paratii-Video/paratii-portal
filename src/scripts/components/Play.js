/* @flow */

import React, { Component } from 'react'
import { Events } from 'clappr'
import styled from 'styled-components'
import debounce from 'lodash.debounce'
import Transition from 'react-transition-group/Transition'
import TimeFormat from 'hh-mm-ss'

import VideoRecord from 'records/VideoRecords'
import VideoOverlay from 'components/VideoOverlay'
import Button from 'components/foundations/Button'
import Title from 'components/foundations/Title'
import Card from 'components/structures/Card'
import NotFound from './pages/NotFound'
import { requestFullscreen, requestCancelFullscreen } from 'utils/AppUtils'

import type { ClapprPlayer } from 'types/ApplicationTypes'
import type { Match } from 'react-router-dom'
import mux from 'mux-embed'

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
  isAttemptingPlay: boolean,
  attemptPlay: () => void,
  video?: VideoRecord,
  videoDurationSeconds: number,
  isEmbed?: boolean,
  currentTimeSeconds: number,
  currentBufferedTimeSeconds: number
}

type State = {
  isEmbed: boolean,
  mouseInOverlay: boolean,
  shouldShowVideoOverlay: boolean,
  videoNotFound: boolean,
  showShareModal: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: ${props => (props.isEmbed ? '100%' : '1280px')};

  @media (max-width: 1440px) {
    width: ${props => (props.isEmbed ? null : '1024px')};
  }

  @media (max-width: 1200px) {
    width: ${props => (props.isEmbed ? null : '768px')};
  }

  @media (max-width: 930px) {
    width: 100%;
  }
`

const VideoWrapper = styled.div`
  margin: ${props => (props.isEmbed ? null : '0 auto 25px')};
  position: relative;
  height: ${props => (props.isEmbed ? '100%' : '720px')};
  width: 100%;

  @media (max-width: 1440px) {
    height: ${props => (props.isEmbed ? null : '576px')};
  }

  @media (max-width: 1200px) {
    height: ${props => (props.isEmbed ? null : '432px')};
  }

  @media (max-width: 930px) {
    height: ${props => (props.isEmbed ? '100%' : '0')};
    margin: ${props => (props.isEmbed ? null : '0 0 25px')};
    padding-bottom: ${props => (props.isEmbed ? null : '56.25%')};
    padding-top: ${props => (props.isEmbed ? null : '30px')};
  }
`

const PlayerWrapper = styled.div`
  background-color: ${props => props.theme.colors.VideoPlayer.background};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const Player = styled.div`
  width: 100%;
  height: 100%;
  z-index: 5;
`

const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  cursor: pointer;
`

const ShareOverlay = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.Modal.background};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: ${props => (props.show ? 1 : 0)};
  position: absolute;
  pointer-events: ${props => (!props.show ? 'none' : null)};
  transition: opacity ${props => props.theme.animation.time.repaint};
  top: 0;
  width: 100%;
  z-index: 15;
`

const CloseButton = Button.extend`
  height: 20px;
  position: absolute;
  right: 30px;
  top: 27px;
  width: 20px;
  z-index: 3;
`

const SVGButton = styled.svg`
  fill: ${props => props.theme.colors.VideoPlayer.header.icons};
  display: block;
  height: 100%;
  width: 100%;
`

const ShareTitle = Title.extend`
  font-size: ${props => props.theme.fonts.video.share.title};
  margin-bottom: 20px;
`

const Anchor = Button.withComponent('a')

const AnchorLink = Anchor.extend`
  font-size: ${props => props.theme.fonts.video.share.link};
  padding: 0 10%;
  text-align: center;
  width: 100%;
  word-wrap: break-word;
`

const ShareButtons = styled.div`
  display: flex;
  margin-top: 20px;
`

const ShareLink = Anchor.extend`
  height: 30px;
  margin: 0 5px;
  width: 30px;
`

const ShareLinkIcon = styled.img`
  display: block;
  height: 100%;
  width: 100%;
`

const DescriptionWrapper = styled(Card)`
  width: 100%;
`

const HIDE_CONTROLS_THRESHOLD: number = 2000

class Play extends Component<Props, State> {
  player: ?ClapprPlayer
  onOverlayClick: () => void
  toggleShareModal: () => void
  lastMouseMove: number
  playerHideTimeout: number
  wrapperRef: ?HTMLElement

  constructor (props: Props) {
    super(props)

    this.state = {
      mouseInOverlay: false,
      shouldShowVideoOverlay: false,
      videoNotFound: false,
      playerCreated: '',
      isEmbed: this.props.isEmbed || false,
      showShareModal: false
    }

    this.lastMouseMove = 0
    this.playerHideTimeout = 0

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

  bindClapprEvents (): void {
    const { attemptPlay, togglePlayPause, updateVolume, video } = this.props
    const { player } = this
    if (player) {
      player.on(Events.PLAYER_PLAY, (): void => {
        togglePlayPause(true)
      })
      player.on(Events.PLAYER_PAUSE, (): void => {
        togglePlayPause(false)
      })
      player.on(Events.PLAYER_VOLUMEUPDATE, (volume: number): void => {
        updateVolume(volume)
      })
      const playback = player.core && player.core.getCurrentPlayback()
      if (playback && video) {
        playback.on(Events.PLAYBACK_PLAY_INTENT, attemptPlay)
        playback.on(
          Events.PLAYBACK_TIMEUPDATE,
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
          Events.PLAYBACK_PROGRESS,
          ({ current }: { current: number }): void => {
            this.props.updateVideoBufferedTime({
              time: current
            })
          }
        )
      }
    }
  }

  onOverlayClick (e: Object): void {
    if (this.player) {
      e.stopPropagation()
      this.togglePlayPause()
    }
  }

  toggleShareModal (): void {
    this.setState({
      showShareModal: !this.state.showShareModal
    })
  }

  onMouseEnter = (): void => {
    if (this.player) {
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
      if (this.player) {
        this.player.seek(videoDurationSeconds * percentage / 100)
      }
    }
  }

  changeVolume = (percentage: number): void => {
    const { player } = this

    if (player) {
      player.setVolume(percentage)
    }
  }

  toggleMute = (mute: boolean): void => {
    const { player } = this

    if (player) {
      if (mute) {
        player.mute()
      } else {
        player.unmute()
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
    if (this.player) {
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
      this.togglePlayPause()
    }
  }

  addKeyDownEventListeners () {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  removeKeyDownEventListeners () {
    window.removeEventListener('keydown', this.handleKeyDown)
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
    this.removeFullScreenEventListeners()
    this.removeKeyDownEventListeners()

    if (this.player) {
      this.player.destroy()
    }

    this.props.setSelectedVideo('')
  }

  componentWillReceiveProps (nextProps: Props): void {
    const { video } = this.props
    const { video: nextVideo } = nextProps
    if (nextVideo) {
      const fetchStatus = nextVideo.getIn(['fetchStatus', 'name'])
      if (nextProps.video && fetchStatus === 'success') {
        if (
          !video ||
          !this.player ||
          video.get('ipfsHash') !== nextVideo.get('ipfsHash')
        ) {
          this.createPlayer(nextProps.video)
        }
      } else if (fetchStatus === 'failed') {
        // If video not exist we set in the component state
        this.setState({ videoNotFound: true })
      }
    }
  }

  createPlayer = (video: VideoRecord): void => {
    const { updateVolume } = this.props
    if (this.player && this.player.destroy) {
      this.player.destroy()
    }
    if (!video.ipfsHash) {
      throw new Error("Can't create player without ipfsHash")
    }
    let poster = ''
    if (video && video.thumbnails.size === 4) {
      poster = video.thumbnails.get(0)
    }
    import('paratii-mediaplayer').then(CreatePlayer => {
      this.player = CreatePlayer({
        selector: '#player',
        source: `https://gateway.paratii.video/ipfs/${
          video.ipfsHash
        }/master.m3u8`,
        poster: `https://gateway.paratii.video/ipfs/${
          video.ipfsHash
        }/${poster}`,
        mimeType: 'application/x-mpegURL',
        ipfsHash: video.ipfsHash,
        autoPlay: true
      })
      this.bindClapprEvents()

      if (this.player) {
        updateVolume(this.player.getVolume())
      }

      // initialize mux here
      // Note to frontend ppl. if there is a better locations for this
      // feel free to change it.
      mux.monitor('#player video', {
        debug: true,
        data: {
          property_key: 'le7n9kbqk3qugqbo03pinsatl', // required (DEV KEY)

          // Metadata
          player_name: 'Paratii Player', // ex: 'My Main Player'
          player_init_time: new Date(),

          video_id: video.id,
          video_title: video.title,
          video_duration: video.duration,
          video_variant_id: video.ipfsHash
        }
      })
    })
  }

  togglePlayPause = (): void => {
    const { player } = this
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
    return this.state.mouseInOverlay
  }

  getPortalUrl () {
    // FIXME: do not hardcode this here
    return 'https://portal.paratii.video'
  }
  getFacebookHref () {
    const { video } = this.props
    if (video) {
      var baseurl = 'https://www.facebook.com/sharer/sharer.php?u='
      return baseurl + this.getPortalUrl() + '/play/' + video.id
    }
  }
  getTwitterHref () {
    const { video } = this.props
    if (video) {
      const baseurl = 'https://twitter.com/intent/tweet'
      const url = '?url=' + this.getPortalUrl() + '/play/' + video.id
      const text = '&text=🎬 Worth a watch: ' + video.title
      return baseurl + url + text
    }
  }
  getWhatsAppMobileHref () {
    const { video } = this.props
    if (video) {
      const baseurl = 'whatsapp://send?text='
      const url = this.getPortalUrl() + '/play/' + video.id
      const text = '🎬 Worth a watch: ' + video.title + ' '
      return baseurl + text + url
    }
  }
  getWhatsAppDesktopHref () {
    const { video } = this.props
    if (video) {
      const baseurl = 'https://web.whatsapp.com/send?text='
      const url = this.getPortalUrl() + '/play/' + video.id
      const text = '🎬 Worth a watch: ' + video.title + ' '
      return baseurl + text + url
    }
  }
  getTelegramHref () {
    const { video } = this.props
    if (video) {
      const baseurl = 'https://t.me/share/url'
      const url = '?url=' + this.getPortalUrl() + '/play/' + video.id
      const text = '&text=🎬 Worth a watch: ' + video.title
      return baseurl + url + text
    }
  }
  render () {
    const { isEmbed, video } = this.props
    if (this.state.videoNotFound) {
      return <NotFound />
    } else {
      return (
        <Wrapper isEmbed={isEmbed}>
          <VideoWrapper isEmbed={isEmbed}>
            <PlayerWrapper
              onClick={this.onPlayerClick}
              onMouseEnter={this.onMouseEnter}
              innerRef={(ref: HTMLElement) => {
                this.wrapperRef = ref
              }}
            >
              <Transition in={this.state.shouldShowVideoOverlay} timeout={0}>
                {(transitionState: ?string) => (
                  <OverlayWrapper
                    onMouseLeave={this.onMouseLeave}
                    onMouseMove={this.onMouseMove}
                  >
                    <VideoOverlay
                      onClick={this.onOverlayClick}
                      video={video}
                      isEmbed={isEmbed}
                      toggleShareModal={this.toggleShareModal}
                      showShareModal={this.state.showShareModal}
                      onScrub={this.scrubVideo}
                      onVolumeChange={this.changeVolume}
                      onToggleMute={this.toggleMute}
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
              <Player id="player" />
              {this.props.video ? (
                <ShareOverlay show={this.state.showShareModal}>
                  <CloseButton onClick={this.toggleShareModal}>
                    <SVGButton>
                      <use xlinkHref="#icon-close" />
                    </SVGButton>
                  </CloseButton>
                  <ShareTitle small />
                  <AnchorLink
                    href={
                      this.getPortalUrl() +
                      '/play/' +
                      ((video && video.id) || '')
                    }
                    target="_blank"
                    anchor
                    white
                  >
                    {this.getPortalUrl() +
                      '/play/' +
                      ((video && video.id) || '')}
                  </AnchorLink>
                  <ShareButtons>
                    <ShareLink
                      href={this.getTelegramHref()}
                      target="_blank"
                      anchor
                    >
                      <ShareLinkIcon src="/assets/svg/icons-share-telegram.svg" />
                    </ShareLink>
                    <ShareLink
                      href={this.getTwitterHref()}
                      target="_blank"
                      anchor
                    >
                      <ShareLinkIcon src="/assets/svg/icons-share-twitter.svg" />
                    </ShareLink>
                    <ShareLink
                      href={this.getWhatsAppMobileHref()}
                      target="_blank"
                      anchor
                    >
                      <ShareLinkIcon src="/assets/svg/icons-share-whatsapp.svg" />
                    </ShareLink>
                  </ShareButtons>
                </ShareOverlay>
              ) : null}
            </PlayerWrapper>
          </VideoWrapper>
          {!isEmbed && <DescriptionWrapper />}
        </Wrapper>
      )
    }
  }
}

export default Play
