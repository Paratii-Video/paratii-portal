/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import VideoRecord from 'records/VideoRecords'
import IconButton from 'components/foundations/buttons/IconButton'
import { TRANSITION_STATE } from 'constants/ApplicationConstants'

import type { TransitionState } from 'types/ApplicationTypes'

type Props = {
  video: ?VideoRecord,
  videoContainerRef: ?HTMLElement,
  isPlaying: boolean,
  togglePlayPause: () => void,
  transitionState: TransitionState,
  currentTimeSeconds: number,
  currentBufferedTimeSeconds: number,
  onScrub: (percentage: number) => void
}

type State = {
  userIsScrubbing: boolean,
  scrubbingPositionPercentage: number
}

const CONTROLS_HEIGHT: string = '75px'
const CONTROL_BUTTONS_HEIGHT: string = '50px'

const Controls = styled.div`
  flex: 0 0 ${CONTROLS_HEIGHT};
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
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

const PROGRESS_INDICATOR_DIMENSION: number = 20

const ProgressIndicator = styled.div`
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

/* prettier-ignore */
const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  display: flex;
  justify-content: flex-end;  
  align-items: center;
  background: linear-gradient(to right, ${({ theme }) => `${theme.colors.VideoPlayer.progress.barFrom}, ${theme.colors.VideoPlayer.progress.barTo}`});
  ${/* sc-selector */ProgressIndicator} {
    left: ${({ currentTime, totalDuration, scrubbingPositionPercentage }) => {
    if (scrubbingPositionPercentage) {
      return `calc(${scrubbingPositionPercentage}% - ${PROGRESS_INDICATOR_DIMENSION / 2}px)`
    }
    return `${!totalDuration ? 0 : Math.max(0, Math.min(100, (currentTime * 100 / totalDuration)))}%`
  }};
  }
  ${/* sc-selector */ProgressBuffer} {
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

const ControlButtonWrapper = styled.div`
  width: 25px;
  height: 25px;
  `

class PlayerControls extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      userIsScrubbing: false,
      scrubbingPositionPercentage: 0
    }
  }

  componentWillReceiveProps (nextProps: Props): void {
    if (nextProps.videoContainerRef && !this.props.videoContainerRef) {
      this.addMouseEventListeners(nextProps.videoContainerRef)
    }
  }

  componentWillUnmount (): void {
    this.removeMouseEventListeners()
  }

  onMouseUp = (e: Object): void => {
    this.setState((prevState: State) => {
      if (prevState.userIsScrubbing) {
        return {
          userIsScrubbing: false,
          scrubbingPositionPercentage: 0
        }
      }
    })
  }

  onMouseMove = (e: Object): void => {
    const { onScrub, videoContainerRef } = this.props
    this.setState((prevState: State) => {
      if (prevState.userIsScrubbing && videoContainerRef) {
        const wrapperRect: Object = videoContainerRef.getBoundingClientRect()
        const newScrubbingPositionPercentage: number =
          (e.clientX - wrapperRect.x) * 100 / wrapperRect.width
        onScrub(newScrubbingPositionPercentage)
        return {
          scrubbingPositionPercentage: newScrubbingPositionPercentage
        }
      }
    })
  }

  addMouseEventListeners (videoContainerRef: HTMLElement): void {
    if (videoContainerRef) {
      videoContainerRef.addEventListener('mouseup', this.onMouseUp)
      videoContainerRef.addEventListener('mousemove', this.onMouseMove)
    }
  }

  removeMouseEventListeners (): void {
    const { videoContainerRef } = this.props
    if (videoContainerRef) {
      videoContainerRef.removeEventListener('mouseup', this.onMouseUp)
      videoContainerRef.removeEventListener('mousemove', this.onMouseMove)
    }
  }

  getVideoTitle (): string {
    const { video } = this.props

    return (video && video.get('title')) || 'Video Title'
  }

  render () {
    const {
      isPlaying,
      togglePlayPause,
      transitionState,
      currentTimeSeconds,
      currentBufferedTimeSeconds,
      video
    } = this.props
    const { scrubbingPositionPercentage } = this.state
    return (
      <Controls transitionState={transitionState}>
        <ProgressBar
          currentTime={currentTimeSeconds}
          scrubbingPositionPercentage={scrubbingPositionPercentage}
          bufferTime={currentBufferedTimeSeconds}
          totalDuration={(video && video.get('duration')) || 0}
        >
          <ProgressBuffer
            bufferTime={currentBufferedTimeSeconds}
            totalDuration={currentBufferedTimeSeconds}
          />
          <ProgressIndicator
            onMouseDown={() =>
              this.setState({
                userIsScrubbing: true
              })
            }
          />
        </ProgressBar>
        <ControlButtons>
          <ControlButtonWrapper>
            <IconButton
              icon={`/assets/img/${isPlaying ? 'pause-icon' : 'play-icon'}.svg`}
              onClick={(e: Object) => {
                e.stopPropagation()
                togglePlayPause()
              }}
            />
          </ControlButtonWrapper>
        </ControlButtons>
      </Controls>
    )
  }
}

export default PlayerControls
