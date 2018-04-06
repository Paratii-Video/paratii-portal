/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import { Z_INDEX_MODAL } from 'constants/UIConstants'
import Button from 'components/foundations/Button'

import ModalStake from 'containers/widgets/modals/ModalStakeContainer' // need to receive any content
import ModalSecure from 'containers/widgets/modals/ModalSecureContainer'
import ModalShowSeed from 'containers/widgets/modals/ModalShowSeedContainer'
import ModalRewriteSeed from 'containers/widgets/modals/ModalRewriteSeedContainer'
import ModalRestoreAccount from 'containers/widgets/modals/ModalRestoreAccountContainer'
import ModalSetPin from 'containers/widgets/modals/ModalSetPinContainer'
import ModalAskPin from 'containers/widgets/modals/ModalAskPinContainer'

import { MODAL } from 'constants/ModalConstants'

type Props = {
  modalContent: string,
  showModal: boolean,
  closeModal: () => null
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  pointer-events: ${props => (props.show ? '' : 'none')};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${Z_INDEX_MODAL};
`

const Background = styled.span`
  background: ${props => props.theme.colors.Modal.background};
  content: '';
  height: 100%;
  left: 0;
  opacity: ${props => (props.show ? '0.9' : '0')};
  position: absolute;
  top: 0;
  transition: opacity ${props => props.theme.animation.time.repaint};
  width: 100%;
  z-index: 1;
`

const Container = styled.div`
  background: ${props => props.theme.colors.Modal.content};
  border-radius: 4px;
  position: relative;
  margin: 0 40px;
  opacity: ${props => (props.show ? '1' : '0')};
  transform: translate3d(0, ${props => (props.show ? '' : '100px')}, 0);
  transition: transform ${props => (props.show ? '0.7s' : '0.5s')}
      ${props => props.theme.animation.ease.smooth}
      ${props => (props.show ? '0.2s' : null)},
    opacity ${props => (props.show ? '0.25s' : '0.2s')} linear
      ${props => (props.show ? '0.3s' : null)};
  width: 490px;
  z-index: 2;

  @media (max-width: 767px) {
    height: calc(100vh - 20px);
    margin: 0 10px;
    width: 100vw;
  }
`

const CloseButton = styled(Button)`
  height: 20px;
  position: absolute;
  right: 30px;
  top: 30px;
  width: 20px;
  z-index: 3;
`

const SVG = styled.svg`
  fill: ${props => props.theme.colors.Modal.close};
  display: block;
  height: 100%;
  width: 100%;
`

const Content = styled.div`
  height: 100%;
  padding: 44px 48px;
  width: 100%;
`

export const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

export const ModalScrollContent = styled.div`
  flex: 1 1 100%;

  @media (max-width: 767px) {
    overflow-x: hidden;
    overflow-y: scroll;
  }
`

class Modal extends Component<Props, void> {
  renderModal () {
    const { modalContent } = this.props
    switch (modalContent) {
      case MODAL.STAKE:
        return <ModalStake />
      case MODAL.SECURE:
        return <ModalSecure />
      case MODAL.SHOW_SEED:
        return <ModalShowSeed />
      case MODAL.REWRITE_SEED:
        return <ModalRewriteSeed />
      case MODAL.RESTORE_ACCOUNT:
        return <ModalRestoreAccount />
      case MODAL.SET_PIN:
        return <ModalSetPin />
      case MODAL.ASK_PIN:
        return <ModalAskPin />
    }
  }

  handleKeydown = (e: Event): void => {
    if (event.keyCode === 27) {
      this.props.closeModal()
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeydown.bind(this))
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeydown.bind(this))
  }

  render () {
    const isVisible = this.props.showModal
    return (
      <Wrapper show={isVisible}>
        <Container show={isVisible}>
          <CloseButton onClick={this.props.closeModal}>
            <SVG>
              <use xlinkHref="#icon-close" />
            </SVG>
          </CloseButton>
          <Content>{this.renderModal()}</Content>
        </Container>
        <Background show={isVisible} onClick={this.props.closeModal} />
      </Wrapper>
    )
  }
}

export default Modal
