/* @flow */

import React from 'react'
import styled from 'styled-components'
import { ButtonStyleHover } from '../Button'

type Props = {
  color?: string,
  disabled?: boolean,
  icon: string,
  onClick: (e: Object) => void,
  'data-test-id'?: string
}

const Button = styled.button`
  ${ButtonStyleHover};
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

const IconButton = ({ onClick, disabled, icon, color, ...rest }: Props) => (
  <Button
    color={color}
    data-test-id={rest['data-test-id']}
    disabled={disabled}
    icon={icon}
    onClick={disabled ? undefined : onClick}
  />
)

export default IconButton
