/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import VideoRecord from 'records/VideoRecords'

import Wrapper from './foundations/Wrapper'

type Props = {
  video: ?VideoRecord,
  match: {
    params: {
      id: String
    }
  }
  // video:{
  //   title: String
  // }
}

const Overlay = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  z-index: 10;
`

class VideoOverlay extends Component<Props, void> {
  render () {
    const videoId = this.props.match.params.id
    const video = this.props.video
    if (video === undefined) {
      return (
        <Wrapper>
          <Overlay id="video-overlay">
            <h2>Video Overlay</h2>
            <h5>This videow (with id {videoId}) could not be found!</h5>
          </Overlay>
        </Wrapper>
      )
    } else {
      return (
        <Wrapper>
          <Overlay id="video-overlay">
            <h2>Video Overlay</h2>
            <h5>The video id is: {videoId}</h5>
            Title: {(video && video.title) || 'This video has no (known) title'}
          </Overlay>
        </Wrapper>
      )
    }
  }
}

export default VideoOverlay
