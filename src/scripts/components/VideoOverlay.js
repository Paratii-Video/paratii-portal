/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'

import VideoRecord from 'records/VideoRecords'

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

const PopoverWrapper = styled.div`
  position: absolute;
  top: ${overlayPadding};
  right: ${overlayPadding};
  width: 200px;
  height: 100px;
  display: ${props => (props.open ? 'block' : 'none')};
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

    return (video && video.get('title')) || 'Title Placeholder'
  }

  onProfileButtonClick = (e: Object): void => {
    e.stopPropagation()
    this.setState({
      openPopover: 'profile'
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
              <ProfileButton
                onClick={this.onProfileButtonClick}
                popoverPortal={this.popoverWrapperRef}
                popoverOpen={openPopover === 'profile'}
              />
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
