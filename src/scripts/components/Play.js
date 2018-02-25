/* @flow */

import React, { Component } from 'react'
import { Events } from 'clappr'
import styled from 'styled-components'
import CreatePlayer from 'paratii-mediaplayer'
import debounce from 'lodash.debounce'

import VideoRecord from 'records/VideoRecords'
import VideoOverlay from 'components/VideoOverlay'
import Button from 'components/foundations/Button'
import Title from 'components/foundations/Title'
import NotFound from './pages/NotFound'

import type { ClapprPlayer } from 'types/ApplicationTypes'
import type { Match } from 'react-router-dom'

type Props = {
  match: Match,
  setSelectedVideo: (id: string) => void,
  fetchVideo: (id: string) => void,
  isPlaying: boolean,
  togglePlayPause: (play: ?boolean) => void,
  isAttemptingPlay: boolean,
  attemptPlay: () => void,
  video: VideoRecord,
  isEmbed?: boolean
}

type State = {
  mouseInOverlay: boolean,
  videoNotFound: boolean,
  showShareModal: boolean,
  playerCreated: string
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 100%;
`

const Player = styled.div`
  width: 100%;
  height: 100%;
`

const PlayerWrapper = styled.div`
  flex: 0 0 100%;
  width: 100%;
  position: relative;
`

const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 50px);
  z-index: 5;
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
  z-index: 10;
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

const HIDE_CONTROLS_THRESHOLD: number = 2000

class Play extends Component<Props, State> {
  player: ClapprPlayer
  onOverlayClick: () => void
  toggleShareModal: () => void
  lastMouseMove: number
  playerHideTimeout: number

  constructor (props: Props) {
    super(props)

    this.state = {
      mouseInOverlay: false,
      videoNotFound: false,
      showShareModal: false,
      playerCreated: ''
    }

    this.lastMouseMove = 0
    this.playerHideTimeout = 0

    this.onOverlayClick = this.onOverlayClick.bind(this)
    this.toggleShareModal = this.toggleShareModal.bind(this)

    this.props.setSelectedVideo(this.getVideoIdFromRequest())
  }

  bindClapprEvents (): void {
    const { attemptPlay, togglePlayPause } = this.props
    if (this.player) {
      this.player.on(Events.PLAYER_PLAY, () => {
        togglePlayPause(true)
        this.maybeHideControls()
      })
      this.player.on(Events.PLAYER_PAUSE, () => {
        togglePlayPause(false)
      })
      const playback = this.player.core.getCurrentPlayback()
      if (playback) {
        playback.on(Events.PLAYBACK_PLAY_INTENT, attemptPlay)
      }

      const container = this.player.core.getCurrentContainer()
      if (container) {
        container.on(Events.CONTAINER_MEDIACONTROL_HIDE, () => {
          this.setState((prevState: State) => {
            if (prevState.mouseInOverlay) {
              return {
                mouseInOverlay: false
              }
            }
            return {}
          })
        })
        container.on(Events.CONTAINER_MEDIACONTROL_SHOW, () => {
          this.setState((prevState: State) => {
            if (!prevState.mouseInOverlay) {
              return {
                mouseInOverlay: true
              }
            }
            return {}
          })
        })
      }
    }
  }

  onOverlayClick (): void {
    if (this.player) {
      if (this.player.isPlaying()) {
        this.player.pause()
      } else {
        this.player.play()
      }
    }
  }

  toggleShareModal (): void {
    this.setState({
      showShareModal: !this.state.showShareModal
    })
  }

  onOverlayMouseEnter = (): void => {
    if (this.player) {
      this.player.core.mediaControl.show()
      this.player.core.mediaControl.setUserKeepVisible()
    }
  }

  onMouseMove = debounce(
    (): void => {
      this.lastMouseMove = Date.now()
      clearTimeout(this.playerHideTimeout)
      this.maybeHideControls()
    },
    150,
    { leading: true }
  )

  onOverlayMouseLeave = (): void => {
    if (this.player) {
      this.player.core.mediaControl.resetUserKeepVisible()
      this.player.core.mediaControl.hide()
      clearTimeout(this.playerHideTimeout)
    }
  }

  maybeHideControls = (): void => {
    this.playerHideTimeout = setTimeout(() => {
      if (Date.now() - this.lastMouseMove > HIDE_CONTROLS_THRESHOLD) {
        this.player.core.mediaControl.resetUserKeepVisible()
        this.player.core.mediaControl.hide()
      }
    }, HIDE_CONTROLS_THRESHOLD + 250)
  }

  getVideoIdFromRequest (): string {
    const params: Object = this.props.match.params
    return params.id || ''
  }

  componentDidMount (): void {
    const videoId = this.getVideoIdFromRequest()
    if (videoId) {
      if (this.props.video && this.props.video.ipfsHash) {
        this.createPlayer(this.props.video.ipfsHash)
      } else {
        this.props.fetchVideo(videoId)
      }
    } else {
      this.setState({ videoNotFound: true })
    }
  }

  componentWillReceiveProps (nextProps: Props): void {
    const { isAttemptingPlay } = this.props
    if (nextProps.video) {
      // ?? why the next lines?
      const fetchStatus = nextProps.video.getIn(['fetchStatus', 'name'])
      if (nextProps.video && fetchStatus === 'success') {
        if (this.state.playerCreated !== nextProps.video.ipfsHash) {
          this.createPlayer(nextProps.video.ipfsHash)
        }
      } else if (fetchStatus === 'failed') {
        // If video not exist we set in the component state
        this.setState({ videoNotFound: true })
      }
    }

    if (
      nextProps.isAttemptingPlay &&
      nextProps.isAttemptingPlay !== isAttemptingPlay
    ) {
      if (this.player) {
        this.player.play()
      }
    }
  }

  createPlayer (ipfsHash: string): void {
    this.setState({ playerCreated: ipfsHash })
    if (this.player && this.player.remove) {
      this.player.remove()
    }
    if (!ipfsHash) {
      throw new Error("Can't create player without ipfsHash")
    }
    this.player = CreatePlayer({
      selector: '#player',
      source: `https://gateway.paratii.video/ipfs/${ipfsHash}/master.m3u8`,
      mimeType: 'video/mp4',
      ipfsHash: ipfsHash,
      autoPlay: true
    })
    this.player.play()
    this.bindClapprEvents()
    this.player.play()
  }

  shouldShowVideoOverlay (): boolean {
    return true // this.state.mouseInOverlay
  }

  portalUrl () {
    // FIXME: do not hardcode this heres
    return 'https://portal.paratii.video'
  }
  facebook () {
    if (this.props.video) {
      var baseurl = 'https://www.facebook.com/sharer/sharer.php?u='
      return baseurl + this.portalUrl() + '/embed/' + this.props.video.id
    }
  }
  twitter () {
    if (this.props.video) {
      var baseurl = 'https://twitter.com/intent/tweet'
      var url = '?url=' + this.portalUrl() + '/embed/' + this.props.video.id
      var text = '&text=🎬 Worth a watch: ' + this.props.video.title
      return baseurl + url + text
    }
  }
  whatsapp () {
    if (this.props.video) {
      var baseurl = 'whatsapp://send?text='
      var url = this.portalUrl() + '/embed/' + this.props.video.id
      var text = '🎬 Worth a watch: ' + this.props.video.title + ' '
      return baseurl + text + url
    }
  }
  whatsappDesktop () {
    if (this.props.video) {
      var baseurl = 'https://web.whatsapp.com/send?text='
      var url = this.portalUrl() + '/embed/' + this.props.video.id
      var text = '🎬 Worth a watch: ' + this.props.video.title + ' '
      return baseurl + text + url
    }
  }
  telegram () {
    if (this.props.video) {
      var baseurl = 'https://t.me/share/url'
      var url = '?url=' + this.portalUrl() + '/embed/' + this.props.video.id
      var text = '&text=🎬 Worth a watch: ' + this.props.video.title
      return baseurl + url + text
    }
  }

  render () {
    // If video not exist it is set in the component state
    if (this.state.videoNotFound === true) {
      return (
        <Wrapper>
          did not find a video
          <NotFound />
        </Wrapper>
      )
    } else {
      return (
        <Wrapper>
          <PlayerWrapper>
            {this.shouldShowVideoOverlay() && (
              <OverlayWrapper
                onMouseMove={this.onMouseMove}
                onMouseEnter={this.onOverlayMouseEnter}
                onMouseLeave={this.onOverlayMouseLeave}
              >
                <VideoOverlay
                  {...this.props}
                  onClick={this.onOverlayClick}
                  toggleShareModal={this.toggleShareModal}
                  showShareModal={this.state.showShareModal}
                />
              </OverlayWrapper>
            )}
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
                  href={this.portalUrl() + '/play/' + this.props.video.id}
                  target="_blank"
                  anchor
                  white
                >
                  {this.portalUrl() + '/play/' + this.props.video.id}
                </AnchorLink>
                <ShareButtons>
                  <ShareLink href={this.telegram()} target="_blank" anchor>
                    <ShareLinkIcon src="/assets/assets/svg/icons-share-telegram.svg" />
                  </ShareLink>
                  <ShareLink href={this.twitter()} target="_blank" anchor>
                    <ShareLinkIcon src="/assets/assets/svg/icons-share-twitter.svg" />
                  </ShareLink>
                  <ShareLink href={this.whatsapp()} target="_blank" anchor>
                    <ShareLinkIcon src="/assets/assets/svg/icons-share-whatsapp.svg" />
                  </ShareLink>
                </ShareButtons>
              </ShareOverlay>
            ) : (
              ''
            )}
          </PlayerWrapper>
        </Wrapper>
      )
    }
  }
}

export default Play
