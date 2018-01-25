/* @flow */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Wrapper from './foundations/Wrapper'
import VideoRecord from 'records/VideoRecords'

type Props = {
  video: VideoRecord,
  state: Object
}

class VideoStatus extends Component<Props, void> {
  render () {
    let video = this.props.video
    let videoLink = `/play/${video.get('id')}`
    return (
      <Wrapper>
        <pre id="video-status">
          Your Video is now being either:
          <ul>
            <li>
              being uploaded (depends on this.props.state.uploadStatus:{' '}
              {this.props.state.uploadStatus})
            </li>
            <li>in the process of being transcoded</li>
            <li>
              all ready for sharing -- here is the link:
              <Link to={videoLink}>here is the link</Link>
            </li>
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
          Soon you willl also be able to tag the video, create playlists, and
          other goodies! (But not yet :-())
          <br />
        </pre>
      </Wrapper>
    )
  }
}

export default VideoStatus
