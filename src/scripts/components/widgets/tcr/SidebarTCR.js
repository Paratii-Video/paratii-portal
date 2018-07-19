/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import ChallengePeriod from './ChallengePeriod'
import WhiteListed from 'containers/widgets/tcr/WhiteListedContainer'
import CommitYourVote from 'containers/widgets/tcr/CommitYourVoteContainer'
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
  flex: 1 1 410px;
  flex-direction: column;
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
          !hasBeenChallenged && <WhiteListed videoId={videoId} />}

        {inChallenge && (
          <div>
            <ChallengePeriod status="challenged" />
            {voteCommited ? (
              <VoteCommitted />
            ) : (
              <CommitYourVote videoId={videoId} />
            )}
          </div>
        )}
        {inReveal && (
          <div>
            <ChallengePeriod status="inReveal" />
            {voteRevealed ? <VoteRevealed /> : <SendYourVoteBack />}
          </div>
        )}

        {challengeEnded && (
          <div>
            <Voting />
            {videoApproved ? <VideoApproved /> : <VideoRejected />}
          </div>
        )}
      </Sidebar>
    )
  }
}

export default SidebarTCR
