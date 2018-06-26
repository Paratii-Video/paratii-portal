/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import ChallengePeriod from './ChallengePeriod'
import WhiteListed from './WhiteListed'
import CommitYourVote from './CommitYourVote'
import SendYourVoteBack from './SendYourVoteBack'
import VideoApproved from './VideoApproved'
import VideoRejected from './VideoRejected'
import VoteCommitted from './VoteCommitted'
import VoteRevealed from './VoteRevealed'
import Voting from './Voting'

type Props = {
  videoId: number,
  whiteListed: boolean
}

// Sidebar
const Sidebar = styled.div`
  display: flex;
  flex: 1 1 410px;
  flex-direction: column;
`

class SidebarTCR extends Component<Props, void> {
  render () {
    const { videoId, whiteListed } = this.props
    const challenging = true
    const voteCommited = false
    const voteSent = false
    const videoApproved = false
    const endVote = false

    return (
      <Sidebar>
        {whiteListed && <WhiteListed videoId={videoId} />}

        {!whiteListed && challenging ? (
          <div>
            <ChallengePeriod status="challenged" />
            {voteCommited ? (
              <VoteCommitted />
            ) : (
              <CommitYourVote videoId={videoId} />
            )}
          </div>
        ) : (
          <div>
            <ChallengePeriod status="inReveal" />
            {voteSent ? <VoteRevealed /> : <SendYourVoteBack />}
          </div>
        )}

        {endVote && (
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
