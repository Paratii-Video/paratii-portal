/* @flow */

import React, { Component } from 'react'
import { Events } from 'clappr'
import styled from 'styled-components'
import CreatePlayer from 'paratii-mediaplayer'
import debounce from 'lodash.debounce'

import VideoRecord from 'records/VideoRecords'
import VideoOverlay from 'components/VideoOverlay'

import type { ClapprPlayer } from 'types/ApplicationTypes'
import type { Match } from 'react-router-dom'

type Props = {
  match: Match,
  setSelectedVideo: ({ id: string }) => void,
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
  shouldShowVideoOverlay: boolean
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
  pointer-events: none;
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
      shouldShowVideoOverlay: false
    }

    this.lastMouseMove = 0
    this.playerHideTimeout = 0

    // this.onOverlayClick = this.onOverlayClick.bind(this)

    this.props.setSelectedVideo({ id: this.getVideoId() })
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
      this.setState({
        shouldShowVideoOverlay: true
      })
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
    }, 2000)
  }

  onMouseMove = debounce(
    (): void => {
      this.lastMouseMove = Date.now()
      this.showControls()
    },
    150,
    { leading: true }
  )

  onMouseLeave = (): void => {
    if (this.player) {
      clearTimeout(this.playerHideTimeout)
      console.log('leaving hiding')
      this.playerHideTimeout = setTimeout(() => {
        this.setState({
          shouldShowVideoOverlay: false
        })
      }, 500)
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
      throw Error('We should raise a 404 error here')
    }
  }

  componentWillReceiveProps (nextProps: Props): void {
    const { isPlaying } = this.props
    let ipfsHash = ''
    if (nextProps.video) {
      if (
        this.props.video == null ||
        nextProps.video.ipfsHash !== this.props.video.ipfsHash
      ) {
        ipfsHash = nextProps.video.ipfsHash
        this.createPlayer(ipfsHash)
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

  shouldShowVideoOverlay (): boolean {
    return this.state.mouseInOverlay
  }

  render () {
    return (
      <Wrapper>
        <PlayerWrapper
          onClick={this.onPlayerClick}
          onMouseEnter={this.onMouseEnter}
          onMouseMove={
            (!this.state.shouldShowVideoOverlay && this.onMouseMove) ||
            undefined
          }
        >
          {this.state.shouldShowVideoOverlay && (
            <OverlayWrapper
              onMouseLeave={this.onMouseLeave}
              onMouseMove={this.onMouseMove}
            >
              <VideoOverlay
                {...this.props}
                togglePlayPause={this.togglePlayPause}
              />
            </OverlayWrapper>
          )}
          <Player id="player" />
        </PlayerWrapper>
      </Wrapper>
    )
  }
}

export default Play
