/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  current: number,
  total: number,
  userIsScrubbing: boolean,
  small: boolean
}

const PROGRESS_INDICATOR_DIMENSION: number = 20
const PROGRESS_INDICATOR_DIMENSION_SMALL: number = 16

const Wrapper = styled.div`
  width: 100%;
  padding: 0 12px;
  position: absolute;
`

const WrapperMove = styled.div`
  width: 100%;
  height: ${props =>
    props.small
      ? PROGRESS_INDICATOR_DIMENSION_SMALL + 2
      : PROGRESS_INDICATOR_DIMENSION + 4}px;
  display: flex;
  align-items: center;
`
const Move = styled.div`
  width: 100%;
  height: 0;
  top: 50%;
  position: absolute;
  transform: translate3d(
    ${props =>
    Math.max(Math.min(props.current / props.total * 100, 100), 0) + '%'},
    0,
    0
  );
`

export const Circle = styled.div`
  width: ${props =>
    props.small
      ? PROGRESS_INDICATOR_DIMENSION_SMALL
      : PROGRESS_INDICATOR_DIMENSION}px;
  height: ${props =>
    props.small
      ? PROGRESS_INDICATOR_DIMENSION_SMALL
      : PROGRESS_INDICATOR_DIMENSION}px;
  transform: translate3d(-100%, -50%, 0);
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
    transition: transform ${props => (props.userIsScrubbing ? '0.8s' : '0.6s')}
      ${({ theme }) => theme.animation.ease.smooth};
    ${Wrapper}:hover & {
      transform: scale(1);
    }
  }

  &::after {
    transform: scale(${props => (props.userIsScrubbing ? 0.7 : 0.6)});
    transition: transform ${props => (props.userIsScrubbing ? '0.5s' : '0.3s')}
      ${({ theme }) => theme.animation.ease.smooth};
  }
`

class ProgressIndicator extends Component<Props, void> {
  static defaultProps = {
    small: false
  }

  render () {
    const { userIsScrubbing, small, current, total } = this.props
    return (
      <Wrapper>
        <WrapperMove small={small}>
          <Move
            current={current}
            total={total}
            userIsScrubbing={userIsScrubbing}
          >
            <Circle userIsScrubbing={userIsScrubbing} small={small} />
          </Move>
        </WrapperMove>
      </Wrapper>
    )
  }
}

export default ProgressIndicator
