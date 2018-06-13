/* @flow */

import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Colors from './foundations/base/Colors'
import { ButtonColor } from './foundations/Button'
import SVGIcon from './foundations/SVGIcon'
import Title from './foundations/Title'
import Text, { Strong } from './foundations/Text'
import Card, { CardStyle } from './structures/Card'
import ProgressBar, {
  ProgressBarWrapper
} from 'components/foundations/ProgressBar'
import UserBadge from './widgets/UserBadge'

type Props = {}

const INFOSTATUS_CARD_MARGIN_BOTTOM: string = '15px'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1285px;
  width: 100%;
`

const VideoWrapper = styled.div`
  display: flex;
  flex: 1 1 840px;
  flex-direction: column;
  margin-right: 20px;
`

const VideoInfo = styled(Card)`
  width: 100%;
`

const VideoInfoHeader = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.MainCard.border};
  margin-bottom: 50px;
  padding-bottom: 32px;
  width: 100%;
`

const VideoInfoTitle = styled(Title)`
  margin-bottom: 20px;
`

const VideoInfoHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
`

const VideoInfoData = styled.div`
  display: flex;
`

const VideoInfoDataItem = styled.div`
  align-items: center;
  display: flex;
  margin-left: 20px;
`

const VideoInfoContent = styled.div`
  display: flex;
  flex-direction: column;
`

const VideoInfoContentItem = styled.div`
  margin-bottom: 45px;
`

const ProofText = styled(Text)`
  background: ${Colors.grayDark};
  border-radius: 4px;
  margin-top: 10px;
  padding: 24px;
`

// Sidebar
const Sidebar = styled.div`
  display: flex;
  flex: 1 1 410px;
  flex-direction: column;
`

const InfoStatus = styled.div`
  ${CardStyle} margin-bottom: ${INFOSTATUS_CARD_MARGIN_BOTTOM};
`

const InfoStatusTitle = styled(Text)`
  display: flex;
  align-items: center;
`

const InfoStatusContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 20px;
`

const InfoStatusButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const InfoStatusButton = ButtonColor.extend`
  flex: 0 0 49%;
`

const Voting = styled.div`
  display: flex;
  flex-direction: column;
`

const VotingValuesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const VotingValue = styled.div`
  align-content: center;
  background-color: ${props => props.theme.colors.UserNav.UserPTIValueBox};
  display: flex;
  flex: 0 0 48.5%;
  flex-direction: column;
  justify-items: center;
  padding: 24px 14px 14px;
  text-align: center;
`

const VotingBarWrapper = styled(ProgressBarWrapper)`
  background: ${props => props.theme.colors.ProfileCuration.VotingBarTwo};
  margin: 20px 0 25px;
`

const VotingBar = styled(ProgressBar)`
  background: ${props => props.theme.colors.ProfileCuration.VotingBarOne};
`

