import React, { Component } from 'react'
import styled from 'styled-components'

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
  font-size: ${props => props.theme.fonts.video.info.progress.color};
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
const VideoProgressBarWrapper = styled.div`
  background-color: ${props =>
    props.theme.colors.VideoForm.info.progress.background};
  height: 1px;
  position: relative;
  width: 100%;
`
const VideoProgressBar = styled.span`
  background: linear-gradient(
    to right,
    ${props => props.theme.colors.VideoForm.info.progress.barFrom} 0%,
    ${props => props.theme.colors.VideoForm.info.progress.barTo} 100%
  );
  height: 100%;
  left: -100%;
  position: absolute;
  transform: translate3d(
    ${props => (props.progress ? props.progress : '0%')},
    0,
    0
  );
  transition: transform 0.1s ${props => props.theme.animation.ease.smooth};
  width: 100%;
`

const VideoProgressPercentual = styled.span`
  bottom: -5px;
  color: ${props => props.theme.colors.VideoForm.info.progress.color};
  font-size: ${props => props.theme.fonts.video.info.percentual};
  position: absolute;
  right: 0;
  transform: translate3d(${props => (props.end ? '0%' : '50%')}, 100%, 0);
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
        <VideoProgressBarWrapper>
          <VideoProgressBar progress={this.props.progress}>
            <VideoProgressPercentual end={this.props.progress === '100%'}>
              {this.props.progress}
            </VideoProgressPercentual>
          </VideoProgressBar>
        </VideoProgressBarWrapper>
      </VideoProgressWrapper>
    )
  }
}

export default VideoProgress
