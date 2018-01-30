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

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  flex: 0 0 100%;
  color: white;
  background: rgba(0, 0, 0, 0.8);
`

class VideoOverlay extends Component<Props, void> {
  render () {
    const { onClick } = this.props

    return (
      <Overlay id="video-overlay" onClick={onClick}>
        <h2>Video Overlay</h2>
        <h5>The video id is: {this.props.match.params.id}</h5>
        Title:{' '}
        {(this.props.video && this.props.video.title) ||
          'This video either has no title, or could not be fetched'}
      </Overlay>
    )
  }
}

export default VideoOverlay
