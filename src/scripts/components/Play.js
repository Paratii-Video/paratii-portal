/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import CreatePlayer from 'paratii-mediaplayer'

import type { RouteMatch } from 'types/ApplicationTypes'

type Props = {
  match: RouteMatch,
  setVideoId: (id: string) => void,
  videoId: ?string
};

const Wrapper = styled.div`
  font-size: 20px;
  flex: 1 1 0;
  padding: 20px;
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
  background-color: #fff;
  padding: 20px;
  display: flex;
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
      this.props.setVideoId(videoId)
      // this.props.fetchVideo(this.props.match.params.id);
    }
  }

  componentWillReceiveProps (nextProps: Props): void {
    if (nextProps.videoId && nextProps.videoId !== this.props.videoId) {
    }
  }

  componentDidMount () {
    CreatePlayer({
      selector: '#player',
      source:
        'https://gateway.paratii.video/ipfs/' +
        this.props.match.params.id +
        '/master.m3u8',
      mimeType: 'video/mp4',
      ipfsHash: this.props.match.params.id
    })
  }

  render () {
    return (
      <Wrapper>
        <Body>
          <Title>Play Video:</Title>
          <Player id="player" />
        </Body>
      </Wrapper>
    )
  }
}

export default Play
