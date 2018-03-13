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
  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: flex-start;
  overflow-y: scroll;
`

const LevelLabel = styled.span`
  opacity: ${({ totalLevels, index }) =>
    index * (1.0 - 0.5) / (totalLevels - 1) + 0.5};
`

const Level = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10%;
  opacity: ${({ totalLevels, index }) =>
    (index + 1) / totalLevels * (1.0 - 0.4) + 0.4};

  @media (max-width: 1200px) {
    &:first-child {
      margin-left: 0;
    }
  }

  &::after {
    display: block;
    margin-top: 5px;
    content: '';
    background-color: ${({ theme, selected }) =>
    selected ? theme.colors.VideoPlayer.levels.selected : 'transparent'};
    width: 7px;
    height: 7px;
    border-radius: 50%;
    justify-self: center;
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
  render () {
    const {
      currentPlaybackLevel,
      onPlaybackLevelChange,
      playbackLevels,
      open,
      onClose
    } = this.props
    return (
      <SlideModal open={open} onClose={onClose}>
        <Wrapper>
          <TopBar>
            <Title>Video Quality</Title>
          </TopBar>
          <LevelsList>
            {playbackLevels.map((level: PlaybackLevel, index: number) => (
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
                <LevelLabel index={index} totalLevels={playbackLevels.size}>
                  {level.get('label')}
                </LevelLabel>
              </Level>
            ))}
          </LevelsList>
        </Wrapper>
      </SlideModal>
    )
  }
}

export default PlaybackLevels
