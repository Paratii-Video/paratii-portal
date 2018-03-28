/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'

const PROGRESS_INDICATOR_DIMENSION: number = 20

const Wrapper = styled.div`
  width: 100%;
  padding: 0 12px;
  position: absolute;
`

const WrapperMove = styled.div`
  width: 100%;
  height: ${PROGRESS_INDICATOR_DIMENSION + 4}px;
  overflow: hidden;
  display: flex;
  align-items: center;
`
const Move = styled.div`
  width: 100%;
  height: 0;
  top: 0;
  position: absolute;
  transform: translate3d(
    ${props =>
    Math.max(Math.min(props.current / props.total * 100, 100), 0) + '%'},
    0,
    0
  );
`

export const Circle = styled.div`
  width: ${PROGRESS_INDICATOR_DIMENSION}px;
  height: ${PROGRESS_INDICATOR_DIMENSION}px;
  transform: translate3d(-100%, 2px, 0);
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.bar.scrubber};
    border-radius: 50%;
  }

  &::before {
    opacity: 0.5;
    transform: scale(${props => (props.userIsScrubbing ? 1 : 0.5)});
    transition: transform ${props => (props.userIsScrubbing ? '1s' : '0.8s')}
      ${({ theme }) => theme.animation.ease.smooth};
    ${Wrapper}:hover & {
      transform: scale(1);
    }
  }

  &::after {
    transform: scale(${props => (props.userIsScrubbing ? 0.6 : 0.5)});
    transition: transform ${props => (props.userIsScrubbing ? '0.7s' : '0.5s')}
      ${({ theme }) => theme.animation.ease.smooth};
  }
`

type Props = {
  current: number,
  total: number,
  userIsScrubbing: boolean
}

class ProgressIndicator extends Component<Props, void> {
  constructor (props: Props) {
    super(props)
    console.log(props)
  }

  componentWillReceiveProps (nextProps: Props): void {
    console.log(nextProps)
  }
  render () {
    return (
      <Wrapper>
        <WrapperMove>
          <Move
            current={this.props.current}
            total={this.props.total}
            userIsScrubbing={this.props.userIsScrubbing}
          >
            <Circle userIsScrubbing={this.props.userIsScrubbing} />
          </Move>
        </WrapperMove>
      </Wrapper>
    )
  }
}

export default ProgressIndicator
