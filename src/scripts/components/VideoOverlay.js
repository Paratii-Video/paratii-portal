/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Button from 'components/foundations/Button'
import Title from 'components/foundations/Title'
import VideoRecord from 'records/VideoRecords'
import { getIsPlaying } from 'selectors/index'
import IconButton from 'components/foundations/buttons/IconButton'
import { TRANSITION_STATE } from 'constants/ApplicationConstants'

import type { Match } from 'react-router-dom'
import type { TransitionState } from 'types/ApplicationTypes'

type Props = {
  video: ?VideoRecord,
  match: Match,
  isEmbed?: boolean,
  isPlaying: boolean,
  onClick: (e: Object) => void,
  togglePlayPause: () => void,
  transitionState: TransitionState,
  showShareModal?: boolean,
  toggleShareModal: (e: Object) => void
}

type State = {
  openPopover: ?string,
  buttons: {
    profile: ?Class<React.Component<any>>
  }
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`

const overlayPadding: string = '30px 38px 0'

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  color: white;
  box-sizing: border-box;
  opacity: ${({ transitionState }) => {
    switch (transitionState) {
      case TRANSITION_STATE.ENTERING:
      case TRANSITION_STATE.EXITED:
        return '0'
      case TRANSITION_STATE.EXITING:
      case TRANSITION_STATE.ENTERED:
      default:
        return '1.0'
    }
  }};
  transition: all ${({ theme }) => theme.animation.time.repaint}
    ${({ theme }) => theme.animation.ease.smooth};
`

const VideoInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  padding: ${overlayPadding};
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  transform: translateY(
    ${({ transitionState }) => {
    switch (transitionState) {
      case TRANSITION_STATE.ENTERING:
      case TRANSITION_STATE.EXITED:
        return '-75px'
      case TRANSITION_STATE.EXITING:
      case TRANSITION_STATE.ENTERED:
      default:
        return 0
    }
  }}
  );
  transition: all ${({ theme }) => theme.animation.time.repaint}
    ${({ theme }) => theme.animation.ease.smooth};
`

const PlayerTitle = Title.extend`
  color: ${props => props.theme.colors.VideoPlayer.header.title};
  flex: 1 0 50%;
`

const ButtonGroup = styled.div`
  align-items: center;
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

const ShareButton = Button.extend`
  height: 18px;
  position: absolute;
  right: 25px;
  top: 28px;
  width: 30px;
`

const SVGButton = styled.svg`
  fill: ${props => props.theme.colors.VideoPlayer.header.icons};
  display: block;
  height: 100%;
  width: 100%;
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

const CONTROLS_HEIGHT: string = '50px'

const Controls = styled.div`
  flex: 0 0 ${CONTROLS_HEIGHT};
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 0 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  transform: translateY(
    ${({ transitionState }) => {
    switch (transitionState) {
      case TRANSITION_STATE.ENTERING:
      case TRANSITION_STATE.EXITED:
        return CONTROLS_HEIGHT
      case TRANSITION_STATE.EXITING:
      case TRANSITION_STATE.ENTERED:
      default:
        return 0
    }
  }}
  );
  transition: all 250ms linear;
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
    // Disabled this as it is not working
    // const { isEmbed } = this.props
    // if (isEmbed) {
    //   import(/* webpackChunkName: ProfileButton */ 'components/widgets/PlayerPlugins/ProfileButton').then(
    //     ProfileButtonModule => {
    //       const ProfileButton: Class<
    //         React.Component<any>
    //       > = ((ProfileButtonModule.default: any): Class<React.Component<any>>)
    //       this.setState(prevState => ({
    //         buttons: {
    //           ...prevState.buttons,
    //           profile: ProfileButton
    //         }
    //       }))
    //     }
    //   )
    // }
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
    const {
      onClick,
      toggleShareModal,
      isPlaying,
      togglePlayPause,
      transitionState
    } = this.props
    const { openPopover } = this.state
    const ProfileButton: ?Class<React.Component<any>> = this.state.buttons
      .profile
    return (
      <Wrapper>
        <ShareButton onClick={toggleShareModal}>
          {!this.props.showShareModal && (
            <SVGButton>
              <use xlinkHref="#icon-player-share" />
            </SVGButton>
          )}
        </ShareButton>
        <Overlay
          data-test-id="video-overlay"
          onClick={onClick}
          transitionState={transitionState}
        >
          <VideoInfo transitionState={transitionState}>
            <PlayerTitle small>{this.getVideoTitle()}</PlayerTitle>
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
          <Controls transitionState={transitionState}>
            <ControlButtonWrapper>
              <IconButton
                icon={`/assets/img/${
                  isPlaying ? 'pause-icon' : 'play-icon'
                }.svg`}
                onClick={(e: Object) => {
                  e.stopPropagation()
                  togglePlayPause()
                }}
              />
            </ControlButtonWrapper>
          </Controls>
        </Overlay>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  isPlaying: getIsPlaying(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(VideoOverlay)
