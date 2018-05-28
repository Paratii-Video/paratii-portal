import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  color?: string,
  icon: string,
  width: string,
  height: string,
  margin: string
}

export const IconFillStyleColor = css`
  ${props => {
    let _fill: String

    if (props.color === 'white') {
      _fill = props.theme.colors.button.white
    } else if (props.color === 'purple') {
      _fill = props.theme.colors.button.purple
    } else if (props.color === 'pink') {
      _fill = props.theme.colors.button.pink
    } else if (props.color === 'green') {
      _fill = props.theme.colors.button.green
    } else {
      _fill = props.theme.colors.button.gray
    }

    return css`
      fill: ${_fill};
`
  }};
`

const SVG = styled.svg`
  ${IconFillStyleColor};
  display: block;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  margin: ${({ margin }) => margin || null};
  transition: fill 0.3s;
`

const SVGIcon = ({ width, height, icon, color, margin, ...rest }: Props) => (
  <SVG color={color} width={width} height={height} margin={margin}>
    <use xlinkHref={'#' + icon} />
  </SVG>
)

export default SVGIcon
