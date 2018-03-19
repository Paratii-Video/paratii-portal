/* @flow */

import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { List as ImmutableList } from 'immutable'

import { PlaybackLevel } from 'records/PlayerRecords'
import VideoRecord from 'records/VideoRecords'
import VolumeBar from 'components/widgets/VolumeBar'
import PlaybackLevels from 'components/widgets/PlaybackLevels'
import IconButton from 'components/foundations/buttons/IconButton'
import Colors from 'components/foundations/base/Colors'
import { TRANSITION_STATE } from 'constants/ApplicationConstants'
import { PLAYER_PLUGIN } from 'constants/PlayerConstants'
import { CONTROLS_HEIGHT } from 'constants/UIConstants'

import playIcon from 'assets/img/play-icon.svg'
import pauseIcon from 'assets/img/pause-icon.svg'
import volumeIcon from 'assets/img/volume-icon.svg'
import muteIcon from 'assets/img/mute-icon.svg'
import normalscreenIcon from 'assets/img/normalscreen-icon.svg'
import fullscreenIcon from 'assets/img/fullscreen-icon.svg'
import qualityIcon from 'assets/img/quality-icon.svg'

import type { TransitionState, PlayerPlugin } from 'types/ApplicationTypes'

type Props = {
  video: ?VideoRecord,
  videoDurationSeconds: number,
  isPlaying: boolean,
  isFullscreen: boolean,
  togglePlayPause: () => void,
  transitionState: TransitionState,
  currentTimeSeconds: number,
  currentBufferedTimeSeconds: number,
  currentVolume: number,
  onVolumeChange: (percentage: number) => void,
  onToggleMute: (mute: boolean) => void,
  onScrub: (percentage: number) => void,
  toggleFullscreen: (goToFullscreen: boolean) => void,
  formattedCurrentTime: string,
  formattedDuration: string,
  playbackLevels: ImmutableList<PlaybackLevel>,
  currentPlaybackLevel: ?PlaybackLevel,
  onPlaybackLevelChange: (levelId: number) => void,
  activePlugin: ?PlayerPlugin,
  setActivePlugin: (nextPlugin: ?PlayerPlugin) => void
}

type State = {
  userIsScrubbing: boolean,
  scrubbingPositionPercentage: number
}

const CONTROL_BUTTONS_HEIGHT: string = '50px'
const CONTROLS_SPACING: string = '20px'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 ${CONTROLS_HEIGHT};
`

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%
  align-items: center;
  background: ${({ theme }) => theme.colors.VideoPlayer.controls.background};
  transform: translateY(
    ${({ transitionState }) => {
    switch (transitionState) {
      case TRANSITION_STATE.ENTERING:
      case TRANSITION_STATE.EXITED:
        return `calc(${CONTROLS_HEIGHT} + ${PROGRESS_INDICATOR_DIMENSION}px)`
      case TRANSITION_STATE.EXITING:
      case TRANSITION_STATE.ENTERED:
      default:
        return 0
    }
  }}
  );
  transition: all 250ms linear;
  `

const PROGRESS_INDICATOR_DIMENSION: number = 20

const ProgressIndicator = styled.div.attrs({
  style: ({ currentTime, totalDuration, scrubbingPositionPercentage }) => ({
    left: scrubbingPositionPercentage
      ? `calc(${Math.max(
        0,
        Math.min(scrubbingPositionPercentage, 100)
      )}% - ${PROGRESS_INDICATOR_DIMENSION / 2}px)`
      : `calc(${
        !totalDuration
          ? 0
          : Math.max(0, Math.min(100, currentTime * 100 / totalDuration))
      }% - ${PROGRESS_INDICATOR_DIMENSION / 2}px)`
  })
})`
  position: absolute;
  width: ${PROGRESS_INDICATOR_DIMENSION}px;
  height: ${PROGRESS_INDICATOR_DIMENSION}px;
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.colors.VideoPlayer.progress.scrubber};
  `

const ProgressBuffer = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  background: ${({ theme }) => theme.colors.VideoPlayer.progress.base};
  `

const ProgressBarWrapper = styled.div`
  position: absolute;
  top: -10px;
  height: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  `

/* prettier-ignore */
const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  display: flex;
  justify-content: flex-end;  
  align-items: center;
  background: linear-gradient(to right, ${({ theme }) => `${theme.colors.VideoPlayer.progress.barFrom}, ${theme.colors.VideoPlayer.progress.barTo}`});
  ${/* sc-custom */ProgressBuffer} {
    flex-basis: ${({ bufferTime, totalDuration }) => 100 - (!totalDuration ? 0 : Math.max(0, Math.min(100, bufferTime * 100 / totalDuration)))}%
  }
  `

const ControlButtons = styled.div`
  width: 100%;
  flex: 1 1 ${CONTROL_BUTTONS_HEIGHT};
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  height: ${CONTROL_BUTTONS_HEIGHT};
  `

const LeftControls = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  `

const RightControls = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  `

const Time = styled.div`
  color: ${({ theme }) => theme.colors.VideoPlayer.controls.time};
  margin-right: ${CONTROLS_SPACING};
  `

const VolumeBarWrapper = styled.div`
  position: relative;
  width: 200px;
  margin-left: calc(-${CONTROLS_SPACING} / 2);
  margin-right: ${CONTROLS_SPACING};
  `

const ControlButtonWrapper = styled.div`
  width: 25px;
  height: 25px;
  &:not(:last-child) {
    margin-right: ${CONTROLS_SPACING};
  }
  `

class PlayerControls extends Component<Props, State> {
  progressBarRef: ?HTMLElement

