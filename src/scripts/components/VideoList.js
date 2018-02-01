import React, { Component } from 'react'
import styled from 'styled-components'

import type { UploadRecord } from 'records/UploadRecords'
import type { Map } from 'immutable'
import Button from './foundations/buttons/Button'

import VideoListItem from 'components/VideoListItem'

type Props = {
  uploads: Map<string, UploadRecord>, // maps video ids to upload records
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
    const { uploads, onItemClick } = this.props

    return (
      <Wrapper>
        {uploads
          .entrySeq()
          .map(([videoId, videoInfo]) => (
            <VideoListItem
              key={videoId}
              id={videoId}
              item={videoInfo}
              onClick={onItemClick}
            />
          ))}
        <Button purple onClick={() => onItemClick(null)}>
          ADD MORE VIDEOS
        </Button>
      </Wrapper>
    )
  }
}

export default VideoList
