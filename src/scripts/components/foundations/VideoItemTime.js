import React from 'react'
import styled from 'styled-components'
import {
  VIDEOITEMTIME_PADDING,
  VIDEOITEMTIME_POSITION
} from 'constants/UIConstants'
import Text from './Text'

type Props = {
  children: any,
  relative: boolean
}

const Wrapper = styled.div`
  backface-visibility: hidden;
  bottom: ${props => (props.relative ? null : VIDEOITEMTIME_POSITION)};
  padding: ${VIDEOITEMTIME_PADDING};
  position: ${props => (props.relative ? 'relative' : 'absolute')};
  right: ${props => (props.relative ? null : VIDEOITEMTIME_POSITION)};
  z-index: ${props => (props.relative ? null : 2)};

  &::before {
    background-color: ${props => props.theme.colors.background.body};
    border-radius: 2px;
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.7;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }
`

const VideoMediaTimeText = Text.extend`
  position: relative;
  z-index: 2;
`

class VideoItemTime extends React.Component<Props> {
  render () {
    return (
      <Wrapper relative={this.props.relative}>
        <VideoMediaTimeText tiny accent>
          {this.props.children}
        </VideoMediaTimeText>
      </Wrapper>
    )
  }
}

export default VideoItemTime
