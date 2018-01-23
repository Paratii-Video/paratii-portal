/* @flow */

import React, { Component } from 'react'
import Wrapper from './foundations/Wrapper'

type Props = {
  video: Object
};

class VideoStatus extends Component<Props, void> {
  render () {
    let video = this.props.video
    return (
      <Wrapper>
        <pre id="video-status">
            Your Video is now being either:
          <ul>
            <li>being uploaded</li>
            <li>in the process of being transcoded</li>
            <li>all ready for sharing -- here is the link</li>
          </ul>
          <br />
          --------------------------------------------------------
          <br />
              This is the information you entered:
          <br />
          id: {video.get('id')}
          <br />
          title: {video.get('title')}
          <br />
          description: {video.get('description')}
          <br />
          Click to edit yr vid [Insert link here]
          <br />
          --------------------------------------------------------
          <br />
          Soon you willl also be able to tag the video, create playlists, and other goodies! (But not yet :-())

          <b>TODO: checks, progress, blabla:</b>
          <br />

        </pre>
      </Wrapper>
    )
  }
}

export default VideoStatus
