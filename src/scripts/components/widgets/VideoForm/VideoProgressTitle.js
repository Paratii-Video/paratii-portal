import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  marginRight: boolean,
  success: boolean,
  children: Object
}

const Title = styled.p`
  align-items: center;
  display: flex;
  color: ${props =>
    props.success
      ? props.theme.colors.text.highlight
      : props.theme.colors.text.primary};
  font-size: ${props => props.theme.fonts.video.info.progress};
  margin-right: ${props => (props.marginRight ? '10px' : null)};
  margin-bottom: 12px;
`

const Icon = styled.span`
  background-color: ${props => props.theme.colors.text.highlight};
  border-radius: 100%;
  height: 14px;
  margin-left: 10px;
  transform: scale(${props => (props.show ? 1 : 0)});
  transition: transform 0.5s ${props => props.theme.animation.ease.smooth};
  width: 14px;
`
const SVG = styled.svg`
  display: block;
  fill: ${props => props.theme.colors.background.secondary};
  height: 14px;
  transform: scale(0.8);
  transition: transform 0.5s ${props => props.theme.animation.ease.smooth};
  width: 14px;
`

class VideoProgressTitle extends Component<Props, void> {
  render () {
    return (
      <Title marginRight={this.props.marginRight} success={this.props.success}>
        {this.props.children}
        <Icon show={this.props.success}>
          <SVG>
            <use xlinkHref="#icon-check" />
          </SVG>
        </Icon>
      </Title>
    )
  }
}

export default VideoProgressTitle
