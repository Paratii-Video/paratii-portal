/* @flow */

import React, { Component } from 'react'
import { Events } from 'clappr'
import styled from 'styled-components'
import CreatePlayer from 'paratii-mediaplayer'
import debounce from 'lodash.debounce'
import Transition from 'react-transition-group/Transition'

import VideoRecord from 'records/VideoRecords'
import VideoOverlay from 'components/VideoOverlay'
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
  video: ?VideoRecord,
  isEmbed?: boolean
}

type State = {
  mouseInOverlay: boolean,
  shouldShowVideoOverlay: boolean,
  videoNotFound: boolean
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 100%;
  overflow: hidden;
`

const Player = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  align-items: center;
`

const PlayerWrapper = styled.div`
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  position: relative;
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

const HIDE_CONTROLS_THRESHOLD: number = 2000

class Play extends Component<Props, State> {
  player: ClapprPlayer
  onOverlayClick: () => void
  lastMouseMove: number
  playerHideTimeout: number

  constructor (props: Props) {
    super(props)

    this.state = {
      mouseInOverlay: false,
      shouldShowVideoOverlay: false,
      videoNotFound: false
    }

    this.lastMouseMove = 0
    this.playerHideTimeout = 0

    this.onOverlayClick = this.onOverlayClick.bind(this)

    this.props.setSelectedVideo(this.getVideoId())
  }

  bindClapprEvents (): void {
    const { attemptPlay, togglePlayPause } = this.props
    if (this.player) {
      this.player.on(Events.PLAYER_PLAY, () => {
        togglePlayPause(true)
      })
      this.player.on(Events.PLAYER_PAUSE, () => {
        togglePlayPause(false)
      })
      const playback = this.player.core.getCurrentPlayback()
      if (playback) {
        playback.on(Events.PLAYBACK_PLAY_INTENT, attemptPlay)
      }
    }
  }

  onOverlayClick (): void {
    if (this.player) {
      this.togglePlayPause()
    }
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

  getVideoId (): string {
    const params: Object = this.props.match.params
    return params.id || ''
  }

  componentDidMount (): void {
    const videoId = this.getVideoId()
    if (videoId) {
      if (this.props.video) {
        this.createPlayer(this.props.video.ipfsHash)
      } else {
        this.props.fetchVideo(videoId)
      }
    } else {
      // If video not exist we set in the component state
      this.setState({ videoNotFound: true })
      throw Error('We should raise a 404 error here')
    }
  }

  componentWillReceiveProps (nextProps: Props): void {
    const { isPlaying } = this.props
    let ipfsHash = ''
    if (nextProps.video) {
      const fetchStatus = nextProps.video.getIn(['fetchStatus', 'name'])
      if (nextProps.video && fetchStatus === 'success') {
        if (
          this.props.video == null ||
          nextProps.video.ipfsHash !== this.props.video.ipfsHash
        ) {
          ipfsHash = nextProps.video.ipfsHash
          this.createPlayer(ipfsHash)
        }
      } else if (fetchStatus === 'failed') {
        // If video not exist we set in the component state
        this.setState({ videoNotFound: true })
      }
    }

    if (
      this.player &&
      nextProps.isPlaying &&
      nextProps.isPlaying !== isPlaying &&
      nextProps.isPlaying !== this.player.isPlaying()
    ) {
      this.player.play()
    }
  }

  createPlayer (ipfsHash: string): void {
    this.player = CreatePlayer({
      selector: '#player',
      source: `https://gateway.paratii.video/ipfs/${ipfsHash}/master.m3u8`,
      mimeType: 'video/mp4',
      ipfsHash: ipfsHash,
      autoPlay: true
    })
    this.bindClapprEvents()
  }

  togglePlayPause = (): void => {
    if (this.player) {
      if (this.player.isPlaying()) {
        this.player.pause()
      } else {
        this.player.play()
      }
    }
  }

  onPlayerClick = (e: Object): void => {
    clearTimeout(this.playerHideTimeout)
    this.togglePlayPause()
    this.showControls()
  }

  render () {
    if (this.state.videoNotFound) {
      return <NotFound />
    } else {
      return (
        <Wrapper>
          <PlayerWrapper
            onClick={this.onPlayerClick}
            onMouseEnter={this.onMouseEnter}
          >
            <Transition in={this.state.shouldShowVideoOverlay} timeout={0}>
              {(transitionState: ?string) => (
                <OverlayWrapper
                  onMouseLeave={this.onMouseLeave}
                  onMouseMove={this.onMouseMove}
                >
                  <VideoOverlay
                    {...this.props}
                    transitionState={transitionState}
                    togglePlayPause={this.togglePlayPause}
                  />
                </OverlayWrapper>
              )}
            </Transition>
            <Player id="player" />
          </PlayerWrapper>
        </Wrapper>
      )
    }
  }
}

export default Play
