/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import CreatePlayer from 'paratii-mediaplayer'
import VideoRecord from 'records/VideoRecords'

import VideoOverlay from 'components/VideoOverlay'

import type { RouteMatch } from 'types/ApplicationTypes'

type Props = {
  match: RouteMatch,
  fetchVideo: (id: string) => void,
  video: ?VideoRecord,
  isPlaying: boolean,
  togglePlayPause: () => void
}

const Wrapper = styled.div`
  font-size: 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 0 0 100%;
`

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  constructor (props: Props) {
    super(props)

    this.onOverlayClick = this.onOverlayClick.bind(this)
  }

  onOverlayClick (): void {
    const { togglePlayPause } = this.props

    togglePlayPause()
  }

  componentDidMount (): void {
    const videoId = this.props.match.params.id

    if (videoId) {
      this.props.fetchVideo(videoId)
    } else {
      throw Error('We should raise a 404 error here and redirect to the player')
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
        this.player = CreatePlayer({
          selector: '#player',
          source: `https://gateway.paratii.video/ipfs/${ipfsHash}/master.m3u8`,
          mimeType: 'video/mp4',
          ipfsHash: ipfsHash
        })
      }
    }

    if (nextProps.isPlaying !== isPlaying) {
      if (this.player) {
        if (nextProps.isPlaying) {
          this.player.play()
        } else {
          this.player.pause()
        }
      }
      console.log(this.player)
    }
  }

  render () {
    const { match, isPlaying } = this.props

    const videoId = match.params.id

    return (
      <Wrapper>
        <Body>
          <Title>Play Video: {videoId} </Title>
          <PlayerWrapper>
            {!isPlaying && (
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
