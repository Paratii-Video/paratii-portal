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
import Voting from './Voting'

type Props = {
  videoId: number
}

// Sidebar
const Sidebar = styled.div`
  display: flex;
  flex: 1 1 410px;
  flex-direction: column;
`

class SidebarTCR extends Component<Props, void> {
  render () {
    const whiteListed = true
    const voteCommited = false
    const challenging = false
    const videoApproved = false

    return (
      <Sidebar>
        {whiteListed ? (
          <WhiteListed videoId={this.props.videoId} />
        ) : (
          <CommitYourVote />
        )}

        {voteCommited && <VoteCommitted />}

        {challenging ? <ChallengePeriod inReveal /> : <Voting />}

        <SendYourVoteBack />

        {!challenging && videoApproved ? <VideoApproved /> : <VideoRejected />}
      </Sidebar>
    )
  }
}

export default SidebarTCR
