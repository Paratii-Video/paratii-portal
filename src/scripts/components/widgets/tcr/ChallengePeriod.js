/* @flow */
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Text, { Strong } from 'components/foundations/Text'
import Title from 'components/foundations/Title'

type Props = {
  status: string
}

const INFOSTATUS_CARD_MARGIN_BOTTOM: string = '15px'

const ChallengePeriod = styled.div`
  align-items: center;
  background: linear-gradient(
    135deg,
    ${props =>
    props.status === 'inReveal'
      ? props.theme.colors.ProfileCuration.ChallengeBackgroundTwoFrom
      : props.theme.colors.ProfileCuration.ChallengeBackgroundOneFrom}
      0%,
    ${props =>
    props.status === 'inReveal'
      ? props.theme.colors.ProfileCuration.ChallengeBackgroundTwoTo
      : props.theme.colors.ProfileCuration.ChallengeBackgroundOneTo}
      100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${INFOSTATUS_CARD_MARGIN_BOTTOM};
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
    ${props => props.theme.colors.ProfileCuration.ChallengeSequenceDot};
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
  background: ${props =>
    props.theme.colors.ProfileCuration.ChallengeSequenceDot};
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

class ChallengePeriodComponent extends Component<Props, void> {
  render () {
    return (
      <ChallengePeriod status={this.props.status}>
        {this.props.status === 'inReveal' ? (
          <Text big>
            <Strong>Time to reveal</Strong> ends in
          </Text>
        ) : (
          <Text big>
            <Strong>Challenged period</Strong> ends in
          </Text>
        )}

        <ChallengeTimeWrapper>
          <ChallengeTime>
            <Text tiny>hours</Text>
            <Title bigger bold>
              19
            </Title>
          </ChallengeTime>
          <ChallengeTime>
            <Title bigger bold>
              :
            </Title>
          </ChallengeTime>
          <ChallengeTime>
            <Text tiny>minutes</Text>
            <Title bigger bold>
              20
            </Title>
          </ChallengeTime>
          <ChallengeTime>
            <Title bigger bold>
              :
            </Title>
          </ChallengeTime>
          <ChallengeTime>
            <Text tiny>seconds</Text>
            <Title bigger bold>
              47
            </Title>
          </ChallengeTime>
        </ChallengeTimeWrapper>

        {this.props.status === 'inReveal' ? (
          <ChallengeSequence>
            <ChallengeSequenceText disabled>whitelisted</ChallengeSequenceText>
            <ChallengeSequenceText disabled>challenged</ChallengeSequenceText>
            <ChallengeSequenceText bold>in reveal</ChallengeSequenceText>
          </ChallengeSequence>
        ) : (
          <ChallengeSequence>
            <ChallengeSequenceText disabled>whitelisted</ChallengeSequenceText>
            <ChallengeSequenceText bold>challenged</ChallengeSequenceText>
            <ChallengeSequenceText disabled>in reveal</ChallengeSequenceText>
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
