/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import CreatePlayer from 'paratii-mediaplayer'
import VideoRecord from 'records/VideoRecords'

import VideoOverlay from 'components/VideoOverlay'

import type { RouteMatch } from 'types/ApplicationTypes'
import Debug from 'containers/DebugContainer'

type Props = {
  match: RouteMatch,
  fetchVideo: (id: string) => void,
  video: VideoRecord
}

const Wrapper = styled.div`
  font-size: 20px;
  flex: 1 1 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
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
  height: 100vh;
  width: 100%;
  flex: 0 0 50%;
`

class Play extends Component<Props, void> {
  componentDidMount (): void {
    if (this.props.video) {
      this.createPlayer(this.props.video.ipfsHash)
    } else {
      this.props.fetchVideo(this.props.match.params.id)
    }
  }

  componentWillReceiveProps (nextProps: Props): void {
    console.log('- - - componentWillReceiveProps')

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
  }

  createPlayer (ipfsHash: string): void {
    CreatePlayer({
      selector: '#player',
      source: `https://gateway.paratii.video/ipfs/${ipfsHash}/master.m3u8`,
      mimeType: 'video/mp4',
      ipfsHash: ipfsHash
    })
  }

  render () {
    const videoId = this.props.match.params.id
    return (
      <Wrapper>
        <Body>
          <Title>Play Video: {videoId} </Title>
          <VideoOverlay {...this.props} />
          <Player id="player" />
          <Debug />
        </Body>
      </Wrapper>
    )
  }
}

export default Play
