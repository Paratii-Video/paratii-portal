/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'

import VideoRecord from 'records/VideoRecords'
import IconButton from 'components/foundations/buttons/IconButton'
import Popover from 'components/foundations/Popover'

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

const overlayPadding: string = '48px'

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  padding: ${overlayPadding};
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

const PopoverWrapper = styled.div`
  position: absolute;
  top: ${overlayPadding};
  right: ${overlayPadding};
  width: 200px;
  height: 100px;
`

class VideoOverlay extends Component<Props, void> {
  constructor (props: Props) {
    super(props)

    this.state = {
      openPopover: false
    }
  }

  getVideoTitle (): string {
    const { video } = this.props

    return (video && video.get('title')) || 'Title Placeholder'
  }

  onProfileButtonClick = (e: Object): void => {
    e.stopPropagation()
    this.setState({
      openPopover: true
    })
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
          {this.state.openPopover ? (
            <PopoverWrapper>
              <Popover>Foo bar</Popover>
            </PopoverWrapper>
          ) : null}
        </TopBar>
      </Overlay>
    )
  }
}

export default VideoOverlay
