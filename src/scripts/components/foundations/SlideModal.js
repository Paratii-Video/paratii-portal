/* @flow */

import React from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

import IconButton from 'components/foundations/buttons/IconButton'
import { TRANSITION_STATE } from 'constants/ApplicationConstants'

const padding: string = '15px'

const Wrapper = styled.div`
  cursor: default;
  position: absolute;
  padding: ${padding};
  background-color: ${({ theme }) => theme.colors.SlideModal.background};
  color: ${({ theme }) => theme.colors.SlideModal.text};
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

const CloseButton = styled.div`
  height: 15px;
  width: 15px;
  position: absolute;
  top: ${padding};
  right: ${padding};
`

type Props = {
  open: boolean,
  onClose: () => void,
  children: any
}

const SlideModal = ({ onClose, open, children }: Props) => (
  <Transition in={open} timeout={0}>
    {(transitionState: ?string) => (
      <Wrapper transitionState={transitionState}>
        <CloseButton>
          <IconButton icon="/assets/img/close-icon.svg" onClick={onClose} />
        </CloseButton>
        {children}
      </Wrapper>
    )}
  </Transition>
)

export default SlideModal
