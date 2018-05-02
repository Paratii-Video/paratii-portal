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
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  margin: ${({ margin }) => margin || null};
`

const SVGIcon = ({ width, height, icon, color, margin, ...rest }: Props) => (
  <SVG color={color} width={width} height={height} margin={margin}>
    <use xlinkHref={'#' + icon} />
  </SVG>
)

export default SVGIcon
