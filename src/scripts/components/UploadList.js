/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import VideoForm from 'containers/VideoFormContainer'
import Loader from 'components/foundations/Loader'
import type { Map } from 'immutable'
import type VideoRecord from 'records/VideoRecords'

type Props = {
  videosAreBeingFetched: boolean,
  videos: Map<string, VideoRecord> // maps video ids to upload records
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
`

class UploadList extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        {this.props.videosAreBeingFetched ? (
          <Loader />
        ) : (
          this.props.videos
            .entrySeq()
            .map(([videoId, videoInfo]) => (
              <VideoForm key={videoId} videoId={videoId} video={videoInfo} />
            ))
        )}
      </Wrapper>
    )
  }
}

export default UploadList
