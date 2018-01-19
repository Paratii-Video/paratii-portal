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
  video: ?VideoRecord
};

const Wrapper = styled.div`
  font-size: 20px;
  flex: 1 1 0;
  padding: 0;
  display: flex;
  flex-direction: column;
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
  flex: 0 0 50%;
`

class Play extends Component<Props, void> {
  constructor (props: Props): void {
    super(props)

    const videoId = this.props.match.params.id

    if (videoId) {
      this.props.fetchVideo(videoId)
    } else {
      throw Error('We should raise a 404 error here and redirect to the player')
    }
  }

  componentWillReceiveProps (nextProps: Props): void {
    let ipfsHash = ''
    if (nextProps.video) {
      ipfsHash = nextProps.video.ipfsHash
    }
    console.log('this props')
    console.log(this.props.video)
    console.log('next props')
    console.log(nextProps.video)
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
          <Title>Play Video: { videoId } </Title>
          <VideoOverlay/>
          <Player id="player" />
        </Body>
      </Wrapper>
    )
  }
}

export default Play
