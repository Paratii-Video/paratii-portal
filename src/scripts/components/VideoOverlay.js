/* @flow */

import React, { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'

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
  isStartScreen?: boolean,
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

const Z_INDEX_OVERLAY: string = '1'
const Z_INDEX_CONTROLS: string = '2'
const Z_INDEX_OVERLAY_SHADOW: string = '1'
const Z_INDEX_CENTRALIZEDCONTENT: string = '2'
const Z_INDEX_TITLE: string = '3'
const Z_INDEX_BUTTONS: string = '4'

const ShowHideTopElements = css`
  transform: translate3d(
    0,
    ${({ transitionState, showShareModal }) =>
    transitionState === TRANSITION_STATE.ENTERED && !showShareModal
      ? '0'
      : '-100%'},
    0
  );
  transition: transform 0.45s ${({ theme }) => theme.animation.ease.smooth};
`

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`

const PlayerControlsWrapper = styled.div`
  bottom: 0;
  pointer-events: ${props => (props.isStartScreen ? 'none' : null)};
  position: absolute;
  width: 100%;
  z-index: ${Z_INDEX_CONTROLS};
`

const Overlay = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  z-index: ${Z_INDEX_OVERLAY};
`

const OverlayShadow = styled.span`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  height: 100%;
  opacity: ${({ transitionState, showShareModal }) =>
    transitionState === TRANSITION_STATE.ENTERED && !showShareModal ? 1 : 0};
  position: absolute;
  transition: opacity 0.45s;
  width: 100%;
  z-index: ${Z_INDEX_OVERLAY_SHADOW};
`

const PlayerTitle = Title.extend`
  ${ShowHideTopElements} align-self: flex-start;
  color: ${props => props.theme.colors.VideoPlayer.header.title};
  flex: 1 0;
  font-size: ${props => props.theme.fonts.title.big};
  padding: 20px 0 0 25px;
  position: relative;
  z-index: ${Z_INDEX_TITLE};

  @media (max-width: 1024px) {
    font-size: ${props => props.theme.fonts.title.small};
  }

  @media (max-width: 768px) {
    font-size: ${props => props.theme.fonts.text.big};
  }
`

const ButtonWrapper = styled.div`
  ${ShowHideTopElements} align-self: flex-start;
  display: flex;
  flex: 0;
  flex-direction: row;
  justify-content: flex-end;
  padding: 22px 25px 0 0;
  position: relative;
  z-index: ${Z_INDEX_BUTTONS};
`

const ShareButton = Button.extend`
  height: ${OVERLAY_BUTTONS_HEIGHT};
  margin-left: 10px;
  width: 26px;

  @media (max-width: 768px) {
    width: 20px;
  }
`

const ProfileButtonWrapper = styled.div`
  height: ${OVERLAY_BUTTONS_HEIGHT};
  margin-left: 10px;
  width: 26px;

  @media (max-width: 768px) {
    width: 20px;
  }
`

const CentralizedContent = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${Z_INDEX_CENTRALIZEDCONTENT};
`

const StartScreenIcon = styled.span`
  height: 20%;
  opacity: ${props => (props.isStartScreen ? 1 : 0)};
  transition: transform 0.3s ${props => props.theme.animation.ease.smooth};
  ${Overlay}:hover & {
    transform: scale(0.9);
  }
`

const StartScreenSVG = styled.svg`
  fill: ${Colors.white};
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
      isStartScreen,
      onClick,
      onScrub,
      onVolumeChange,
      onToggleMute,
      onPlaybackLevelChange,
      togglePlayPause,
      toggleShareModal,
      toggleFullscreen,
      toggleActivePlugin,
      transitionState,
      showShareModal
    } = this.props
    return (
      <Wrapper data-test-id="video-overlay">
        {this.renderPlugins()}
        <OverlayShadow
          transitionState={transitionState}
          showShareModal={showShareModal}
        />
        <Overlay
          data-test-id="video-overlay"
          onClick={onClick}
          transitionState={transitionState}
          showShareModal={showShareModal}
        >
          {isEmbed && (
            <PlayerTitle
              small
              transitionState={transitionState}
              showShareModal={showShareModal}
            >
              {this.getVideoTitle()}
            </PlayerTitle>
          )}
          <ButtonWrapper
            transitionState={transitionState}
            showShareModal={showShareModal}
          >
            {isEmbed && (
              <ProfileButtonWrapper>
                <IconButton
                  color={
                    activePlugin === PLAYER_PLUGIN.WALLET ? Colors.purple : ''
                  }
                  data-test-id="wallet-info-button"
                  icon="/assets/img/profile.svg"
                  onClick={(e: Object) => {
                    e.stopPropagation()
                    toggleActivePlugin(PLAYER_PLUGIN.WALLET)
                  }}
                />
              </ProfileButtonWrapper>
            )}
            <ShareButton
              data-test-id="share-button"
              onClick={(e: Object) => {
                e.stopPropagation()
                toggleShareModal(e)
              }}
            >
              <SVGIcon icon="icon-player-share" color="white" />
            </ShareButton>
          </ButtonWrapper>
          <CentralizedContent
            transitionState={transitionState}
            showShareModal={showShareModal}
          >
            {isEmbed && (
              <StartScreenIcon isStartScreen={isStartScreen}>
                <StartScreenSVG>
                  <use xlinkHref="#icon-player-play" />
                </StartScreenSVG>
              </StartScreenIcon>
            )}
          </CentralizedContent>
        </Overlay>
        <PlayerControlsWrapper isStartScreen={isStartScreen}>
          <PlayerControlsContainer
            onScrub={onScrub}
            onVolumeChange={onVolumeChange}
            onToggleMute={onToggleMute}
            onPlaybackLevelChange={onPlaybackLevelChange}
            togglePlayPause={togglePlayPause}
            toggleFullscreen={toggleFullscreen}
            transitionState={transitionState}
            showShareModal={showShareModal}
            isStartScreen={isStartScreen}
          />
        </PlayerControlsWrapper>
      </Wrapper>
    )
  }
}

export default VideoOverlay
