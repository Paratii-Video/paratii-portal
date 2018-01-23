/* @flow */

import React, { Component } from 'react'
import Wrapper from './foundations/Wrapper'
import VideoRecord from 'records/VideoRecords'

type Props = {
  video: VideoRecord,
  state: Object
};

class VideoStatus extends Component<Props, void> {
  render () {
    let video = this.props.video
    return (
      <Wrapper>
        <pre id="video-status">

            Blockchain status (= the object has been saved on the blockchain?): {this.props.state.blockchainStatus.name}
          <br />
            Upload status (= the object has been pinned?): {this.props.state.uploadStatus.name}
          <br />
            Transcoding status (= the object has been transcoded and is available for streaming?):
          {this.props.state.transcodingStatus.name}
          <br />
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
          <br />
        </pre>
      </Wrapper>
    )
  }
}

export default VideoStatus
