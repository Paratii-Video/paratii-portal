/* @flow */

import React from 'react'
import styled from 'styled-components'
import { List as ImmutableList } from 'immutable'

import { PlaybackLevel } from 'records/PlayerRecords'
import Popover from 'components/foundations/Popover'
import { CONTROLS_HEIGHT } from 'constants/UIConstants'

const PADDING: string = '20px'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 160px;
`

const TopBar = styled.div`
  flex: 0 0 20%;
  display: flex;
`

const Title = styled.div`
  display: flex;
  flex: 1 1 0;
  align-items: center;
  font-size: 14px;
  padding: 10px ${PADDING};
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.VideoPlayer.levels.color};
`

const LevelsList = styled.ul`
  flex: 1 1 0;
  flex-direction: column-reverse;
  align-items: right;
  display: flex;
  overflow-y: scroll;
`

const Level = styled.li`
  display: flex;
  flex: 0 0 30px;
  align-items: center;
  width: 100%;
  font-size: 14px;
  cursor: pointer;
  margin-top: 5px;
  background-color: ${({ theme, index, selectedIndex }) =>
    index === selectedIndex
      ? theme.colors.VideoPlayer.levels.selectedBackground
      : ''};
  padding: 0 ${PADDING};
  text-align: right;
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
    const {
      currentPlaybackLevel,
      playbackLevels,
      onPlaybackLevelChange,
      open,
      onClose
    } = this.props
    const offsetXPercentage: number = this.getLevelsListOffsetPercentage()
    const selectedIndex: number = this.getSelectedLevelIndex()
    const numLevels: number = playbackLevels.size

    return (
      <Popover
        open={open}
        onClose={onClose}
        bottom={`${CONTROLS_HEIGHT}`}
        right={0}
      >
        <Wrapper>
          <TopBar>
            <Title>Video Quality</Title>
          </TopBar>
          <LevelsList offsetXPercentage={offsetXPercentage}>
            {playbackLevels.map((level: PlaybackLevel, index: number) => (
              <Level
                numLevels={numLevels}
                selectedIndex={selectedIndex}
                index={index}
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
        </Wrapper>
      </Popover>
    )
  }
}

export default PlaybackLevels