  constructor (props: Props) {
    super(props)

    this.state = {
      userIsScrubbing: false,
      scrubbingPositionPercentage: 0
    }

    this.addMouseEventListeners()
  }

  componentWillUnmount (): void {
    this.removeMouseEventListeners()
  }

  onMouseUp = (e: Object): void => {
    this.setState((prevState: State) => {
      if (prevState.userIsScrubbing) {
        e.stopPropagation()
        return {
          userIsScrubbing: false,
          scrubbingPositionPercentage: 0
        }
      }
    })
  }

  onMouseMove = (e: Object): void => {
    const { onScrub } = this.props
    const { progressBarRef } = this
    this.setState((prevState: State) => {
      if (prevState.userIsScrubbing && progressBarRef) {
        const wrapperRect: Object = progressBarRef.getBoundingClientRect()
        const newScrubbingPositionPercentage: number =
          (e.clientX - wrapperRect.x) * 100 / wrapperRect.width
        onScrub(newScrubbingPositionPercentage)
        return {
          scrubbingPositionPercentage: newScrubbingPositionPercentage
        }
      }
    })
  }

  addMouseEventListeners (): void {
    window.addEventListener('mouseup', this.onMouseUp)
    window.addEventListener('mousemove', this.onMouseMove)
  }

  removeMouseEventListeners (): void {
    window.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('mousemove', this.onMouseMove)
  }

  getVideoTitle (): string {
    const { video } = this.props

    return (video && video.get('title')) || 'Video Title'
  }

  isMuted (): boolean {
    const { currentVolume } = this.props

    return currentVolume === 0
  }

  setActivePlugin = (nextPlugin: PlayerPlugin): void => {
    const { activePlugin, setActivePlugin } = this.props

    setActivePlugin(
      !nextPlugin || nextPlugin === activePlugin ? null : nextPlugin
    )
  }

  renderPlugins () {
    const {
      activePlugin,
      currentPlaybackLevel,
      onPlaybackLevelChange,
      playbackLevels
    } = this.props

    return (
      <Fragment>
        <PlaybackLevels
          open={activePlugin === PLAYER_PLUGIN.PLAYBACK_LEVELS}
          currentPlaybackLevel={currentPlaybackLevel}
          playbackLevels={playbackLevels}
          onPlaybackLevelChange={onPlaybackLevelChange}
          onClose={() => this.setActivePlugin()}
        />
      </Fragment>
    )
  }

  render () {
    const {
      activePlugin,
      isPlaying,
      isFullscreen,
      onScrub,
      onVolumeChange,
      onToggleMute,
      currentVolume,
      togglePlayPause,
      toggleFullscreen,
      transitionState,
      currentTimeSeconds,
      currentBufferedTimeSeconds,
      formattedCurrentTime,
      formattedDuration,
      videoDurationSeconds,
      playbackLevels
    } = this.props
    const { scrubbingPositionPercentage } = this.state

    return (
      <Wrapper>
        {this.renderPlugins()}
        <Controls transitionState={transitionState}>
          <ProgressBarWrapper
            onClick={(e: Object) => {
              if (this.progressBarRef) {
                const wrapperRect: Object = this.progressBarRef.getBoundingClientRect()
                onScrub((e.clientX - wrapperRect.x) * 100 / wrapperRect.width)
              }
            }}
          >
            <ProgressBar
              innerRef={(ref: HTMLElement) => {
                this.progressBarRef = ref
              }}
              bufferTime={currentBufferedTimeSeconds}
              totalDuration={videoDurationSeconds}
            >
              <ProgressBuffer
                bufferTime={currentBufferedTimeSeconds}
                totalDuration={currentBufferedTimeSeconds}
              />
              <ProgressIndicator
                currentTime={currentTimeSeconds}
                onMouseDown={() => {
                  this.setState({
                    userIsScrubbing: true
                  })
                }}
                scrubbingPositionPercentage={scrubbingPositionPercentage}
                totalDuration={videoDurationSeconds}
              />
            </ProgressBar>
          </ProgressBarWrapper>
          <ControlButtons>
            <LeftControls>
              <ControlButtonWrapper>
                <IconButton
                  color={Colors.purple}
                  icon={isPlaying ? pauseIcon : playIcon}
                  onClick={togglePlayPause}
                />
              </ControlButtonWrapper>
              <Time>{`${formattedCurrentTime} / ${formattedDuration}`}</Time>
            </LeftControls>
            <RightControls>
              <ControlButtonWrapper>
                <IconButton
                  color={
                    activePlugin === PLAYER_PLUGIN.PLAYBACK_LEVELS
                      ? Colors.purple
                      : undefined
                  }
                  disabled={!playbackLevels.size}
                  icon={qualityIcon}
                  onClick={() => {
                    this.setActivePlugin(PLAYER_PLUGIN.PLAYBACK_LEVELS)
                  }}
                />
              </ControlButtonWrapper>
              <ControlButtonWrapper>
                <IconButton
                  icon={currentVolume === 0 ? muteIcon : volumeIcon}
                  onClick={() => {
                    onToggleMute(!this.isMuted())
                  }}
                />
              </ControlButtonWrapper>
              <VolumeBarWrapper>
                <VolumeBar
                  onVolumeChange={onVolumeChange}
                  currentVolume={currentVolume}
                />
              </VolumeBarWrapper>
              <ControlButtonWrapper>
                <IconButton
                  icon={isFullscreen ? normalscreenIcon : fullscreenIcon}
                  onClick={() => {
                    toggleFullscreen(!isFullscreen)
                  }}
                />
              </ControlButtonWrapper>
            </RightControls>
          </ControlButtons>
        </Controls>
      </Wrapper>
    )
  }
}

export default PlayerControls
