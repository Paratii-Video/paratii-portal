/* @flow */

import React from 'react'
import styled from 'styled-components'

type Props = {
  icon: string,
  onClick: (e: Object) => void
}

const buttonDimension: string = '25px'

const Button = styled.button`
  width: ${buttonDimension};
  height: ${buttonDimension};
  mask-image: ${props => `url(${props.icon})`};
  mask-position: center center;
  mask-size: ${buttonDimension} ${buttonDimension};
  background-color: ${props => props.theme.colors.button.white};
`

const IconButton = ({ icon, onClick }: Props) => (
  <Button icon={icon} onClick={onClick} />
)

export default IconButton
