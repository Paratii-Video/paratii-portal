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
  transform: translateX(${({ offsetX }) => offsetX}px);
`

const LevelLabel = styled.span`
  opacity: ${({ totalLevels, index }) => index * (1.0 - 0.5) / (totalLevels - 1) + 0.5};
`

const Level = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10%;
  opacity: ${({ totalLevels, index }) => (index + 1) / totalLevels * (1.0 - 0.4) + 0.4};

  @media (max-width: 1200px) {
    &:first-child {
      margin-left: 0;
    }
  }
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
  onClose: () => void,
}

type State = {
  offsetX: number,
  selectedLevelRef: ?HTMLElement,
  selectedIndicatorRef: ?HTMLElement,
}

class PlaybackLevels extends React.Component<Props, State> {
  levelRefs: { [key: number]: HTMLElement } = {}
  currentLevelsOffset: number = 0

  constructor (props: Props) {
    super(props)

    this.state = {
      offsetX: 0,
      selectedLevelRef: null,
      selectedIndicatorRef: null
    }
  }

  componentDidMount () {
    const { currentPlaybackLevel } = this.props

    if (currentPlaybackLevel) {
      this.setState({
        selectedLevelRef: this.levelRefs[currentPlaybackLevel.get('id')]
      })
    }
  }

  componentWillReceiveProps (nextProps: Props) {
    const { currentPlaybackLevel, playbackLevels } = this.props
    const nextPlaybackLevel: ?PlaybackLevel = nextProps.currentPlaybackLevel
    if (nextPlaybackLevel && nextPlaybackLevel !== currentPlaybackLevel) {
      this.setState((prevState: State) => {
        const nextLevelRef: ?HTMLElement = this.levelRefs[
          nextPlaybackLevel.get('id')
        ]

        if (nextLevelRef) {
          const refRect: Object = nextLevelRef.getBoundingClientRect()
          const wrapperRect: Object = this.wrapperRef.getBoundingClientRect()
          return {
            offsetX: wrapperRect.width / 2 -
              wrapperRect.width / playbackLevels.size
          }
        }
      })
    }
  }

  selectedIndicatorRefCallback = (ref: HTMLElement) => {
    this.setState((prevState: State) => {
      if (prevState.selectedIndicatorRef) {
        return null
      }
      return { selectedIndicatorRef: ref }
    })
  }

  levelRefCallback = (id: number, ref: HTMLElement) => {
    this.levelRefs[id] = this.levelRefs[id] || ref
  }

  onPlaybackLevelChange = (id: number) => {
    const { onPlaybackLevelChange } = this.props
    this.setState({
      selectedLevelRef: this.levelRefs[id]
    })

    onPlaybackLevelChange(id)
  }

  render () {
    const { currentPlaybackLevel, playbackLevels, open, onClose } = this.props
    const { offsetX } = this.state

    return (
      <SlideModal open={open || true} onClose={onClose}>
        <Wrapper
          innerRef={ref => {
            this.wrapperRef = ref
          }}
        >
          <TopBar>
            <Title>Video Quality</Title>
          </TopBar>
          <LevelsList offsetX={offsetX}>
            {playbackLevels.map((level: PlaybackLevel, index: number) => (
              <Level
                innerRef={(ref: HTMLElement) => {
                  this.levelRefCallback(level.get('id'), ref)
                }}
                key={level.get('id')}
                onClick={() => {
                  this.onPlaybackLevelChange(level.get('id'))
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
          <SelectedIndicator innerRef={this.selectedIndicatorRefCallback} />
        </Wrapper>
      </SlideModal>
    )
  }
}

export default PlaybackLevels
