/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'

import UploadListItem from 'containers/UploadListItemContainer'
import Loader from 'components/foundations/Loader'

import type { Map } from 'immutable'
import type VideoRecord from 'records/VideoRecords'

type Props = {
  videosAreBeingFetched: boolean,
  videos: Map<string, VideoRecord> // maps video ids to upload records
}

const MIN_HEIGHT: string = '200px'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
  min-height: ${MIN_HEIGHT};
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
              <UploadListItem
                key={videoId}
                videoId={videoId}
                video={videoInfo}
              />
            ))
        )}
      </Wrapper>
    )
  }
}

export default UploadList
