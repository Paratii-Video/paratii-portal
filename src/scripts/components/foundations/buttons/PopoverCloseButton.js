/* @flow */

import React from 'react'

import IconButton from 'components/foundations/buttons/IconButton'

type Props = {
  onClick: (e: Object) => void
}

const PopoverCloseButton = ({ onClick }: Props) => (
  <IconButton icon={'/assets/img/close.png'} onClick={onClick} />
)

export default PopoverCloseButton
