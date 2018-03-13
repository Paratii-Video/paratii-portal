/* @flow */

import React from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

import { TRANSITION_STATE } from 'constants/ApplicationConstants'

const Wrapper = styled.div`
  position: absolute;
  background-color: black;
  bottom: ${({ transitionState }) => {
    switch (transitionState) {
      case TRANSITION_STATE.ENTERING:
      case TRANSITION_STATE.EXITED:
        return '0'
      case TRANSITION_STATE.EXITING:
      case TRANSITION_STATE.ENTERED:
      default:
        return '100%'
    }
  }};
  opacity: ${({ transitionState }) => {
    switch (transitionState) {
      case TRANSITION_STATE.ENTERING:
      case TRANSITION_STATE.EXITED:
        return 0
      case TRANSITION_STATE.EXITING:
      case TRANSITION_STATE.ENTERED:
      default:
        return 1.0
    }
  }};
  left: 0;
  width: 100%;
  transition: all 250ms ${({ theme }) => theme.animation.ease.smooth};
`

type Props = {
  open: boolean,
  children: any
}

const SlideModal = ({ open, children }: Props) => (
  <Transition in={open}>
    {(transitionState: ?string) => (
      <Wrapper transitionState={transitionState}>{children}</Wrapper>
    )}
  </Transition>
)

export default SlideModal
