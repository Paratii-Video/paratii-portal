/* @flow */

import React from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

import { Z_INDEX_POPUPS } from 'constants/UIConstants'
import { TRANSITION_STATE } from 'constants/ApplicationConstants'

import type { TransitionState } from 'types/ApplicationTypes'

type Props = {
  top: number | string,
  left: number | string,
  bottom: number | string,
  right: number | string,
  children: any,
  open: boolean,
  style?: Object,
  'data-test-id'?: string
}

const Wrapper = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.Popover.background};
  color: ${({ theme }) => theme.colors.Popover.color};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  margin: 20px;
  overflow: hidden;
  opacity: ${({ transitionState }) => {
    switch (transitionState) {
      case TRANSITION_STATE.ENTERING:
      case TRANSITION_STATE.EXITING:
        return 0
      case TRANSITION_STATE.ENTERED:
      default:
        return 1
    }
  }};
  transform: translateY(
    ${({ transitionState }) => {
    switch (transitionState) {
      case TRANSITION_STATE.ENTERED:
        return 0
      case TRANSITION_STATE.ENTERING:
      case TRANSITION_STATE.EXITING:
      default:
        return '40px'
    }
  }}
  );
  transition: all 0.45s ${({ theme }) => theme.animation.ease.smooth};
  z-index: ${Z_INDEX_POPUPS};
  user-select: none;

  @media (max-height: 400px) {
    bottom: 0;
    height: calc(100% - 10px);
    margin: 5px;
    top: 0;
    transform: translateY(0);
    width: calc(100% - 10px);
  }
`

class Popover extends React.Component<Props, void> {
  static defaultProps = {
    top: '',
    bottom: '',
    left: '',
    right: ''
  }

  render () {
    const { open, top, left, bottom, right } = this.props
    return (
      <Transition in={open} timeout={50} unmountOnExit>
        {(transitionState: TransitionState) => (
          <Wrapper
            data-test-id={this.props['data-test-id']}
            onClick={(e: Object) => e.stopPropagation()}
            transitionState={transitionState}
            top={top}
            left={left}
            bottom={bottom}
            right={right}
          >
            {this.props.children}
          </Wrapper>
        )}
      </Transition>
    )
  }
}

export default Popover
