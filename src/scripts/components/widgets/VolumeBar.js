/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  onVolumeChange: (percentage: number) => void,
  currentVolume: number
}

type State = {
  userIsDragging: boolean,
  draggingVolumePercentage: number
}

const VOLUME_INDICATOR_DIMENSION: number = 20

const VolumeIndicator = styled.div.attrs({
  style: ({ currentVolume, draggingVolumePercentage }) => ({
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
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.colors.VideoPlayer.progress.scrubber};
`

const VolumeBarBuffer = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  align-items: center;
`

/* prettier-ignore */
const VolumeBar = styled.div`
  height: 5px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;  
  align-items: center;
  background: linear-gradient(to right, ${({ theme }) => `${theme.colors.VideoPlayer.progress.barFrom}, ${theme.colors.VideoPlayer.progress.barTo}`});
  }
  `

class PlayerControls extends Component<Props, State> {
  volumeBarRef: ?HTMLElement

  constructor (props: Props) {
    super(props)

    this.state = {
      userIsDragging: false,
      draggingVolumePercentage: 0
    }

    this.addMouseEventListeners()
  }

  componentWillUnmount (): void {
    this.removeMouseEventListeners()
  }

  onMouseUp = (e: Object): void => {
    this.setState((prevState: State) => {
      if (prevState.userIsDragging) {
        e.stopPropagation()
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

  addMouseEventListeners (): void {
    window.addEventListener('mouseup', this.onMouseUp)
    window.addEventListener('mousemove', this.onMouseMove)
  }

  removeMouseEventListeners (): void {
    window.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('mousemove', this.onMouseMove)
  }

  render () {
    const { onVolumeChange, currentVolume } = this.props
    const { draggingVolumePercentage } = this.state
    return (
      <VolumeBarBuffer
        onClick={(e: Object) => {
          if (this.volumeBarRef) {
            const wrapperRect: Object = this.volumeBarRef.getBoundingClientRect()
            onVolumeChange(
              (e.clientX - wrapperRect.x) * 100 / wrapperRect.width
            )
          }
        }}
      >
        <VolumeBar
          innerRef={(ref: HTMLElement) => {
            this.volumeBarRef = ref
          }}
        >
          <VolumeIndicator
            currentVolume={currentVolume}
            draggingVolumePercentage={draggingVolumePercentage}
            onMouseDown={() => {
              this.setState({
                userIsDragging: true
              })
            }}
          />
        </VolumeBar>
      </VolumeBarBuffer>
    )
  }
}

export default PlayerControls
