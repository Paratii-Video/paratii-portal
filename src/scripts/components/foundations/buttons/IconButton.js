/* @flow */

import React from 'react'
import styled from 'styled-components'

type Props = {
  icon: string,
  onClick: (e: Object) => void
}

const Button = styled.button`
  width: 25px;
  height: 25px;
  mask-image: ${props => `url(${props.icon})`};
  mask-position: center center;
  mask-size: 22px 22px;
  mask-repeat: no-repeat;
  background-color: ${props => props.theme.colors.button.white};
`

const IconButton = ({ icon, onClick }: Props) => (
  <Button icon={icon} onClick={onClick} />
)

export default IconButton
