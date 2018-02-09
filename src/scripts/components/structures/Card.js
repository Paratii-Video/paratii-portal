import React, { Component } from 'react'
import styled, { css } from 'styled-components'

type Props = {
  children: Object,
  title: String,
  footer: Object,
  full: Boolean,
  margin: String
}

const StyleCardPadding = css`
  padding: 47px 42px;
`

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
`

const CardWrapper = styled.div`
  flex: 1 1 100%;
  margin: ${props => props.margin};
  min-width: ${props => (props.full ? '' : '388px')};
  max-width: ${props => (props.full ? '' : '33%')};
  overflow: hidden;
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
      <CardWrapper full={this.props.full} margin={this.props.margin}>
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
