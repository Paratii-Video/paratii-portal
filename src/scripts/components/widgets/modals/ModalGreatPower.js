/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import { ModalContentWrapper, ModalScrollContent } from './Modal'
import { MODAL } from 'constants/ModalConstants'

type Props = {
  openModal: String => void
}

const Title = styled.h2`
  color: ${props => props.theme.colors.Modal.title};
  font-size: ${props => props.theme.fonts.modal.title};
  margin-bottom: 25px;
`

const Highlight = styled(Text)`
  color: ${props => props.theme.colors.Modal.hightlight};
  margin-bottom: 14px;
`

const MainText = styled(Text)`
  margin-bottom: 35px;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  width: 100%;
`

const ButtonContainer = styled.div`
  margin-left: 10px;
`

class ModalSecure extends Component<Props, Object> {
  secureAccount: (e: Object) => void
  showSeed: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.secureAccount = this.secureAccount.bind(this)
    this.showSeed = this.showSeed.bind(this)
  }

  secureAccount () {
    this.props.openModal(MODAL.SECURE)
  }

  showSeed () {
    this.props.openModal(MODAL.SHOW_SEED)
  }

  render () {
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>With great powers, comes great responsability</Title>
          <Highlight>
            Vestibulum turpis ex, sagittis non libero sed, tincidunt egestas
            augue.
          </Highlight>
          <MainText small gray>
            Donec eleifend vitae felis nec laoreet. Nam ullamcorper justo et
            ante malesuada iaculis. Aliquam lacus quam, condimentum eget massa
            vitae, ultrices porta ligula.
          </MainText>
          <Footer>
            <ButtonContainer>
              <Button data-test-id="go-back" onClick={this.secureAccount}>
                Go Back
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button data-test-id="continue" purple onClick={this.showSeed}>
                Continue
              </Button>
            </ButtonContainer>
          </Footer>
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalSecure
