/* @flow */

import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

import IconButton from 'components/foundations/buttons/IconButton'
import Popover from 'components/foundations/Popover'

type Props = {
  popoverPortal: HTMLElement,
  popoverOpen: boolean,
  onClick: (e: Object) => void
}

const ProfileButton = (props: Props) => {
  const { popoverPortal, popoverOpen, onClick } = props

  return (
    <Fragment>
      <IconButton icon="/assets/img/prof.svg" onClick={onClick} />
      {popoverOpen
        ? ReactDOM.createPortal(<Popover>Foo bar</Popover>, popoverPortal)
        : null}
    </Fragment>
  )
}

export default ProfileButton
