import React, { Component } from 'react'
import BaseTitle from '../foundations/Title'
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
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: ${props => props.margin};
  min-width: 388px;
  max-width: ${props => (props.full ? '' : '395px')};
  overflow: hidden;
  position: relative;
  flex: 1 1 ${props => (props.full ? '100%' : '33%')};
`

const Main = styled.div`
  background: ${props => props.theme.colors.MainCard.background}
    url('assets/svg/card-bg.svg') no-repeat 50% 0;
  background-size: cover;
  color: ${props => props.theme.colors.MainCard.color};
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  padding: ${props => (props.nopadding ? '' : props.theme.sizes.card.padding)};
  position: relative;
  width: 100%;
`

const Header = styled.div`
  margin-bottom: 50px;
`

const Title = BaseTitle.extend`
  color: ${props => props.theme.colors.MainCard.title};
  font-size: ${props => props.theme.fonts.card.title};
  font-weight: ${props => props.theme.fonts.weight.regular};
`

export const CardTitle = Title.withComponent('h2')

const Footer = styled.div`
  align-items: flex-end;
  background-color: ${props => props.theme.colors.MainCard.footer.background};
  color: ${props => props.theme.colors.MainCard.footer.color};
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  padding: ${props => props.theme.sizes.card.padding};
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
          {this.props.title && (
            <Header>
              <CardTitle>{this.props.title}</CardTitle>
            </Header>
          )}
          {this.props.children}
        </Main>
        {this.props.footer && <Footer>{this.props.footer}</Footer>}
      </CardWrapper>
    )
  }
}

export default Card
