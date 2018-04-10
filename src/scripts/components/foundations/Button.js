import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  color?: string,
  icon: string
}

export const ButtonStyleColor = css`
  ${props => {
    let _color: String

    if (props.white) {
      _color = props.theme.colors.button.white
    } else if (props.purple) {
      _color = props.theme.colors.button.purple
    } else if (props.pink) {
      _color = props.theme.colors.button.pink
    } else {
      _color = props.theme.colors.button.gray
    }

    return css`
      color: ${_color};
    `
  }};
  `

export const StyleAnchor = css`
  ${props => {
    if (props.underline) {
      let _css = 'padding-bottom: 5px; border-bottom: 1px solid '

      if (props.white) {
        _css = _css + props.theme.colors.button.white
      } else if (props.purple) {
        _css = _css + props.theme.colors.button.purple
      } else {
        _css = _css + props.theme.colors.button.gray
      }

      return css`
        ${_css};
      `
    }
  }};
  `

export const ButtonStyleHover = css`
  transition: opacity ${props => props.theme.animation.time.repaint};

  &:hover {
    opacity: ${props => props.theme.animation.opacity.hover};
  }
  `

export const IconFillStyleColor = css`
  ${props => {
    let _color: String

    if (props.color === 'white') {
      _color = props.theme.colors.button.white
    } else if (props.color === 'purple') {
      _color = props.theme.colors.button.purple
    } else if (props.color === 'pink') {
      _color = props.theme.colors.button.pink
    } else {
      _color = props.theme.colors.button.gray
    }

    return css`
      fill: ${_color};
    `
  }};
  `

const SVG = styled.svg`
  ${IconFillStyleColor};
  width: 100%;
  height: 100%;
  `

export const SVGIcon = ({ icon, color, ...rest }: Props) => (
  <SVG color={color}>
    <use xlinkHref={'#' + icon} />
  </SVG>
)

const Button = styled.button`
  ${StyleAnchor} ${ButtonStyleColor} ${ButtonStyleHover} cursor: ${props =>
  props.disabled ? 'initial' : 'pointer'};
  font-size: ${props => (props.anchor ? '' : props.theme.fonts.button)};
  font-weight: ${props =>
    props.anchor
      ? props.theme.fonts.weight.regular
      : props.theme.fonts.weight.bold};
  margin: ${props => props.margin};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : '')};
  text-transform: ${props => (props.anchor ? '' : 'uppercase')};
  user-select: ${props => (props.anchor ? '' : 'none')};
  `

export default Button
