import React, { Component } from 'react'
import BaseTitle from '../foundations/Title'
import styled, { css } from 'styled-components'
import {
  BORDER_RADIUS,
  CARD_PADDING,
  CARD_MAX_WIDTH,
  MEDIAQUERY_BREAKPOINT
} from 'constants/UIConstants'

type Props = {
  children: Object,
  id: string,
  title: string,
  footer: Object,
  marginLeft: boolean,
  marginRight: boolean,
  nopadding: string,
  innerRef: Object,
  maxWidth: boolean,
  height: string
}

export const CardWrapper = styled.div`
  border-radius: ${BORDER_RADIUS};
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  height: ${({ height }) => height};
  margin-left: ${({ marginLeft }) => (marginLeft ? '25px' : null)};
  margin-right: ${({ marginRight }) => (marginRight ? '25px' : null)};
  max-width: ${({ maxWidth }) => (maxWidth ? CARD_MAX_WIDTH : null)};
  overflow: hidden;
  position: relative;
  width: 100%;

  @media ${MEDIAQUERY_BREAKPOINT} {
    max-width: initial;
  }

  @media (max-width: 1024px) {
    margin: 0;
  }
`

const Main = styled.div`
  background: ${props => props.theme.colors.MainCard.background};
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

// Need to recreate this component because there's no rule about the aligment

export const CardStyle = css`
  background-color: ${props => props.theme.colors.MainCard.background};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: ${props => (props.nopadding ? null : CARD_PADDING)};
`

class Card extends Component<Props, void> {
  render () {
    return (
      <CardWrapper
        id={this.props.id}
        marginLeft={this.props.marginLeft}
        marginRight={this.props.marginRight}
        innerRef={this.props.innerRef}
        maxWidth={this.props.maxWidth}
        height={this.props.height}
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
