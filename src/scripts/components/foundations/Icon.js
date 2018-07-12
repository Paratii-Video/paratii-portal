/* @flow */

import React from 'react'
import styled from 'styled-components'

import Colors from 'components/foundations/base/Colors'

type Props = {
  color?: string,
  url: string,
  width?: string,
  height?: string
}

const DEFAULT_ICON_DIMENSION: string = '25px'

const IconWrapper = styled.span`
  display: flex;
  width: ${({ width }) => width || DEFAULT_ICON_DIMENSION};
  height: ${({ height }) => height || DEFAULT_ICON_DIMENSION};
  mask-image: ${props => `url(${props.url})`};
  mask-position: center center;
  mask-size: contain;
  mask-repeat: no-repeat;
  background-color: ${({ color }) => color || Colors.white};
`

class Icon extends React.Component<Props> {
  render () {
    const { color, height, url, width } = this.props

    return <IconWrapper color={color} height={height} url={url} width={width} />
  }
}

export default Icon
