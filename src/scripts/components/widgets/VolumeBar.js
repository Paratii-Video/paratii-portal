/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

import IconButton from 'components/foundations/buttons/IconButton'
import { TRANSITION_STATE } from 'constants/ApplicationConstants'

import {
  CONTROLS_BUTTON_DIMENSION,
  CONTROLS_SPACING
} from 'constants/UIConstants'

import type { TransitionState } from 'types/ApplicationTypes'

import volumeIcon from 'assets/img/volume-icon.svg'
import muteIcon from 'assets/img/mute-icon.svg'

type Props = {
  onVolumeChange: (percentage: number) => void,
  onToggleMute: () => void,
  currentVolume: number
}

type State = {
  open: boolean,
  userIsDragging: boolean,
  draggingVolumePercentage: number
}

const VOLUME_INDICATOR_DIMENSION: number = 15
const TRANSITION_DURATION: string = '250ms'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${CONTROLS_SPACING};
  min-width: ${CONTROLS_BUTTON_DIMENSION};
`

const ButtonWrapper = styled.div`
  display: flex;
  flex: 0 0 17px;
  height: 17px;
  cursor: pointer;
  margin-right: 10px;
`

const VolumeBarBuffer = styled.div`
  cursor: pointer;
  height: 20px;
  width: ${({ transitionState }) => {
    switch (transitionState) {
      case TRANSITION_STATE.ENTERING:
      case TRANSITION_STATE.EXITING:
        return 0
      case TRANSITION_STATE.ENTERED:
      default:
        return '100px'
    }
  }};
  width: 100px;
  transition: all ${TRANSITION_DURATION}
    ${({ theme }) => theme.animation.ease.smooth};
  display: flex;
  align-items: center;
`

const VolumeIndicator = styled.div.attrs({
  style: ({ currentVolume, draggingVolumePercentage, transitionState }) => ({
    transform: `scale(${
      transitionState === TRANSITION_STATE.ENTERED ? 1.0 : 1.0
    })`,
    left: draggingVolumePercentage
      ? `calc(${Math.max(
        0,
        Math.min(100, draggingVolumePercentage)
      )}% - ${VOLUME_INDICATOR_DIMENSION / 2}px)`
      : `calc(${Math.max(
        0,
        Math.min(100, currentVolume)
      )}% - ${VOLUME_INDICATOR_DIMENSION / 2}px)`
  })
})`
  position: absolute;
  width: ${VOLUME_INDICATOR_DIMENSION}px;
  height: ${VOLUME_INDICATOR_DIMENSION}px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.bar.scrubber};
    border-radius: 50%;
  }

  &::before {
    opacity: 0.5;
    transform: scale(${props => (props.userIsScrubbing ? 1 : 0.5)});
    transition: transform ${props => (props.userIsScrubbing ? '1s' : '0.8s')}
      ${({ theme }) => theme.animation.ease.smooth};
    ${VolumeBarBuffer}:hover & {
      transform: scale(1);
    }
  }

  &::after {
    transform: scale(${props => (props.userIsScrubbing ? 0.6 : 0.5)});
    transition: transform ${props => (props.userIsScrubbing ? '0.7s' : '0.5s')}
      ${({ theme }) => theme.animation.ease.smooth};
  }
`

/* prettier-ignore */
const VolumeBar = styled.div`
  height: 2px;
  width: 100%;
  border-radius: 3px;
  position: relative;
  display: flex;
  justify-content: flex-end;  
  align-items: center;
  background: linear-gradient(to right, ${({ theme }) => `${theme.colors.bar.from}, ${theme.colors.bar.to}`});
  `

const VolumeRemaining = styled.div.attrs({
  style: ({ currentVolume }) => ({
    width: `${100 - currentVolume}%`
  })
})`
  position: absolute;
  border-radius: 3px;
  right: 0;
  height: 100%;
  background: ${({ theme }) => theme.colors.bar.base};
