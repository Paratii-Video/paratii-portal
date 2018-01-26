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
    console.log('video overlay!!!')
    return (
      <Wrapper>
        <Overlay id="video-overlay">
          <h2>Video Overlay</h2>
          <h5>The video id is: {this.props.match.params.id}</h5>
          Title:{' '}
          {(this.props.video && this.props.video.title) ||
            'This video either has no title, or could not be fetched'}
        </Overlay>
      </Wrapper>
    )
  }
}

export default VideoOverlay
