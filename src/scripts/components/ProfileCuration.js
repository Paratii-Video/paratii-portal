/* @flow */
/* stylelint-disable */
import React, { Component } from 'react'
import styled from 'styled-components'
import Colors from './foundations/base/Colors'
import SVGIcon from './foundations/SVGIcon'
import Title from './foundations/Title'
import Text from './foundations/Text'
import Card from './structures/Card'
import UserBadge from './widgets/UserBadge'
import ChallengePeriod from './widgets/tcr/ChallengePeriod'
import WhiteListed from './widgets/tcr/WhiteListed'
import CommitYourVote from './widgets/tcr/CommitYourVote'
import SendYourVoteBack from './widgets/tcr/SendYourVoteBack'
import VideoApproved from './widgets/tcr/VideoApproved'
import VideoRejected from './widgets/tcr/VideoRejected'
import VoteCommitted from './widgets/tcr/VoteCommitted'
import Voting from './widgets/tcr/Voting'

type Props = {}

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

class ProfileCuration extends Component<Props, void> {
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
          <ChallengePeriod inReveal />

          <WhiteListed />

          <CommitYourVote />

          <VoteCommitted />

          <Voting />

          <SendYourVoteBack />

          <VideoApproved />

          <VideoRejected />
        </Sidebar>
      </Wrapper>
    )
  }
}

export default ProfileCuration
