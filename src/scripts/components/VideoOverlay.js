/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'

import VideoRecord from 'records/VideoRecords'
import IconButton from 'components/foundations/buttons/IconButton'

type Props = {
  video: ?VideoRecord,
  match: {
    params: {
      id: String
    }
  },
  isEmbed?: boolean,
  onClick: (e: Object) => void
}

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  padding: 48px;
  box-sizing: border-box;
`

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
`

const Title = styled.div`
  font-size: 24px;
  flex: 1 0 50%;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  justify-content: flex-end;
`

class VideoOverlay extends Component<Props, void> {
  getVideoTitle (): string {
    const { video } = this.props

    return (video && video.get('title')) || 'Title Placeholder'
  }

  onProfileButtonClick = (e: Object): void => {
    e.stopPropagation()
  }

  render () {
    const { onClick } = this.props
    return (
      <Overlay id="video-overlay" onClick={onClick}>
        <TopBar>
          <Title>{this.getVideoTitle()}</Title>
          <ButtonGroup>
            <IconButton
              icon={'/assets/img/prof.svg'}
              onClick={this.onProfileButtonClick}
            />
          </ButtonGroup>
        </TopBar>
      </Overlay>
    )
  }
}

export default VideoOverlay