`

class PlayerControls extends Component<Props, State> {
  volumeBarRef: ?HTMLElement
  remainOpenTimeoutMS: number = 2000
  remainOpenTimeoutId: number = -1
  lastUserInteractionTimestamp: number = 0

  constructor (props: Props) {
    super(props)

    this.state = {
      draggingVolumePercentage: 0,
      open: false,
      userIsDragging: false
    }

    this.addMouseEventListeners()
  }

  componentWillUnmount (): void {
    this.removeMouseEventListeners()
  }

  markLastUserInteraction = () => {
    this.lastUserInteractionTimestamp = Date.now()

    clearTimeout(this.remainOpenTimeoutId)
    setTimeout(() => {
      this.setState((prevState: State) => {
        if (
          Date.now() - this.lastUserInteractionTimestamp >
          this.remainOpenTimeoutMS
        ) {
          return {
            open: false
          }
        } else {
          return { open: true }
        }
      })
    }, this.remainOpenTimeoutMS)
  }

  onMouseEnter = (e: Object): void => {
    this.markLastUserInteraction()
    this.setState({
      open: true
    })
  }

  onMouseUp = (e: Object): void => {
    this.setState((prevState: State) => {
      if (prevState.userIsDragging) {
        e.stopPropagation()
        this.markLastUserInteraction()
        return {
          userIsDragging: false,
          draggingVolumePercentage: 0
        }
      }
    })
  }

  onMouseMove = (e: Object): void => {
    const { onVolumeChange } = this.props
    const { volumeBarRef } = this
    this.setState((prevState: State) => {
      if (prevState.userIsDragging && volumeBarRef) {
        this.markLastUserInteraction()
        const wrapperRect: Object = volumeBarRef.getBoundingClientRect()
        const draggingVolumePercentage: number =
          (e.clientX - wrapperRect.x) * 100 / wrapperRect.width
        onVolumeChange(draggingVolumePercentage)
        return {
          draggingVolumePercentage: draggingVolumePercentage
        }
      }
    })
  }

  onMouseMoveWithinVolumeBar = () => {
    this.markLastUserInteraction()
  }

  addMouseEventListeners (): void {
    window.addEventListener('mouseup', this.onMouseUp)
    window.addEventListener('mousemove', this.onMouseMove)
  }

  removeMouseEventListeners (): void {
    window.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('mousemove', this.onMouseMove)
  }

  render () {
    const { onVolumeChange, currentVolume, onToggleMute } = this.props
    const { draggingVolumePercentage, open } = this.state
    return (
      <Wrapper
        onClick={this.markLastUserInteraction}
        onMouseEnter={this.onMouseEnter}
        onMouseMove={this.onMouseMoveWithinVolumeBar}
      >
        <ButtonWrapper>
          <IconButton
            icon={currentVolume === 0 ? muteIcon : volumeIcon}
            onClick={() => onToggleMute()}
          />
        </ButtonWrapper>
        <Transition in={open} timeout={250} unmountOnExit>
          {(transitionState: TransitionState) => (
            <VolumeBarBuffer
              onClick={(e: Object) => {
                if (this.volumeBarRef) {
                  const wrapperRect: Object = this.volumeBarRef.getBoundingClientRect()
                  onVolumeChange(
                    (e.clientX - wrapperRect.x) * 100 / wrapperRect.width
                  )
                }
              }}
              transitionState={transitionState}
            >
              <VolumeBar
                innerRef={(ref: HTMLElement) => {
                  this.volumeBarRef = ref
                }}
              >
                <VolumeRemaining currentVolume={currentVolume} />
                <VolumeIndicator
                  currentVolume={currentVolume}
                  draggingVolumePercentage={draggingVolumePercentage}
                  onMouseDown={() => {
                    this.setState({
                      userIsDragging: true
                    })
                  }}
                  transitionState={transitionState}
                  userIsScrubbing={this.state.userIsDragging}
                />
              </VolumeBar>
            </VolumeBarBuffer>
          )}
        </Transition>
      </Wrapper>
    )
  }
}

export default PlayerControls
