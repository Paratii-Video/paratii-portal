/* @flow */
// import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
// import UserRecord from 'records/UserRecords'
import { ModalContentWrapper, ModalScrollContent } from './Modal'

type Props = {
  openModal: () => void
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

// const Anchor = Button.withComponent('a')

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
  restoreAccount: (e: Object) => void
  showSeed: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.restoreAccount = this.restoreAccount.bind(this)
    this.showSeed = this.showSeed.bind(this)
  }

  restoreAccount () {
    console.log('Restore Account')
    this.props.openModal('ModalRestoreAccount')
  }

  showSeed () {
    console.log('Show Seed')
    this.props.openModal('ModalShowSeed')
  }

  render () {
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>Secure you wallet</Title>
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
              <Button onClick={this.restoreAccount}>
                I already have an account
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button data-test-id="new-here" purple onClick={this.showSeed}>
                I am new here
              </Button>
            </ButtonContainer>
          </Footer>
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalSecure
