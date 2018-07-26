/* @flow */
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Text from 'components/foundations/Text'
import Title from 'components/foundations/Title'
import TranslatedText from 'components/translations/TranslatedText'
import { BORDER_RADIUS } from 'constants/UIConstants'

type Props = {
  status: string,
  commitEnd: number,
  revealEnd: number
}

type State = {
  commitEnd: number,
  revealEnd: number,
  hours: number,
  minutes: number,
  seconds: number,
  intervalId: number
}

const ChallengePeriod = styled.div`
  align-items: center;
  background: linear-gradient(
    135deg,
    ${props =>
    props.status === 'inReveal'
      ? props.theme.colors.button.highlightFrom
      : props.theme.colors.button.primaryFrom}
      30%,
    ${props =>
    props.status === 'inReveal'
      ? props.theme.colors.button.primaryTo
      : props.theme.colors.button.primaryTo}
      ${props => (props.status === 'inReveal' ? '150%' : '100%')}
  );
  border-radius: ${BORDER_RADIUS};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 25px 60px;
`

const ChallengeTimeWrapper = styled.div`
  margin: 35px 0;
  text-align: center;
  width: 100%;
`

const ChallengeTime = styled.div`
  display: inline-flex;
  flex-direction: column;
  text-align: center;
  vertical-align: bottom;
  width: 16%;
`

const ChallengeSequence = styled(ChallengeTimeWrapper)`
  margin: 0;
`

const ChallengeSequenceText = styled(Text)`
  display: inline-block;
  text-align: center;
  width: 33.2%;
`

const ChallengeTimeline = styled(ChallengeTimeWrapper)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0;
  position: relative;
  width: 70%;
`

const ChallengeLine = styled.span`
  border-top: 2px ${({ dashed }) => (dashed ? 'dashed' : 'solid')}
    ${props => props.theme.colors.text.accent};
  left: 0;
  opacity: ${({ dashed }) => (dashed ? 0.5 : null)};
  opacity: ${({ dashed }) => (dashed ? 0.5 : null)};
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  width: ${({ width }) => width || '100%'};
`

const circles = `
  &:before,
  &:after {
    content: '';
    border: 2px solid white;
    border-radius: 100%;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  &:before {
    height: 22px;
    opacity: 0.5;
    width: 22px;
  }

  &:after {
    height: 36px;
    opacity: 0.2;
    width: 36px;
  }
`

const ChallengeSequenceDot = styled.span`
  background: ${props => props.theme.colors.text.accent};
  border-radius: 100%;
  height: ${props => (props.active ? '12px' : '8px')};
  position: relative;
  width: ${props => (props.active ? '12px' : '8px')};
  z-index: 2;
  ${props =>
    props.active &&
    css`
      ${circles};
    `};
`

class ChallengePeriodComponent extends Component<Props, State> {
  setTimer: (dateDiff: number) => void
  timer: () => number

  constructor (props: Props) {
    super(props)

    this.state = {
      commitEnd: new Date(this.props.commitEnd * 1000),
      revealEnd: new Date(this.props.revealEnd * 1000),
      hours: 0,
      minutes: 0,
      seconds: 0,
      intervalId: NaN
    }

    this.setTimer = this.setTimer.bind(this)
    this.timer = this.timer.bind(this)
  }

  componentDidMount (): void {
    const now = new Date()
    let interval = NaN

    if (this.props.status === 'inReveal') {
      if (now <= this.state.revealEnd) {
        interval = setInterval(this.timer, 1000)
      }
    } else {
      if (now <= this.state.commitEnd) {
        interval = setInterval(this.timer, 1000)
      }
    }

    this.setState({ intervalId: interval })
  }

  componentWillUnmount (): void {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId)
    }
  }

  setTimer (dateDiff: number) {
    const hours = Math.floor(dateDiff / 3600) % 24
    const minutes = Math.floor(dateDiff / 60) % 60
    const seconds = Math.floor(dateDiff) % 60

    this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    })
  }

  timer () {
    console.log('timer..')
    const now = new Date()
    let dateDiff = null

    if (this.props.status === 'inReveal') {
      if (now <= this.state.revealEnd) {
        dateDiff = Math.abs(this.state.revealEnd - now) / 1000
      }
    } else {
      if (now <= this.state.commitEnd) {
        dateDiff = Math.abs(this.state.commitEnd - now) / 1000
      }
    }

    if (dateDiff) {
      this.setTimer(dateDiff)
    } else {
      clearInterval(this.state.intervalId)
      this.setState({
        hours: 0,
        minutes: 0,
        seconds: 0
      })
    }
  }

  render () {
    return (
      <ChallengePeriod status={this.props.status}>
        {this.props.status === 'inReveal' ? (
          <Text accent big>
            <TranslatedText message="tcr.ChallengePeriod.inRevealTitle_html" />
          </Text>
        ) : (
          <Text accent big>
            <TranslatedText message="tcr.ChallengePeriod.challengedTitle_html" />
          </Text>
        )}

        <ChallengeTimeWrapper>
          <ChallengeTime>
            <Text accent tiny>
              <TranslatedText message="tcr.ChallengePeriod.hourLabel" />
            </Text>
            <Title accent bigger bold>
              {this.state.hours}
            </Title>
          </ChallengeTime>
          <ChallengeTime>
            <Title accent bigger bold>
              :
            </Title>
          </ChallengeTime>
          <ChallengeTime>
            <Text accent tiny>
              <TranslatedText message="tcr.ChallengePeriod.minutesLabel" />
            </Text>
            <Title accent bigger bold>
              {this.state.minutes}
            </Title>
          </ChallengeTime>
          <ChallengeTime>
            <Title accent bigger bold>
              :
            </Title>
          </ChallengeTime>
          <ChallengeTime>
            <Text accent tiny>
              <TranslatedText message="tcr.ChallengePeriod.secondsLabel" />
            </Text>
            <Title accent bigger bold>
              {this.state.seconds}
            </Title>
          </ChallengeTime>
        </ChallengeTimeWrapper>

        {this.props.status === 'inReveal' ? (
          <ChallengeSequence>
            <ChallengeSequenceText accent disabled>
              <TranslatedText message="tcr.ChallengePeriod.whitelistedLabel" />
            </ChallengeSequenceText>
            <ChallengeSequenceText accent disabled>
              <TranslatedText message="tcr.ChallengePeriod.challengedLabel" />
            </ChallengeSequenceText>
            <ChallengeSequenceText accent bold>
              <TranslatedText message="tcr.ChallengePeriod.inRevealLabel" />
            </ChallengeSequenceText>
          </ChallengeSequence>
        ) : (
          <ChallengeSequence>
            <ChallengeSequenceText accent disabled>
              <TranslatedText message="tcr.ChallengePeriod.whitelistedLabel" />
            </ChallengeSequenceText>
            <ChallengeSequenceText accent bold>
              <TranslatedText message="tcr.ChallengePeriod.challengedLabel" />
            </ChallengeSequenceText>
            <ChallengeSequenceText accent disabled>
              <TranslatedText message="tcr.ChallengePeriod.inRevealLabel" />
            </ChallengeSequenceText>
          </ChallengeSequence>
        )}

        {this.props.status === 'inReveal' ? (
          <ChallengeTimeline>
            <ChallengeSequenceDot />
            <ChallengeSequenceDot />
            <ChallengeSequenceDot active />

            <ChallengeLine dashed />
            <ChallengeLine width="100%" />
          </ChallengeTimeline>
        ) : (
          <ChallengeTimeline>
            <ChallengeSequenceDot />
            <ChallengeSequenceDot active />
            <ChallengeSequenceDot future />

            <ChallengeLine dashed />
            <ChallengeLine width="50%" />
          </ChallengeTimeline>
        )}
      </ChallengePeriod>
    )
  }
}

export default ChallengePeriodComponent
