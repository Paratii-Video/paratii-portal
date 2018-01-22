/* @flow */

import React, { Component } from 'react'
// import styled from 'styled-components'
// import Button from './foundations/Button'
// import Input from './foundations/Input'
import Wrapper from './foundations/Wrapper'

type Props = {
  video: Object,
  videoFromPTI: Object
};

class VideoStatus extends Component<Props, void> {
  render () {
    let video = this.props.video
    return (
      <Wrapper>
        <pre id="video-status">
            Your Video is now being uploaded/beging transcoded/all ready for sharing!
          <br />
            Once it is ready,
            You can share your video here [link] or embed it like this [link]
          <br />
            Soon you willl also be able to tag the video, create playlists, and other goodies! (But not yet :-())
          <br />
              This is the information you entered: [Show video information here]
          <br />
              Click to edit yr vid [Insert link here]
          <br />
          id: {video.get('id')}
          <br />
          title: {video.get('title')}
          <br />
          description: {video.get('description')}
          <br />

          <b>TODO: checks, progress, blabla:</b>
          <br />

        </pre>
      </Wrapper>
    )
  }
}

export default VideoStatus
