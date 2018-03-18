import React, { Component } from 'react'
import styled from 'styled-components'

import type { VideoRecord } from 'records/VideoRecords'
import type { Map } from 'immutable'

import VideoListItem from 'containers/VideoListItemContainer'
import Card from 'components/structures/Card'
import Button from 'components/foundations/Button'
import { VIDEO_MANAGER_MAX_HEIGHT } from 'constants/UIConstants'

type Props = {
  videos: Map<string, VideoRecord>, // maps video ids to upload records
  selectedVideo: VideoRecord,
  setSelectedVideo: Object => void,
  videoFormRef: Object
}

const Wrapper = styled(Card)`
  max-height: ${VIDEO_MANAGER_MAX_HEIGHT};
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
  padding-bottom: 80px;
  width: 100%;
  overflow: scroll;
`

class VideoList extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.onVideoListItemClicked = this.onVideoListItemClicked.bind(this)
  }

  onVideoListItemClicked (id: string) {
    this.props.setSelectedVideo(id)
  }

  render () {
    const { selectedVideo } = this.props

    const footer = this.props.selectedVideo ? (
      <Button onClick={() => this.onVideoListItemClicked(null)}>
        Add another video
      </Button>
    ) : (
      ''
    )
    return (
      <Wrapper {...this.props} nopadding nobackground footer={footer}>
        <Title>Video List</Title>
        <List>
          {this.props.videos
            .entrySeq()
            .map(([videoId, videoInfo]) => (
              <VideoListItem
                videoFormRef={this.props.videoFormRef}
                key={videoId}
                video={videoInfo}
                selected={selectedVideo && selectedVideo.get('id') === videoId}
              />
            ))}
        </List>
      </Wrapper>
    )
  }
}

export default VideoList
