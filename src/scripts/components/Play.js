/* @flow */

import React, { Component } from 'react'
import { Events } from 'clappr'
import styled from 'styled-components'
import CreatePlayer from 'paratii-mediaplayer'
import VideoRecord from 'records/VideoRecords'

import VideoOverlay from 'components/VideoOverlay'

import type { RouteMatch, ClapprPlayer } from 'types/ApplicationTypes'

type Props = {
  match: RouteMatch,
  setSelectedVideo: ({ id: string }) => void,
  fetchVideo: (id: string) => void,
  isPlaying: boolean,
  togglePlayPause: (play: boolean) => void,
  isAttemptingPlay: boolean,
  attemptPlay: () => void,
  video: ?VideoRecord
}

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Wrapper = styled.div`
  font-size: 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 0 1 75%;
  width: 75%;
  max-height: 450px;
`

const Title = styled.header`
  display: none;
  background-color: #fff;
  padding: 20px;
  align-items: center;
  color: blue;
  flex: 0 0 50px;
  width: 100%;
  text-align: left;
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
  height: 100%;
  z-index: 10;
  cursor: pointer;
`

class Play extends Component<Props, void> {
  player: ClapprPlayer
  onOverlayClick: () => void

  constructor (props: Props) {
    super(props)

    this.onOverlayClick = this.onOverlayClick.bind(this)

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
    const { attemptPlay } = this.props

    attemptPlay()
  }

  getVideoId (): string {
    const params: Object = this.props.match.params

    return params.id || ''
  }

  componentDidMount (): void {
    const videoId = this.getVideoId()
    console.log('componentDidMount')
    console.log(this.props.video)
    if (videoId) {
      this.props.fetchVideo(videoId)
    } else {
      throw Error('We should raise a 404 error here and redirect to the player')
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
        console.log('- - - CreatePlayer')
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
      console.log(this.player)
    }
  }

  createPlayer (ipfsHash: string): void {
    this.player = CreatePlayer({
      selector: '#player',
      source: `https://gateway.paratii.video/ipfs/${ipfsHash}/master.m3u8`,
      mimeType: 'video/mp4',
      ipfsHash: ipfsHash
    })
  }

  render () {
    const { match, isPlaying, isAttemptingPlay } = this.props

    const videoId = match.params.id

    return (
      <Wrapper>
        <Body>
          <Title>Play Video: {videoId} </Title>
          <PlayerWrapper>
            {!isPlaying &&
              !isAttemptingPlay && (
                <OverlayWrapper>
                  <VideoOverlay {...this.props} onClick={this.onOverlayClick} />
                </OverlayWrapper>
              )}
            <Player id="player" />
          </PlayerWrapper>
        </Body>
      </Wrapper>
    )
  }
}

export default Play
