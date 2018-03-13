/* @flow */

import React from 'react'
import styled from 'styled-components'
import { List as ImmutableList } from 'immutable'

import { PlaybackLevel } from 'records/PlayerRecords'
import SlideModal from 'components/foundations/SlideModal'

const LevelsList = styled.ul`
  height: 75px;
  overflow-y: scroll;
`

const Level = styled.li`
  display: inline;
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
  onPlaybackLevelChange: (id: number) => void,
  open: boolean
}

class PlaybackLevels extends React.Component<Props> {
  render () {
    const {
      currentPlaybackLevel,
      onPlaybackLevelChange,
      playbackLevels,
      open
    } = this.props
    return (
      <SlideModal open={open}>
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
      </SlideModal>
    )
  }
}

export default PlaybackLevels
