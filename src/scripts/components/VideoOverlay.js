/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import VideoRecord from 'records/VideoRecords'
import { getIsPlaying } from 'selectors/index'
import IconButton from 'components/foundations/buttons/IconButton'

import type { Match } from 'react-router-dom'

type Props = {
  video: ?VideoRecord,
  match: Match,
  isEmbed?: boolean,
  isPlaying: boolean,
  onClick: (e: Object) => void,
  togglePlayPause: () => void
}

type State = {
  openPopover: ?string,
  buttons: {
    profile: ?Class<React.Component<any>>
  }
}

const overlayPadding: string = '48px'

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  color: white;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  box-sizing: border-box;
`

const VideoInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  padding: ${overlayPadding};
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
  opacity: ${({ hide }) => (hide ? 0 : 1)};
`

const ButtonWrapper = styled.div`
  width: 25px;
  height: 25px;
`

const PopoverWrapper = styled.div`
  position: absolute;
  top: ${overlayPadding};
  right: ${overlayPadding};
  width: 230px;
  height: 110px;
  display: ${props => (props.open ? 'block' : 'none')};
  cursor: default;
`

const Controls = styled.div`
  flex: 0 0 50px;
  display: flex;
  flex-direction: row;
  background-color: blue;
  width: 100%;
  align-items: center;
  padding: 0 10px;
`

const ControlButtonWrapper = styled.div`
  width: 25px;
  height: 25px;
`

class VideoOverlay extends Component<Props, State> {
  onProfileButtonClick: (e: Object) => void
  popoverWrapperRefCallback: (ref: HTMLElement) => void
  popoverWrapperRef: ?HTMLElement

  constructor (props: Props) {
    super(props)

    this.state = {
      openPopover: null,
      buttons: {
        profile: null
      }
    }

    this.loadEmbedPlugins()
  }

  loadEmbedPlugins () {
    const { isEmbed } = this.props

    if (isEmbed) {
      import(/* webpackChunkName: ProfileButton */ 'components/widgets/PlayerPlugins/ProfileButton').then(
        ProfileButtonModule => {
          const ProfileButton: Class<
            React.Component<any>
          > = ((ProfileButtonModule.default: any): Class<React.Component<any>>)
          this.setState(prevState => ({
            buttons: {
              ...prevState.buttons,
              profile: ProfileButton
            }
          }))
        }
      )
    }
  }

  getVideoTitle (): string {
    const { video } = this.props

    return (video && video.get('title')) || 'Video Title'
  }

  onProfileButtonClick = (e: Object): void => {
    e.stopPropagation()
    this.setState({
      openPopover: 'profile'
    })
  }

  closePopover = (e: Object): void => {
    e.stopPropagation()
    this.setState({
      openPopover: null
    })
  }

  popoverWrapperRefCallback = (ref: HTMLElement): void => {
    this.popoverWrapperRef = ref
  }

  render () {
    const { onClick, isPlaying, togglePlayPause } = this.props
    const { openPopover } = this.state
    const ProfileButton: ?Class<React.Component<any>> = this.state.buttons
      .profile
    return (
      <Overlay data-test-id="video-overlay" onClick={onClick}>
        <VideoInfo>
          <Title>{this.getVideoTitle()}</Title>
          <ButtonGroup hide={!!this.state.openPopover}>
            {ProfileButton ? (
              <ButtonWrapper>
                <ProfileButton
                  onClick={this.onProfileButtonClick}
                  onClose={this.closePopover}
                  popoverPortal={this.popoverWrapperRef}
                  popoverOpen={openPopover === 'profile'}
                />
              </ButtonWrapper>
            ) : null}
          </ButtonGroup>
          <PopoverWrapper
            open={!!openPopover}
            innerRef={this.popoverWrapperRefCallback}
          />
        </VideoInfo>
        <Controls>
          <ControlButtonWrapper>
            <IconButton
              icon={`/assets/img/${isPlaying ? 'pause-icon' : 'play-icon'}.svg`}
              onClick={togglePlayPause}
            />
          </ControlButtonWrapper>
        </Controls>
      </Overlay>
    )
  }
}

const mapStateToProps = state => ({
  isPlaying: getIsPlaying(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(VideoOverlay)
