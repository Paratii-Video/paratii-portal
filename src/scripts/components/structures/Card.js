import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  className: String,
  children: Object,
  title: String,
  footer: Object,
  full: Boolean,
  margin: String,
  nopadding: String
}

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const CardWrapper = styled.div`
  flex: 1 1 100%;
  margin: ${props => props.margin};
  min-width: ${props => (props.full ? '' : '388px')};
  max-width: ${props => (props.full ? '' : '33%')};
  overflow: hidden;
  position: relative;
`

const Main = styled.div`
  background-color: ${props => props.theme.colors.MainCard.background};
  color: ${props => props.theme.colors.MainCard.color};
  padding: ${props => (props.nopadding ? '' : props.theme.sizes.card.padding)};
  width: 100%;
`

const Title = styled.h2`
  font-size: ${props => props.theme.fonts.title.small};
  margin-bottom: 30px;
`

const Footer = styled.div`
  align-items: flex-end;
  background-color: ${props => props.theme.colors.MainCard.footer.background};
  color: ${props => props.theme.colors.MainCard.footer.color};
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.sizes.card.padding};
  text-align: right;
  width: 100%;
`

class Card extends Component<Props, void> {
  render () {
    return (
      <CardWrapper
        full={this.props.full}
        margin={this.props.margin}
        className={this.props.className}
      >
        <Main nopadding={this.props.nopadding}>
          {this.props.title && <Title>{this.props.title}</Title>}
          {this.props.children}
        </Main>
        {this.props.footer && <Footer>{this.props.footer}</Footer>}
      </CardWrapper>
    )
  }
}

export default Card
