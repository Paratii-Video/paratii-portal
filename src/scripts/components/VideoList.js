import React, { Component } from 'react'
import styled from 'styled-components'

import type { VideoRecord } from 'records/VideoRecords'
import type { Map } from 'immutable'
import Button from './foundations/buttons/Button'

import VideoListItem from 'components/VideoListItem'

type Props = {
  videos: Map<string, VideoRecord>, // maps video ids to upload records
  onItemClick: (id: string) => void
}

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.body.background};
  font-family: ${props =>
    props.theme.fonts.family ? props.theme.fonts.family : 'Monospace'},
    sans-serif;
  display: flex;
  flex-direction: column;
  width: 300px;
`

class VideoList extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        {this.props.videos
          .entrySeq()
          .map(([videoId, videoInfo]) => (
            <VideoListItem
              key={videoId}
              video={videoInfo}
              onClick={this.props.onItemClick}
            />
          ))}
        <Button onClick={() => this.props.onItemClick(null)}>
          ADD MORE VIDEOS
        </Button>
      </Wrapper>
    )
  }
}

export default VideoList
