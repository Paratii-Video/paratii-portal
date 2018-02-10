/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'

import VideoRecord from 'records/VideoRecords'

import type { Match } from 'react-router-dom'

type Props = {
  video: ?VideoRecord,
  match: Match,
  isEmbed?: boolean,
  onClick: (e: Object) => void,
  ptiBalance: string
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
    const { onClick } = this.props
    const { openPopover } = this.state
    const ProfileButton: ?Class<React.Component<any>> = this.state.buttons
      .profile
    return (
      <Overlay id="video-overlay" onClick={onClick}>
        <TopBar>
          <Title>{this.getVideoTitle()}</Title>
          <ButtonGroup hide={!!this.state.openPopover}>
            {ProfileButton ? (
              <ButtonWrapper>
                <ProfileButton
                  onClick={this.onProfileButtonClick}
                  onClose={this.closePopover}
                  popoverPortal={this.popoverWrapperRef}
                  popoverOpen={true || openPopover === 'profile'}
                />
              </ButtonWrapper>
            ) : null}
          </ButtonGroup>
          <PopoverWrapper
            open={!!openPopover}
            innerRef={this.popoverWrapperRefCallback}
          />
        </TopBar>
      </Overlay>
    )
  }
}

export default VideoOverlay
