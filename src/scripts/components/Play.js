/* @flow */

import React, { Component } from 'react'
import { Events } from 'clappr'
import styled from 'styled-components'
import CreatePlayer from 'paratii-mediaplayer'
import VideoRecord from 'records/VideoRecords'

import VideoOverlay from 'components/VideoOverlay'

import type { ClapprPlayer } from 'types/ApplicationTypes'
import type { Match } from 'react-router-dom'

type Props = {
  match: Match,
  setSelectedVideo: ({ id: string }) => void,
  fetchVideo: (id: string) => void,
  isPlaying: boolean,
  togglePlayPause: (play: boolean) => void,
  isAttemptingPlay: boolean,
  attemptPlay: () => void,
  video: ?VideoRecord,
  isEmbed?: boolean
}

type State = {
  mouseInOverlay: boolean
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
  z-index: 10;
  cursor: pointer;
`

class Play extends Component<Props, State> {
  player: ClapprPlayer
  onOverlayClick: () => void
  lastMouseMove: number
  playerHideTimeout: number

  constructor (props: Props) {
    super(props)

    this.state = {
      mouseInOverlay: false
    }

    this.lastMouseMove = 0
    this.playerHideTimeout = 0

    this.onOverlayClick = this.onOverlayClick.bind(this)

    this.props.setSelectedVideo({ id: this.getVideoId() })
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
    const { attemptPlay } = this.props

    attemptPlay()
  }

  onOverlayMouseEnter = (): void => {
    if (this.player) {
      this.player.core.mediaControl.show()
      this.player.core.mediaControl.setUserKeepVisible()
    }
  }

  onMouseMove = (): void => {
    this.lastMouseMove = Date.now()
    clearTimeout(this.playerHideTimeout)
    this.maybeHideControls()
  }

  onOverlayMouseLeave = (): void => {
    if (this.player) {
      this.player.core.mediaControl.resetUserKeepVisible()
      this.player.core.mediaControl.hide()
      clearTimeout(this.playerHideTimeout)
    }
  }

  maybeHideControls = (): void => {
    this.playerHideTimeout = setTimeout(() => {
      if (Date.now() - this.lastMouseMove > 2000) {
        this.player.core.mediaControl.resetUserKeepVisible()
        this.player.core.mediaControl.hide()
      }
    }, 2250)
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
    const { isAttemptingPlay } = this.props
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
      nextProps.isAttemptingPlay &&
      nextProps.isAttemptingPlay !== isAttemptingPlay
    ) {
      if (this.player) {
        this.player.play()
      }
    }
  }

  createPlayer (ipfsHash: string): void {
    this.player = CreatePlayer({
      selector: '#player',
      source: `https://gateway.paratii.video/ipfs/${ipfsHash}/master.m3u8`,
      mimeType: 'video/mp4',
      ipfsHash: ipfsHash
    })
    this.bindClapprEvents()
  }

  shouldShowVideoOverlay (): boolean {
    return this.state.mouseInOverlay
  }

  render () {
    return (
      <Wrapper>
        <PlayerWrapper>
          {this.shouldShowVideoOverlay() && (
            <OverlayWrapper
              onMouseMove={this.onMouseMove}
              onMouseEnter={this.onOverlayMouseEnter}
              onMouseLeave={this.onOverlayMouseLeave}
            >
              <VideoOverlay {...this.props} onClick={this.onOverlayClick} />
            </OverlayWrapper>
          )}
          <Player id="player" />
        </PlayerWrapper>
      </Wrapper>
    )
  }
}

export default Play
