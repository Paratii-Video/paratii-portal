import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  progress: String,
  nopercentual: String,
  end: ?boolean
}

const Wrapper = styled.div`
  width: 100%;
`

const BarWrapper = styled.div`
  background-color: ${props =>
    props.theme.colors.VideoForm.info.progress.background};
  height: 2px;
  position: relative;
  width: 100%;
`

const Bar = styled.span`
  background: linear-gradient(
    to right,
    ${props => props.theme.colors.VideoForm.info.progress.barFrom} 0%,
    ${props => props.theme.colors.VideoForm.info.progress.barTo} 100%
  );
  height: 100%;
  left: 0;
  position: absolute;
  transition: width 0.1s ${props => props.theme.animation.ease.smooth};
  width: ${props => (props.progress ? props.progress : '0%')};
`

const Precentual = styled.span`
  bottom: -5px;
  color: ${props => props.theme.colors.VideoForm.info.progress.color};
  font-size: ${props => props.theme.fonts.video.info.percentual};
  position: absolute;
  right: 0;
  transform: translate3d(${props => (props.end ? '0%' : '100%')}, 100%, 0);
`

class VideoProgressBar extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <BarWrapper>
          <Bar progress={this.props.progress}>
            {!this.props.nopercentual && (
              <Precentual end={this.props.progress === '100%' ? 1 : 0}>
                {this.props.progress}
              </Precentual>
            )}
          </Bar>
        </BarWrapper>
      </Wrapper>
    )
  }
}

export default VideoProgressBar