const ChallengePeriod = styled.div`
  align-items: center;
  background: linear-gradient(
    135deg,
    ${props =>
    props.inReveal
      ? props.theme.colors.ProfileCuration.ChallengeBackgroundTwoFrom
      : props.theme.colors.ProfileCuration.ChallengeBackgroundOneFrom}
      0%,
    ${props =>
    props.inReveal
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

const ChallengeSequenceDot = styled.span`
  background: ${props =>
    props.theme.colors.ProfileCuration.ChallengeSequenceDot};
  border-radius: 100%;
  height: ${props => (props.active ? '12px' : '8px')};
  position: relative;
  width: ${props => (props.active ? '12px' : '8px')};
  z-index: 2;
  ${props =>
    props.active
      ? css`
          &::before,
          &::after {
            content: '';
          }
        `
      : null} &::before, &::after {
    border: 2px solid
      ${props => props.theme.colors.ProfileCuration.ChallengeSequenceDot};
    border-radius: 100%;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  &::before {
    height: 22px;
    opacity: 0.5;
    width: 22px;
  }
  &::after {
    height: 36px;
    opacity: 0.2;
    width: 36px;
  }
`

class Profile extends Component<Props, void> {
  render () {
    const MockAvatar = (
      <img src="http://www.onrouteforward.com/uploads/6/0/0/8/60080487/6808024.jpg" />
    )
    return (
      <Wrapper>
        <VideoWrapper>
          <Text>Video</Text>
          <VideoInfo nobackground>
            <VideoInfoHeader>
              <VideoInfoTitle small bold>
                Video title
              </VideoInfoTitle>
              <VideoInfoHeaderContent>
                <UserBadge
                  userAvatar={MockAvatar}
                  userName="Susan Medelin"
                  userDate="Since 2018"
                />
                <VideoInfoData>
                  <VideoInfoDataItem>
                    <Text gray>10.000 views</Text>
                  </VideoInfoDataItem>
                  <VideoInfoDataItem>
                    <Text pink>548 flags</Text>
                    <SVGIcon
                      color="pink"
                      icon="icon-flag"
                      width="16px"
                      height="18px"
                      margin="0 0 0 10px"
                    />
                  </VideoInfoDataItem>
                </VideoInfoData>
              </VideoInfoHeaderContent>
            </VideoInfoHeader>
            <VideoInfoContent>
              <VideoInfoContentItem>
                <Text>Proof-of-ownership</Text>
                <Text gray small>
                  The user wrote this to proof its ownership
                </Text>
                <ProofText purple bold>
                  I have the same video on youtube
                  https://www.youtube.com/watch?v=tGYIBWlJcro Please check out
                  before you watch it here
                </ProofText>
              </VideoInfoContentItem>
              <VideoInfoContentItem>
                <Text>Description</Text>
                <Text gray small>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  et risus egestas, facilisis justo nec, aliquam enim. Sed
                  lobortis mi sodales massa euismod sodales. Praesent lacinia ac
                  nulla eu mollis. Praesent vitae consequat massa. Morbi sed
                  massa vitae ligula tincidunt rutrum.
                </Text>
              </VideoInfoContentItem>
              <VideoInfoContentItem>
                <Text>Tags</Text>
                <Text gray small>
                  #Loremipsum #dolorsit #amet #consectetur #adipiscing{' '}
                </Text>
              </VideoInfoContentItem>
            </VideoInfoContent>
          </VideoInfo>
        </VideoWrapper>
        <Sidebar>
          <ChallengePeriod inReveal>
            <Text big>
              <Strong>challenged period</Strong> ends in
            </Text>
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

            <ChallengeSequence>
              <ChallengeSequenceText disabled>
                whitelisted
              </ChallengeSequenceText>
              <ChallengeSequenceText bold>challenged</ChallengeSequenceText>
              <ChallengeSequenceText disabled>in reveal</ChallengeSequenceText>
            </ChallengeSequence>

            <ChallengeTimeline>
              <ChallengeSequenceDot />
              <ChallengeSequenceDot active />
              <ChallengeSequenceDot future />

              <ChallengeLine dashed />
              <ChallengeLine width="50%" />
            </ChallengeTimeline>
          </ChallengePeriod>

          <InfoStatus>
            <InfoStatusContent>
              <InfoStatusTitle big>
                This video is <Strong>Whitelisted</Strong>
              </InfoStatusTitle>
            </InfoStatusContent>
            <InfoStatusContent>
              <Text gray>
                This video has been published in our network. If it has anything
                that goes against our policy challenge it and you’ll be rewarded
              </Text>
            </InfoStatusContent>
            <ButtonColor>Challenge this content</ButtonColor>
          </InfoStatus>

          <InfoStatus>
            <InfoStatusContent>
              <InfoStatusTitle>Committ your vote</InfoStatusTitle>
            </InfoStatusContent>
            <InfoStatusContent>
              <Text gray>
                This video has been published in our network. If it has anything
                that goes against our policy challenge it and you’ll be rewarded
              </Text>
            </InfoStatusContent>
            <InfoStatusContent>
              <InfoStatusTitle>Choose wise</InfoStatusTitle>
            </InfoStatusContent>
            <InfoStatusButtonWrapper>
              <InfoStatusButton green>Support</InfoStatusButton>
              <InfoStatusButton pink>Oppose</InfoStatusButton>
            </InfoStatusButtonWrapper>
          </InfoStatus>

          <InfoStatus>
            <InfoStatusContent>
              <InfoStatusTitle>
                <SVGIcon
                  color="white"
                  icon="icon-check"
                  height="18px"
                  width="18px"
                  margin="0 10px 0 0"
                />
                Vote committed
              </InfoStatusTitle>
            </InfoStatusContent>
            <Text gray>
              Wait until the committ period ends to reveal it.You will send it{' '}
              <Strong purple>back</Strong> when the reveal period starts. If you
              don’t send it back your vote is not going to be counted.
            </Text>
          </InfoStatus>

          <InfoStatus>
            <InfoStatusContent>
              <InfoStatusTitle>
                <SVGIcon
                  color="pink"
                  icon="icon-alert"
                  height="18px"
                  width="18px"
                  margin="0 10px 0 0"
                />
                You need to send back your vote!!
              </InfoStatusTitle>
            </InfoStatusContent>
            <InfoStatusContent>
              <Text gray>
                Wait until the committ period ends to reveal it.You will send it{' '}
                <Strong purple>back</Strong> when the reveal period starts. If
                you don’t send it back your vote is not going to be counted.
              </Text>
            </InfoStatusContent>
            <ButtonColor>Send back your vote</ButtonColor>
          </InfoStatus>

          <InfoStatus>
            <InfoStatusContent>
              <InfoStatusTitle>
                <SVGIcon
                  color="green"
                  icon="icon-check"
                  height="18px"
                  width="18px"
                  margin="0 10px 0 0"
                />
                This video has been approved
              </InfoStatusTitle>
            </InfoStatusContent>
            <Text gray>
              The Paratii community supported the permanence of this video on
              the platform. The video will continue to exist on the plataform
              and is going to be available for new challenges in 6 days
            </Text>
          </InfoStatus>

          <InfoStatus>
            <InfoStatusContent>
              <InfoStatusTitle>Voting</InfoStatusTitle>
            </InfoStatusContent>
            <Voting>
              <VotingValuesWrapper>
                <VotingValue>
                  <Text textTransform="uppercase" small green>
                    Support
                  </Text>
                  <Title big bold gray>
                    65%
                  </Title>
                </VotingValue>
                <VotingValue>
                  <Text textTransform="uppercase" small pink>
                    Oppose
                  </Text>
                  <Title big bold gray>
                    35%
                  </Title>
                </VotingValue>
              </VotingValuesWrapper>
              <VotingBarWrapper>
                <VotingBar current="65" total="100" />
              </VotingBarWrapper>
            </Voting>
            <Text small gray>
              Date of the challenge: 04/03/2018
            </Text>
          </InfoStatus>

          <InfoStatus>
            <InfoStatusContent>
              <InfoStatusTitle>
                <SVGIcon
                  color="pink"
                  icon="icon-close"
                  height="18px"
                  width="18px"
                  margin="0 10px 0 0"
                />
                This video has been rejected
              </InfoStatusTitle>
            </InfoStatusContent>
            <Text gray>
              The Paratii community opposed the permanence of this video on the
              platform. The video was deleted because most of our trustees
              believe that this video broke one of our policies
            </Text>
          </InfoStatus>
        </Sidebar>
      </Wrapper>
    )
  }
}

export default Profile
