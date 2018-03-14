/* @flow */

import React from 'react'
import styled from 'styled-components'
import { List as ImmutableList } from 'immutable'

import { PlaybackLevel } from 'records/PlayerRecords'
import SlideModal from 'components/foundations/SlideModal'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 65px;
`

const TopBar = styled.div`
  flex: 0 0 33%;
  display: flex;
`

const Title = styled.div`
  display: block;
  font-size: 14px;
`

const LevelsList = styled.ul`
  flex: 1 1 0;
  width: 50%;
  min-width: 550px;
  margin: auto;
  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: space-around;
  overflow-y: scroll;
  transform: translateX(${({ offsetXPercentage }) => offsetXPercentage}%);
  transition: 250ms all ${({ theme }) => theme.animation.ease.smooth};
`

const Level = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  opacity: ${({ index, numLevels, selectedIndex }) =>
    1 - Math.abs((selectedIndex - index) / numLevels)};
`

const SelectedIndicator = styled.div`
  margin: auto;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-top: 5px;
  background-color: ${({ theme }) => theme.colors.VideoPlayer.levels.selected};
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
      <SlideModal open={open} onClose={onClose}>
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
          <SelectedIndicator />
        </Wrapper>
      </SlideModal>
    )
  }
}

export default PlaybackLevels
