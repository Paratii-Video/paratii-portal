/* @flow */

import React from 'react'
import styled from 'styled-components'

type Props = {
  disabled?: boolean,
  icon: string,
  onClick: (e: Object) => void
}

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  height: 100%;
  mask-image: ${props => `url(${props.icon})`};
  mask-position: center center;
  mask-size: contain;
  mask-repeat: no-repeat;
  background-color: ${({ theme, color, disabled }) =>
    color || (disabled ? theme.colors.button.gray : theme.colors.button.white)};
`

const IconButton = ({ onClick, disabled, icon, ...rest }: Props) => (
  <Button
    {...rest}
    disabled={disabled}
    icon={icon}
    onClick={disabled ? undefined : onClick}
  />
)

export default IconButton
