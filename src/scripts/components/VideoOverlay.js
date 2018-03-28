/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import Button, { SVGIcon } from 'components/foundations/Button'
import Title from 'components/foundations/Title'
import PlayerControlsContainer from 'containers/PlayerControlsContainer'
import VideoRecord from 'records/VideoRecords'
import { TRANSITION_STATE } from 'constants/ApplicationConstants'
import { CONTROLS_HEIGHT } from 'constants/UIConstants'

import type { TransitionState } from 'types/ApplicationTypes'

type Props = {
  video: ?VideoRecord,
  isEmbed?: boolean,
  onClick: (e: Object) => void,
  transitionState: ?TransitionState,
  showShareModal?: boolean,
  togglePlayPause: () => void,
  toggleShareModal: (e: Object) => void,
  toggleFullscreen: (goToFullscreen: boolean) => void,
  onScrub: (percentage: number) => void,
  onVolumeChange: (percentage: number) => void,
  onToggleMute: (mute: boolean) => void,
  onPlaybackLevelChange: (levelId: number) => void
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const overlayPadding: string = '20px 25px 0'

const Overlay = styled.div`
  width: 100%;
  flex: 0 0 calc(100% - ${CONTROLS_HEIGHT});
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
  cursor: pointer;
`

const VideoInfo = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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
  transition: transform
    ${({ transitionState }) => (TRANSITION_STATE.EXITED ? '0.6s' : '0.9s')}
    ${({ theme }) => theme.animation.ease.smooth};
`

const PlayerTitle = Title.extend`
  color: ${props => props.theme.colors.VideoPlayer.header.title};
  max-width: 75%;
`

const ButtonWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 25px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  opacity: ${({ hide }) => (hide ? 0 : 1)};
`

const ShareButton = Button.extend`
  height: 18px;
  margin-left: 10px;
  width: 30px;

  @media (max-width: 768px) {
    height: 12px;
    width: 20px;
  }
`

class VideoOverlay extends Component<Props> {
  getVideoTitle (): string {
    const { video } = this.props

    return (video && (video.get('title') || video.get('filename'))) || ''
  }

  render () {
    const {
      onClick,
      onScrub,
      onVolumeChange,
      onToggleMute,
      onPlaybackLevelChange,
      togglePlayPause,
      toggleShareModal,
      toggleFullscreen,
      transitionState
    } = this.props
    return (
      <Wrapper>
        <Overlay
          data-test-id="video-overlay"
          onClick={onClick}
          transitionState={transitionState}
        >
          <VideoInfo transitionState={transitionState}>
            <PlayerTitle small>{this.getVideoTitle()}</PlayerTitle>
            <ButtonWrapper>
              <ShareButton
                onClick={(e: Object) => {
                  e.stopPropagation()
                  toggleShareModal(e)
                }}
              >
                <SVGIcon icon="icon-player-share" color="white" />
              </ShareButton>
            </ButtonWrapper>
          </VideoInfo>
        </Overlay>
        <PlayerControlsContainer
          onScrub={onScrub}
          onVolumeChange={onVolumeChange}
          onToggleMute={onToggleMute}
          onPlaybackLevelChange={onPlaybackLevelChange}
          togglePlayPause={togglePlayPause}
          toggleFullscreen={toggleFullscreen}
          transitionState={transitionState}
        />
      </Wrapper>
    )
  }
}

export default VideoOverlay
