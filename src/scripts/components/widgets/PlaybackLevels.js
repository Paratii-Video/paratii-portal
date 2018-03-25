/* @flow */

import React from 'react'
import styled from 'styled-components'
import { List as ImmutableList } from 'immutable'

import Popover from 'components/foundations/Popover'
import CloseButton from 'components/foundations/buttons/CloseButton'
import { CONTROLS_HEIGHT } from 'constants/UIConstants'
import { PlaybackLevel } from 'records/PlayerRecords'

const PADDING: string = '20px'

const Wrapper = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 160px;
`

const TopBar = styled.div`
  flex: 0 0 20%;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid
    ${({ theme }) => theme.colors.VideoPlayer.levels.border};
  padding: 10px ${PADDING};
`

const Title = styled.div`
  display: flex;
  flex: 1 1 0;
  align-items: center;
  font-size: 14px;
`

const LevelsList = styled.ul`
  flex: 1 1 0;
  flex-direction: column;
  align-items: right;
  display: flex;
  overflow-y: scroll;
`

const Level = styled.li`
  display: flex;
  flex: 0 0 30px;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  font-size: 14px;
  cursor: pointer;
  margin-top: 5px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.VideoPlayer.levels.selectedBackground : ''};
  padding: 0 ${PADDING};
  text-align: right;

  &:last-child {
    margin-bottom: 5px;
  }

  &::before {
    content: '•';
    font-size: 20px;
    margin-right: 7px;
    display: ${({ selected }) => (selected ? 'inline-block' : 'none')};
  }
`

type Props = {
  playbackLevels: ImmutableList<PlaybackLevel>,
  currentPlaybackLevel: ?PlaybackLevel,
  onPlaybackLevelChange: (id: number) => void,
  open: boolean,
  onClose: () => void
}

class PlaybackLevels extends React.Component<Props> {
  getSelectedLevelIndex (): number {
    const { currentPlaybackLevel, playbackLevels } = this.props
    if (!currentPlaybackLevel) {
      return -1
    }

    return playbackLevels.findIndex(
      (level: PlaybackLevel): boolean =>
        level.get('id') === currentPlaybackLevel.get('id')
    )
  }

  getLevelsListOffsetPercentage (): number {
    const { currentPlaybackLevel, playbackLevels } = this.props
    let offsetXPercentage: number = 0
    const selectedIndex: number = this.getSelectedLevelIndex()
    const numLevels: number = playbackLevels.size

    if (currentPlaybackLevel) {
      if (selectedIndex >= 0) {
        const currentLevelFactor =
          selectedIndex + (numLevels % 2 !== 0 ? 0.5 : 0.35)
        offsetXPercentage = 50 - currentLevelFactor / numLevels * 100
      }
    }

    return offsetXPercentage
  }

  render () {
    const { playbackLevels, onPlaybackLevelChange, open, onClose } = this.props
    const offsetXPercentage: number = this.getLevelsListOffsetPercentage()
    const selectedIndex: number = this.getSelectedLevelIndex()
    const numLevels: number = playbackLevels.size

    return (
      <Popover open={open} bottom={`${CONTROLS_HEIGHT}`} right={0}>
        <Wrapper>
          <TopBar>
            <Title>Video Quality</Title>
            <CloseButton onClick={onClose} />
          </TopBar>
          <LevelsList offsetXPercentage={offsetXPercentage}>
            {playbackLevels.map((level: PlaybackLevel, index: number) => (
              <Level
                numLevels={numLevels}
                selected={selectedIndex === index}
                key={level.get('id')}
                onClick={() => {
                  onPlaybackLevelChange(level.get('id'))
                }}
              >
                {level.get('label')}
              </Level>
            ))}
          </LevelsList>
        </Wrapper>
      </Popover>
    )
  }
}

export default PlaybackLevels
