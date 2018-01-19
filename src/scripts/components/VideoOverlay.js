/* @flow */

import React, {Component} from 'react'
import styled from 'styled-components'
import VideoRecord from 'records/VideoRecords'

import Wrapper from './foundations/Wrapper'

type Props = {
  video: ?VideoRecord
}

const Overlay = styled.div`
  width: 100%;
`

class VideoOverlay extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <Overlay>

        </Overlay>
      </Wrapper>
    )
  }
}

export default VideoOverlay
