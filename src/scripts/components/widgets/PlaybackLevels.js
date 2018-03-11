/* @flow */

import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { List as ImmutableList } from 'immutable'

import { PlaybackLevel } from 'records/PlayerRecords'
import IconButton from 'components/foundations/buttons/IconButton'
import Popover from 'components/foundations/Popover'

type Props = {
  playbackLevels: ImmutableList<PlaybackLevel>,
  currentPlaybackLevel: ?PlaybackLevel,
  onChangePlaybackLevel: (id: number) => void,
  popoverPortal: ?HTMLElement
}

type State = {
  open: boolean
}

class PlaybackLevels extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      open: false
    }
  }

  onClick = (e: Object): void => {
    this.setState((prevState: State): Object => ({
      open: !prevState.open
    }))
  }

  render () {
    const { popoverPortal } = this.props
    const { open } = this.state
    return (
      <Fragment>
        <IconButton icon="/assets/img/prof.svg" onClick={this.onClick} />
        {popoverPortal && open
          ? ReactDOM.createPortal(
            <Popover>
              <span />
            </Popover>,
            popoverPortal
          )
          : null}
      </Fragment>
    )
  }
}

export default PlaybackLevels
