import React, { Component } from 'react'
import styled from 'styled-components'
import VideoProgressBar from 'components/widgets/VideoForm/VideoProgressBar'

type Props = {
  progress: String,
  marginBottom: Boolean,
  marginTop: Boolean,
  children: Object
}

const VideoProgressWrapper = styled.div`
  margin-bottom: ${props => (props.marginBottom ? '32px' : '')};
  margin-top: ${props => (props.marginTop ? '32px' : '')};
  width: 100%;
`

const VideoProgressTitleWrapper = styled.div`
  display: flex;
  flex-wrapper: wrap;
`

class VideoProgress extends Component<Props, void> {
  render () {
    return (
      <VideoProgressWrapper
        marginBottom={this.props.marginBottom}
        marginTop={this.props.marginTop}
      >
        <VideoProgressTitleWrapper>
          {this.props.children}
        </VideoProgressTitleWrapper>

        <VideoProgressBar progress={this.props.progress} />
      </VideoProgressWrapper>
    )
  }
}

export default VideoProgress
