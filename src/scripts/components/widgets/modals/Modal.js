import React, { Component } from 'react'
import styled from 'styled-components'
import Button from 'components/foundations/Button'

import ModalStake from 'containers/ModalStakeContainer' // need to receive any content

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
  z-index: 10;
`

const Background = styled.span`
  background: ${props => props.theme.colors.Modal.background};
  content: '';
  height: 100%;
  left: 0;
  opacity: ${props => (props.show ? '1' : '0')};
  position: absolute;
  top: 0;
  transition: opacity ${props => props.theme.animation.time.repaint};
  width: 100%;
  z-index: 1;
`

const Container = styled.div`
  background: ${props => props.theme.colors.Modal.content};
  position: relative;
  opacity: ${props => (props.show ? '1' : '0')};
  transform: translate3d(0, ${props => (props.show ? '' : '100px')}, 0);
  transition: transform ${props => (props.show ? '0.8s' : '0.6s')}
      ${props => props.theme.animation.ease.smooth},
    opacity ${props => (props.show ? '0.3s' : '0.2s')} linear
      ${props => (props.show ? '0.1s' : '')};
  width: 490px;
  z-index: 2;
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
  padding: 40px 46px;
  width: 100%;
`

class Modal extends Component<Props, void> {
  render () {
    const isVisible = this.props.showModal
    document.onkeydown = event => {
      if (event.keyCode === 27) {
        this.props.closeModal()
      }
    }

    return (
      <Wrapper show={isVisible}>
        <Container show={isVisible}>
          <CloseButton onClick={this.props.closeModal}>
            <SVG>
              <use xlinkHref="#icon-close" />
            </SVG>
          </CloseButton>
          <Content>
            {this.props.modalContent === 'ModalStake' && <ModalStake />}
          </Content>
        </Container>
        <Background show={isVisible} onClick={this.props.closeModal} />
      </Wrapper>
    )
  }
}

export default Modal
