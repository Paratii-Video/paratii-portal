import React, { Component } from 'react'
import styled from 'styled-components'

import type { VideoRecord } from 'records/VideoRecords'
import type { Map } from 'immutable'

import VideoListItem from 'components/VideoListItem'

type Props = {
  videos: Map<string, VideoRecord>, // maps video ids to upload records
  onItemClick: (id: string) => void
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  color: ${props => props.theme.colors.VideoList.title};
  font-size: ${props => props.theme.fonts.video.list.title};
  margin-bottom: 37px;
  padding: ${props => props.theme.sizes.card.padding};
  padding-bottom: 0;
`

const List = styled.ul`
  display: block;
  width: 100%;
`

class VideoList extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <Title>Video List</Title>
        <List>
          {this.props.videos
            .entrySeq()
            .map(([videoId, videoInfo]) => (
              <VideoListItem
                key={videoId}
                video={videoInfo}
                onClick={this.props.onItemClick}
              />
            ))}
        </List>
      </Wrapper>
    )
  }
}

export default VideoList
