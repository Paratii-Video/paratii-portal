/* @flow */

import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { List as ImmutableList } from 'immutable'

import IconButton from 'components/foundations/buttons/IconButton'
import Title from 'components/foundations/Title'
import TruncatedText from 'components/foundations/TruncatedText'
import PlaybackLevels from 'components/widgets/PlaybackLevels'
import WalletInfoContainer from 'containers/widgets/WalletInfoContainer'
import PlayerControlsContainer from 'containers/PlayerControlsContainer'
import VideoRecord from 'records/VideoRecords'
import { TRANSITION_STATE } from 'constants/ApplicationConstants'
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

const CONTROLS_HEIGHT: string = '75px'

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
  flex: 0 0 75%;
  max-width: 75%;
`

const ButtonGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  justify-content: flex-end;
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  height: ${OVERLAY_BUTTONS_HEIGHT};
`

const ButtonWrapper = styled.div`
  width: 25px;
  height: 25px;
  margin-left: 20px;
`

const SVGButton = styled.svg`
  fill: ${props => props.theme.colors.VideoPlayer.header.icons};
  display: block;
  height: 100%;
  width: 100%;
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
      <Wrapper>
        {this.renderPlugins()}
        <Overlay
          data-test-id="video-overlay"
          onClick={onClick}
          transitionState={transitionState}
        >
          <VideoInfo transitionState={transitionState}>
            <PlayerTitle small>
              <TruncatedText>{this.getVideoTitle()}</TruncatedText>
            </PlayerTitle>
            <ButtonGroup>
              {isEmbed && (
                <ButtonWrapper>
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
                </ButtonWrapper>
              )}
              {!this.props.showShareModal && (
                <ButtonWrapper>
                  <SVGButton
                    onClick={(e: Object) => {
                      e.stopPropagation()
                      toggleShareModal(e)
                    }}
                  >
                    <use xlinkHref="#icon-player-share" />
                  </SVGButton>
                </ButtonWrapper>
              )}
            </ButtonGroup>
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
