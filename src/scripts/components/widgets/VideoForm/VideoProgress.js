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
  margin-bottom: ${props => (props.marginBottom ? '30px' : '')};
  margin-top: ${props => (props.marginTop ? '30px' : '')};
  width: 100%;
`

const VideoProgressTitle = styled.p`
  align-items: center;
  display: flex;
  color: ${props => props.theme.colors.VideoForm.info.progress.color};
  font-size: ${props => props.theme.fonts.video.info.progress};
  margin-bottom: 12px;
`

const VideoProgressIcon = styled.span`
  background-color: ${props =>
    props.theme.colors.VideoForm.info.progress.iconBg};
  border-radius: 100%;
  height: 14px;
  margin-left: 10px;
  transform: scale(${props => (props.show ? 1 : 0)});
  transition: transform 0.5s ${props => props.theme.animation.ease.smooth};
  width: 14px;
`
const VideoProressSvg = styled.svg`
  display: block;
  fill: ${props => props.theme.colors.VideoForm.info.progress.icon};
  height: 14px;
  transform: scale(0.8);
  transition: transform 0.5s ${props => props.theme.animation.ease.smooth};
  width: 14px;
`

class VideoProgress extends Component<Props, void> {
  render () {
    return (
      <VideoProgressWrapper
        marginBottom={this.props.marginBottom}
        marginTop={this.props.marginTop}
      >
        <VideoProgressTitle>
          {this.props.children}
          <VideoProgressIcon show={this.props.progress === '100%'}>
            <VideoProressSvg>
              <use xlinkHref="#icon-check" />
            </VideoProressSvg>
          </VideoProgressIcon>
        </VideoProgressTitle>

        <VideoProgressBar progress={this.props.progress} />
      </VideoProgressWrapper>
    )
  }
}

export default VideoProgress
