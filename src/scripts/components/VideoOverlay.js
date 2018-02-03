/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'

import VideoRecord from 'records/VideoRecords'

type Props = {
  video: ?VideoRecord,
  match: {
    params: {
      id: String
    }
  },
  onClick: (e: Object) => void
}

const Title = styled.div`
  font-size: 24px;
`

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  flex: 0 0 100%;
  display: flex;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  padding: 48px;
`

class VideoOverlay extends Component<Props, void> {
  getVideoTitle (): string {
    const { video } = this.props

    return (video && video.get('title')) || 'Title Placeholder'
  }

  render () {
    const { onClick } = this.props
    return (
      <Overlay id="video-overlay" onClick={onClick}>
        <Title>{this.getVideoTitle()}</Title>
      </Overlay>
    )
  }
}

export default VideoOverlay
