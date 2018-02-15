import React, { Component } from 'react'
import styled from 'styled-components'
import Button from 'components/foundations/Button'
import { createStore } from 'redux'

type Props = {
  content: Object,
  show: Boolean
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
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
  width: 490px;
  z-index: 2;
`

const CloseButton = styled(Button)`
  height: 20px;
  position: absolute;
  right: 30px;
  top: 30px;
  width: 20px;
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

const reducer = (initialState = 0, action) => {
  console.log((initialState = 0), action)
}

export const store = createStore(reducer, 1)

store.subscribe(() => {
  console.log('store changed', store.getState())
})

class Modal extends Component<Props, void> {
  constructor (props: Props) {
    super(props)

    this.state = {
      show: this.props.show
    }

    this.closeModal = this.closeModal.bind(this)
  }

  closeModal () {
    this.setState({
      show: !this.state.show
    })
  }

  render () {
    return (
      <Wrapper show={this.state.show}>
        <Container show={this.state.show}>
          <CloseButton onClick={this.closeModal}>
            <SVG>
              <use xlinkHref="#icon-close" />
            </SVG>
          </CloseButton>
          <Content>
            <this.props.content />
          </Content>
        </Container>
        <Background show={this.state.show} />
      </Wrapper>
    )
  }
}

export default Modal
