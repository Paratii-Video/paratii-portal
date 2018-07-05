import React from 'react'
import styled from 'styled-components'

type Props = {
  icon: string,
  width: string,
  height: string,
  margin: string
}

const SVG = styled.svg`
  fill: currentColor;
  display: block;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  margin: ${({ margin }) => margin || null};
  transition: fill 0.3s;
`

const SVGIcon = ({ width, height, icon, margin, ...rest }: Props) => (
  <SVG width={width} height={height} margin={margin}>
    <use xlinkHref={'#' + icon} />
  </SVG>
)

export default SVGIcon
