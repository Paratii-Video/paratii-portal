import React, { Component } from 'react'
import BaseTitle from '../foundations/Title'
import styled from 'styled-components'

type Props = {
  className: String,
  children: Object,
  id: String,
  title: String,
  footer: Object,
  full: Boolean,
  fullAtFirstBreak: Boolean,
  margin: String,
  marginLeft: Boolean,
  marginRight: Boolean,
  nopadding: String,
  withFull: Boolean,
  innerRef: Object
}

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 1280px) {
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

export const CardWrapper = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-left: ${props => (props.marginLeft ? '25px' : null)};
  margin-right: ${props => (props.marginRight ? '25px' : null)};
  min-width: ${props => (!props.full ? '395px' : null)};
  overflow: hidden;
  position: relative;
  width: ${props => (props.full ? '64%' : '33%')};

  @media (max-width: 1280px) {
    margin-bottom: 40px;
    margin-left: ${props =>
    props.full || props.fullAtFirstBreak ? '0px' : null};
    margin-right: ${props =>
    props.full || props.fullAtFirstBreak ? '0px' : null};
    min-width: ${props => (!props.full ? '295px' : null)};
    min-width: ${props => (props.withFull ? 'initial' : null)};
    width: ${props => (props.fullAtFirstBreak ? '100%' : null)};
    width: ${props =>
    !props.fullAtFirstBreak && !props.full && !props.withFull ? '48%' : null};
  }

  @media (max-width: 1007px) {
    flex: 1 1 100%;
    max-width: initial;
    margin: 0 0 25px;
    width: 100%;
  }
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
        id={this.props.id}
        full={this.props.full}
        fullAtFirstBreak={this.props.fullAtFirstBreak}
        withFull={this.props.withFull}
        marginLeft={this.props.marginLeft}
        marginRight={this.props.marginRight}
        className={this.props.className}
        innerRef={this.props.innerRef}
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
