/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import {
  BORDER_RADIUS,
  MODAL_WIDTH,
  MODAL_WIDTH_SMALL,
  MODALCONTENT_PADDING,
  MODALCONTENT_PADDING_MOBILE,
  Z_INDEX_MODAL
} from 'constants/UIConstants'
import Title from 'components/foundations/Title'
import TextButton from 'components/foundations/TextButton'
import SVGIcon from 'components/foundations/SVGIcon'

import ModalStake from 'containers/widgets/modals/ModalStakeContainer' // need to receive any content
import ModalSecure from 'containers/widgets/modals/ModalSecureContainer'
import ModalGreatPower from 'containers/widgets/modals/ModalGreatPowerContainer'
import ModalCreatePassword from 'containers/widgets/modals/ModalCreatePasswordContainer'
import ModalAskPassword from 'containers/widgets/modals/ModalAskPasswordContainer'
import ModalShowSeed from 'containers/widgets/modals/ModalShowSeedContainer'
import ModalProfile from 'containers/widgets/modals/ModalProfileContainer'
import ModalRewriteSeed from 'containers/widgets/modals/ModalRewriteSeedContainer'
import ModalRestoreAccount from 'containers/widgets/modals/ModalRestoreAccountContainer'
import ModalChallenge from 'containers/widgets/modals/ModalChallengeContainer'
import ModalVote from 'containers/widgets/modals/ModalVoteContainer'

import { MODAL } from 'constants/ModalConstants'

type Props = {
  'data-test-id'?: string,
  modalName: string,
  modalProps: Object,
  showModal: boolean,
  width: string,
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
  background: ${props => props.theme.colors.background.body};
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
  background: ${props => props.theme.colors.background.primary};
  border-radius: ${BORDER_RADIUS};
  box-shadow: ${props => props.theme.colors.Modal.shadow};
  position: relative;
  margin: 0 40px;
  opacity: ${props => (props.show ? '1' : '0')};
  transform: translate3d(0, ${props => (props.show ? '' : '100px')}, 0);
  transition: transform ${props => (props.show ? '0.7s' : '0.4s')}
      ${props => props.theme.animation.ease.smooth}
      ${props => (props.show ? '0.2s' : null)},
    opacity ${props => (props.show ? '0.25s' : '0.2s')} linear
      ${props => (props.show ? '0.3s' : null)};
  width: ${props => props.width};
  z-index: 2;

  @media (max-width: 767px) {
    height: calc(100vh - 20px);
    margin: 0 10px;
    width: 100vw;
  }
`

const CloseButton = styled(TextButton)`
  height: 20px;
  position: absolute;
  right: 30px;
  top: 30px;
  width: 20px;
  z-index: 3;

  @media (max-width: 767px) {
    top: 39px;
  }
`

const Content = styled.div`
  height: 100%;
  padding: ${MODALCONTENT_PADDING};
  width: 100%;

  @media (max-width: 767px) {
    padding: ${MODALCONTENT_PADDING_MOBILE};
  }
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

export const ModalTitle = styled(Title)`
  margin-bottom: 25px;
`

class Modal extends Component<Props, void> {
  static defaultProps = {
    modalProps: {}
  }

  canClose = () => {
    return this.props.modalName !== MODAL.PROFILE
  }

  close = () => {
    const { modalProps: { onClose } } = this.props
    if (this.canClose()) {
      this.props.closeModal()
      if (onClose) {
        onClose()
      }
    }
  }

  getModalWidth () {
    const { modalName } = this.props
    switch (modalName) {
      case MODAL.STAKE:
        return MODAL_WIDTH_SMALL
      case MODAL.SECURE:
        return MODAL_WIDTH
      case MODAL.SHOW_SEED:
        return MODAL_WIDTH
      case MODAL.GREAT_POWER:
        return MODAL_WIDTH
      case MODAL.REWRITE_SEED:
        return MODAL_WIDTH
      case MODAL.RESTORE_ACCOUNT:
        return MODAL_WIDTH
      case MODAL.CREATE_PASSWORD:
        return MODAL_WIDTH
      case MODAL.ASK_PASSWORD:
        return MODAL_WIDTH_SMALL
      case MODAL.PROFILE:
        return MODAL_WIDTH
      case MODAL.CHALLENGE:
        return MODAL_WIDTH_SMALL
      case MODAL.VOTE:
        return MODAL_WIDTH_SMALL
      default:
        return MODAL_WIDTH_SMALL
    }
  }

  handleKeydown = (e: Event): void => {
    if (event.keyCode === 27) {
      this.close()
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeydown)
  }

  renderModal () {
    const { modalName, modalProps } = this.props

    let ModalComponent: any

    switch (modalName) {
      case MODAL.STAKE:
        ModalComponent = ModalStake
        break
      case MODAL.SECURE:
        ModalComponent = ModalSecure
        break
      case MODAL.GREAT_POWER:
        ModalComponent = ModalGreatPower
        break
      case MODAL.CREATE_PASSWORD:
        ModalComponent = ModalCreatePassword
        break
      case MODAL.ASK_PASSWORD:
        ModalComponent = ModalAskPassword
        break
      case MODAL.SHOW_SEED:
        ModalComponent = ModalShowSeed
        break
      case MODAL.PROFILE:
        ModalComponent = ModalProfile
        break
      case MODAL.REWRITE_SEED:
        ModalComponent = ModalRewriteSeed
        break
      case MODAL.RESTORE_ACCOUNT:
        ModalComponent = ModalRestoreAccount
        break
      case MODAL.CHALLENGE:
        ModalComponent = ModalChallenge
        break
      case MODAL.VOTE:
        ModalComponent = ModalVote
        break
    }

    if (ModalComponent) {
      return <ModalComponent {...modalProps} />
    }
  }

  render () {
    const isVisible = this.props.showModal

    return (
      <Wrapper data-test-id={this.props['data-test-id']} show={isVisible}>
        <Container show={isVisible} width={this.getModalWidth()}>
          {this.canClose() && (
            <CloseButton data-test-id="modal-close-button" onClick={this.close}>
              <SVGIcon icon="icon-close" />
            </CloseButton>
          )}
          <Content>{this.renderModal()}</Content>
        </Container>
        <Background show={isVisible} onClick={this.close} />
      </Wrapper>
    )
  }
}

export default Modal
