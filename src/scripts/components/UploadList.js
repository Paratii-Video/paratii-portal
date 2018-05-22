/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'

import type VideoRecord from 'records/VideoRecords'
import type { Map } from 'immutable'

import UploadListItem from 'containers/UploadListItemContainer'

type Props = {
  videos: Map<string, VideoRecord> // maps video ids to upload records
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
`

class UploadList extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        {this.props.videos
          .entrySeq()
          .map(([videoId, videoInfo]) => (
            <UploadListItem key={videoId} videoId={videoId} video={videoInfo} />
          ))}
      </Wrapper>
    )
  }
}

export default UploadList
