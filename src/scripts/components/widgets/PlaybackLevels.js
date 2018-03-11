/* @flow */

import React, { Fragment } from 'react'
import styled from 'styled-components'
import { List as ImmutableList } from 'immutable'
import Transition from 'react-transition-group/Transition'

import { PlaybackLevel } from 'records/PlayerRecords'
import IconButton from 'components/foundations/buttons/IconButton'
import Popover from 'components/foundations/Popover'

const PopoverWrapper = styled.div`
  position: absolute;
  top: -75px;
  transition: all 250ms ${({ theme }) => theme.animation.ease.smooth};
  width: 150px;
  height: 100px;
  cursor: default;
`

const LevelsList = styled.ul`
  height: 100%;
  overflow-y: scroll;
`

const Level = styled.li`
  display: block;
  font-size: 14px;
  color: ${({ theme, selected }) => theme.colors.VideoPlayer.levels.text};
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  &::after {
    margin-left: 5px;
    content: ${({ selected }) => (selected ? '"✔"' : '')};
    color: ${({ theme }) => theme.colors.VideoPlayer.levels.check};
  }
`

type Props = {
  playbackLevels: ImmutableList<PlaybackLevel>,
  currentPlaybackLevel: ?PlaybackLevel,
  onPlaybackLevelChange: (id: number) => void
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
    const {
      currentPlaybackLevel,
      onPlaybackLevelChange,
      playbackLevels
    } = this.props
    const { open } = this.state
    return (
      <Fragment>
        <IconButton icon="/assets/img/prof.svg" onClick={this.onClick} />
        <Transition in={open}>
          <PopoverWrapper>
            <Popover open={open}>
              <LevelsList>
                {playbackLevels.map((level: PlaybackLevel) => (
                  <Level
                    key={level.get('id')}
                    onClick={() => {
                      onPlaybackLevelChange(level.get('id'))
                    }}
                    selected={
                      level.get('id') ===
                      (currentPlaybackLevel && currentPlaybackLevel.get('id'))
                    }
                  >
                    {level.get('label')}
                  </Level>
                ))}
              </LevelsList>
            </Popover>
          </PopoverWrapper>
        </Transition>
      </Fragment>
    )
  }
}

export default PlaybackLevels
