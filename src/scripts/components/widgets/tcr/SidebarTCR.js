/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import ChallengePeriod from './ChallengePeriod'
import WhiteListed from 'containers/widgets/tcr/WhiteListedContainer'
import CommitYourVote from 'containers/widgets/tcr/CommitYourVoteContainer'
import Card from 'components/structures/Card'
import SendYourVoteBack from './SendYourVoteBack'
import VideoApproved from './VideoApproved'
import VideoRejected from './VideoRejected'
import VoteCommitted from './VoteCommitted'
import VoteRevealed from './VoteRevealed'
import Voting from './Voting'

type Props = {
  videoId: string,
  tcrState: string,
  voteState: string,
  fetchChallenge: string => void
}

// Sidebar
const Sidebar = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  width: 100%;
`

class SidebarTCR extends Component<Props, void> {
  constructor (props: Props) {
    super(props)
    // TODO: this should be done in the SidebarTCRContainer
    props.fetchChallenge(props.videoId)
  }
  render () {
    const { videoId, tcrState, voteState } = this.props
    const isWhitelisted = tcrState === 'appWasMade'
    const inChallenge = tcrState === 'inChallenge'
    const inReveal = tcrState === 'inReveal'
    const videoApproved = tcrState === 'videoApproved'
    const hasBeenChallenged =
      tcrState !== 'notInTcr' && tcrState !== 'appWasMade'
    const challengeEnded =
      tcrState === 'videoApproved' || tcrState === 'videoRejected'
    const voteCommited = voteState === 'voteCommitted'
    const voteRevealed = voteState === 'voteRevealed'

    return (
      <Sidebar>
        {isWhitelisted &&
          !hasBeenChallenged && (
          <Card>
            <WhiteListed videoId={videoId} />
          </Card>
        )}

        {inChallenge && (
          <div>
            <ChallengePeriod status="challenged" />
            {voteCommited ? (
              <Card marginTop>
                <VoteCommitted />
              </Card>
            ) : (
              <Card marginTop>
                <CommitYourVote videoId={videoId} />
              </Card>
            )}
          </div>
        )}
        {inReveal && (
          <div>
            <ChallengePeriod status="inReveal" />
            <Card marginTop>
              {voteRevealed ? <VoteRevealed /> : <SendYourVoteBack />}
            </Card>
          </div>
        )}

        {challengeEnded && (
          <div>
            <Card>
              <Voting />
            </Card>
            <Card marginTop>
              {videoApproved ? <VideoApproved /> : <VideoRejected />}
            </Card>
          </div>
        )}
      </Sidebar>
    )
  }
}

export default SidebarTCR
