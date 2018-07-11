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
import { VOTE_STATE } from 'constants/TCRConstants'

type Props = {
  videoId: string,
  whiteListed: boolean,
  videoChallenged: boolean,
  voteStatus: string,
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
    const { videoId, whiteListed, videoChallenged, voteStatus } = this.props

    // Vote status
    const voteCommited = voteStatus === VOTE_STATE.COMMITTED
    const voteSent = voteStatus === VOTE_STATE.SENT
    const videoApproved = voteStatus === VOTE_STATE.APPROVED

    const endVote = false

    return (
      <Sidebar>
        {whiteListed && <WhiteListed videoId={videoId} />}

        {!whiteListed && videoChallenged ? (
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

        {!whiteListed &&
          endVote && (
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
