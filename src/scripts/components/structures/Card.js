import React, { Component } from 'react'
import styled, { css } from 'styled-components'

type Props = {
  children: Object,
  title: String,
  footer: Object
}

const StyleCardPadding = css`
  padding: 47px 42px;
`

const CardWrapper = styled.div`
  width: ${props => (props.full ? '66%' : '33%')};
`

const Main = styled.div`
  ${StyleCardPadding} background-color: ${props =>
  props.theme.colors.MainCard.background};
  color: ${props => props.theme.colors.MainCard.color};
  width: 100%;
`

const Title = styled.h2`
  font-size: ${props => props.theme.fonts.title.small};
  margin-bottom: 30px;
`

const Footer = styled.div`
  ${StyleCardPadding} align-items: flex-end;
  background-color: ${props => props.theme.colors.MainCard.footer.background};
  color: ${props => props.theme.colors.MainCard.footer.color};
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 100%;
`

class Card extends Component<Props, void> {
  render () {
    return (
      <CardWrapper>
        <Main>
          {this.props.title && <Title>{this.props.title}</Title>}
          {this.props.children}
        </Main>
        {this.props.footer && <Footer>{this.props.footer}</Footer>}
      </CardWrapper>
    )
  }
}

export default Card
