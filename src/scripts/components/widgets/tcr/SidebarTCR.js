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
  isWhitelisted: boolean,
  inChallenge: boolean,
  inReveal: boolean,
  videoApproved: boolean,
  // videoRejected: boolean,
  hasBeenChallenged: boolean,
  challengeEnded: boolean,
  voteCommited: boolean,
  voteRevealed: boolean,
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

    props.fetchChallenge(props.videoId)
  }
  render () {
    const {
      videoId,
      isWhitelisted,
      inChallenge,
      inReveal,
      videoApproved,
      // videoRejected,
      hasBeenChallenged,
      challengeEnded,
      voteCommited,
      voteRevealed
    } = this.props

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
