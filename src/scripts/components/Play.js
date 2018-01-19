/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import CreatePlayer from 'paratii-mediaplayer'
import VideoRecord from 'records/VideoRecords'

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
  height: 100%;
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
  componentDidMount (): void {
    const videoId = this.props.match.params.id

    if (videoId) {
      this.props.fetchVideo(videoId)
    } else {
      throw Error('We should raise a 404 error here and redirect to the player')
    }
  }

  componentWillReceiveProps (nextProps: Props): void {
    if (nextProps.video && this.props.video !== nextProps.video) {
      const id = nextProps.video.id
      CreatePlayer({
        selector: '#player',
        source: `https://gateway.paratii.video/ipfs/${id}/master.m3u8`,
        mimeType: 'video/mp4',
        ipfsHash: id
      })
    }
  }

  render () {
    const videoId = this.props.match.params.id
    return (
      <Wrapper>
        <Body>
          <Title>Play Video: { videoId } </Title>
          <Player id="player" />
        </Body>
      </Wrapper>
    )
  }
}

export default Play
