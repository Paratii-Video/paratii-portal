import React from 'react'
import styled from 'styled-components'
import {
  VIDEOTIMEDISPLAY_PADDING,
  VIDEOTIMEDISPLAY_POSITION,
  Z_INDEX_FRONT,
  Z_INDEX_BACK
} from 'constants/UIConstants'
import Text from './Text'

type Props = {
  children: any,
  relative: boolean
}

const Wrapper = styled.div`
  backface-visibility: hidden;
  bottom: ${props => (props.relative ? null : VIDEOTIMEDISPLAY_POSITION)};
  padding: ${VIDEOTIMEDISPLAY_PADDING};
  position: ${props => (props.relative ? 'relative' : 'absolute')};
  right: ${props => (props.relative ? null : VIDEOTIMEDISPLAY_POSITION)};

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
    z-index: ${Z_INDEX_BACK};
  }
`

const TextWrapper = styled.div`
  position: relative;
  z-index: ${Z_INDEX_FRONT};
`

class VideoTimeDisplay extends React.Component<Props> {
  render () {
    return (
      <Wrapper relative={this.props.relative}>
        <TextWrapper tiny accent>
          <Text tiny accent>
          {this.props.children}
          </Text>
        </TextWrapper>
      </Wrapper>
    )
  }
}

export default VideoTimeDisplay
