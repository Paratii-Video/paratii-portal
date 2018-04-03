/* @flow */

import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import Button, { SVGIcon } from 'components/foundations/Button'
import Title from 'components/foundations/Title'
import PlayerControlsContainer from 'containers/PlayerControlsContainer'
import VideoRecord from 'records/VideoRecords'
import { TRANSITION_STATE } from 'constants/ApplicationConstants'

import { List as ImmutableList } from 'immutable'

import IconButton from 'components/foundations/buttons/IconButton'
import PlaybackLevels from 'components/widgets/PlaybackLevels'
import WalletInfoContainer from 'containers/widgets/WalletInfoContainer'
import { PLAYER_PLUGIN } from 'constants/PlayerConstants'
import { PlaybackLevel } from 'records/PlayerRecords'
import { OVERLAY_BUTTONS_HEIGHT } from 'constants/UIConstants'
import Colors from 'components/foundations/base/Colors'

import type { TransitionState, PlayerPlugin } from 'types/ApplicationTypes'

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
  playbackLevels: ImmutableList<PlaybackLevel>,
  onPlaybackLevelChange: (levelId: number) => void,
  toggleActivePlugin: (plugin: PlayerPlugin) => void,
  currentPlaybackLevel: ?PlaybackLevel,
  activePlugin: ?PlayerPlugin
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
  flex: 0 1 100%;
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
  height: ${OVERLAY_BUTTONS_HEIGHT};
`

const ShareButton = Button.extend`
  height: 20px;
  margin-left: 10px;
  width: 26px;

  @media (max-width: 768px) {
    width: 20px;
  }
`

class VideoOverlay extends Component<Props> {
  getVideoTitle (): string {
    const { video } = this.props

    return (video && (video.get('title') || video.get('filename'))) || ''
  }

  renderPlugins () {
    const {
      activePlugin,
      currentPlaybackLevel,
      onPlaybackLevelChange,
      playbackLevels,
      toggleActivePlugin
    } = this.props

    return (
      <Fragment>
        <PlaybackLevels
          open={activePlugin === PLAYER_PLUGIN.PLAYBACK_LEVELS}
          currentPlaybackLevel={currentPlaybackLevel}
          playbackLevels={playbackLevels}
          onPlaybackLevelChange={onPlaybackLevelChange}
          onClose={() => toggleActivePlugin()}
        />
        <WalletInfoContainer
          open={activePlugin === PLAYER_PLUGIN.WALLET}
          onClose={() => toggleActivePlugin()}
        />
      </Fragment>
    )
  }

  render () {
    const {
      activePlugin,
      isEmbed,
      onClick,
      onScrub,
      onVolumeChange,
      onToggleMute,
      onPlaybackLevelChange,
      togglePlayPause,
      toggleShareModal,
      toggleFullscreen,
      toggleActivePlugin,
      transitionState
    } = this.props
    return (
      <Wrapper data-test-id="video-overlay">
        {this.renderPlugins()}
        <Overlay onClick={onClick} transitionState={transitionState}>
          <VideoInfo transitionState={transitionState}>
            {isEmbed && <PlayerTitle small>{this.getVideoTitle()}</PlayerTitle>}
            <ButtonWrapper>
              {isEmbed && (
                <ShareButton>
                  <IconButton
                    color={
                      activePlugin === PLAYER_PLUGIN.WALLET ? Colors.purple : ''
                    }
                    icon="/assets/img/profile.svg"
                    onClick={(e: Object) => {
                      e.stopPropagation()
                      toggleActivePlugin(PLAYER_PLUGIN.WALLET)
                    }}
                  />
                </ShareButton>
              )}
              {!this.props.showShareModal && (
                <ShareButton
                  onClick={(e: Object) => {
                    e.stopPropagation()
                    toggleShareModal(e)
                  }}
                >
                  <SVGIcon icon="icon-player-share" color="white" />
                </ShareButton>
              )}
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
