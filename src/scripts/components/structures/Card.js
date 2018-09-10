import React, { Component } from 'react'
import Title from '../foundations/Title'
import styled from 'styled-components'
import {
  BORDER_RADIUS,
  CARD_PADDING,
  CARD_MAX_WIDTH,
  CARD_MARGIN,
  MEDIAQUERY_BREAKPOINT
} from 'constants/UIConstants'

type Props = {
  children: Object,
  id: string,
  title: string,
  footer: Object,
  marginBottom: boolean,
  marginLeft: boolean,
  marginRight: boolean,
  marginTop: boolean,
  nopadding: string,
  innerRef: Object,
  maxWidth: boolean,
  height: string
}

const CardWrapper = styled.div`
  border-radius: ${BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.colors.Card.shadow};
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  height: ${({ height }) => height};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? CARD_MARGIN : null};
  margin-left: ${({ marginLeft }) => (marginLeft ? CARD_MARGIN : null)};
  margin-right: ${({ marginRight }) => (marginRight ? CARD_MARGIN : null)};
  margin-top: ${({ marginTop }) => (marginTop ? CARD_MARGIN : null)};
  max-width: ${({ maxWidth }) => (maxWidth ? CARD_MAX_WIDTH : null)};
  overflow: hidden;
  position: relative;
  width: 100%;

  @media ${MEDIAQUERY_BREAKPOINT} {
    max-width: initial;
    margin: 0 0 ${CARD_MARGIN};
  }
`

const Main = styled.div`
  background: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.accent};
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  padding: ${props => (props.nopadding ? '' : CARD_PADDING)};
  position: relative;
  width: 100%;
`

const Header = styled.div`
  margin-bottom: 50px;
`

export const CardTitle = Title.withComponent('h2')

const Footer = styled.div`
  align-items: flex-end;
  background-color: ${props => props.theme.colors.background.secondary};
  color: ${props => props.theme.colors.text.secondary};
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  padding: ${CARD_PADDING};
  width: 100%;
`

class Card extends Component<Props, void> {
  render () {
    return (
      <CardWrapper
        id={this.props.id}
        marginBottom={this.props.marginBottom}
        marginLeft={this.props.marginLeft}
        marginRight={this.props.marginRight}
        marginTop={this.props.marginTop}
        innerRef={this.props.innerRef}
        maxWidth={this.props.maxWidth}
        height={this.props.height}
      >
        <Main nopadding={this.props.nopadding}>
          {this.props.title && (
            <Header>
              <CardTitle accent>{this.props.title}</CardTitle>
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
