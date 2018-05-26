/* @flow */

import React from 'react'
import styled from 'styled-components'
import { List as ImmutableList } from 'immutable'
import Text from 'components/foundations/Text'
import Popover from 'components/foundations/Popover'
import CloseButton from 'components/foundations/buttons/CloseButton'
import { CONTROLS_HEIGHT } from 'constants/UIConstants'
import { PlaybackLevel } from 'records/PlayerRecords'

const PADDING: string = '20px'
const LevelHeight: number = 42
const WrapperBottomSpace: number = 100

const RESOLUTIONS = {
  Auto: 'Auto',
  '2760.7Kbps': '1080p',
  '1327.1Kbps': '720p',
  '763.9Kbps': '480p',
  '423.9Kbps': '360p',
  '155.6Kbps': '240p',
  '64Kbps': '144p'
}

const Wrapper = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  width: 180px;
`

const TopBar = styled.div`
  flex: 0 0 20%;
  display: flex;
  align-items: center;
  padding: ${PADDING};
`

const Title = Text.extend`
  display: flex;
  flex: 1 1 0;
  align-items: center;
`

const LevelsList = styled.ul`
  flex: 1 1 0;
  height: ${({ height }) => (height ? height + 'px' : null)};
`

const Level = styled.li`
  height: ${LevelHeight + 'px'};
  line-height: ${LevelHeight + 'px'};
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({ theme, selected }) =>
    selected
      ? theme.colors.VideoPlayer.levels.selectedBackground
      : 'transparent'};
  padding: 0 ${PADDING};
  transition: background ${({ theme }) => theme.animation.time.repaint};

  &::before {
    content: '•';
    display: inline-block;
    font-size: 20px;
    margin-right: 5px;
    transform: scale(${({ selected }) => (selected ? 1 : 0)}) translateY(2px);
    transition: transform 0.7s ${({ theme }) => theme.animation.ease.smooth};
  }
`

const LevelLabel = styled.p`
  display: inline-block;
  font-size: ${props => props.theme.fonts.video.quality.levelsDesktop};

  @media (max-width: 1680px) {
    font-size: ${props => props.theme.fonts.video.quality.levels};
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
  getMaxHeight: () => number
  constructor (props: Props) {
    super(props)
    this.getMaxHeight = this.getMaxHeight.bind(this)
  }

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

  getMaxHeight (): number {
    let numLevels: number = this.props.playbackLevels.size
    const elementHeight: number =
      (numLevels + 1) * LevelHeight + WrapperBottomSpace
    const documentHeight: number = document.body
      ? document.body.clientHeight
      : elementHeight + 1
    const difference: number = elementHeight - documentHeight

    if (difference > 0) {
      numLevels = numLevels - Math.round(difference / LevelHeight)
    }

    return numLevels
  }

  render () {
    const { playbackLevels, onPlaybackLevelChange, open, onClose } = this.props
    const offsetXPercentage: number = this.getLevelsListOffsetPercentage()
    const selectedIndex: number = this.getSelectedLevelIndex()
    const getMaxHeight = this.getMaxHeight
    const numLevels: number = playbackLevels.size

    return (
      <Popover open={open} bottom={`${CONTROLS_HEIGHT}`} right={0}>
        <Wrapper>
          <TopBar>
            <Title small>Quality</Title>
            <CloseButton onClick={onClose} />
          </TopBar>
          <LevelsList offsetXPercentage={offsetXPercentage}>
            {playbackLevels.map((level: PlaybackLevel, index: number) => {
              if (index < getMaxHeight()) {
                return (
                  <Level
                    numLevels={numLevels}
                    selected={selectedIndex === index}
                    key={level.get('id')}
                    onClick={() => {
                      onPlaybackLevelChange(level.get('id'))
                    }}
                  >
                    <LevelLabel small>
                      {RESOLUTIONS[level.get('label')]}
                    </LevelLabel>
                  </Level>
                )
              }
            })}
          </LevelsList>
        </Wrapper>
      </Popover>
    )
  }
}

export default PlaybackLevels
