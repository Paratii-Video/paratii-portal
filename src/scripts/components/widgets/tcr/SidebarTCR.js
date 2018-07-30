/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import ChallengePeriod from './ChallengePeriod'
import WhiteListed from 'containers/widgets/tcr/WhiteListedContainer'
import CommitYourVote from 'containers/widgets/tcr/CommitYourVoteContainer'
import Card from 'components/structures/Card'
import RevealYourVote from 'containers/widgets/tcr/RevealYourVoteContainer'
import VideoApproved from './VideoApproved'
import VideoRejected from './VideoRejected'
import VoteCommitted from './VoteCommitted'
import VoteRevealed from './VoteRevealed'
import Voting from './Voting'
import { VOTE_STATE } from 'constants/TCRConstants'

type Props = {
  challenge: Object,
  videoId: string,
  tcrState: string,
  voteState: string,
  voteInfo: Object,
  fetchVoteStatus: string => void,
  tcrRerenderComponents: Object => void
}

// Sidebar
const Sidebar = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  width: 100%;
`

class SidebarTCR extends Component<Props, void> {
  challengeDate: () => string

  constructor (props: Props) {
    super(props)
    // TODO: this should be done in the SidebarTCRContainer
    // TODO: this is WRONG, fetchVoteStatus takes the pollID as an argument
    props.fetchVoteStatus(props.videoId)

    this.challengeDate = this.challengeDate.bind(this)
  }

  challengeDate () {
    const { commitStartDate } = this.props.challenge
    const date = new Date(commitStartDate * 1000)
    const fullDate =
      date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()

    return fullDate
  }

  render () {
    const { challenge, videoId, tcrState, voteState, voteInfo } = this.props
    console.log(this.props)
    console.log(`render() SidbarTCR`)
    console.log(`tcrState: ${tcrState}`)
    console.log(`voteState: ${voteState}`)
    console.log(`voteInfo.vote: ${voteInfo.vote}`)
    console.log(`videoId: ${videoId}`)
    const isWhitelisted = tcrState === 'appWasMade'
    const inChallenge = tcrState === 'inChallenge'
    const inReveal = tcrState === 'inReveal'
    const videoApproved = tcrState === 'videoApproved'
    const hasBeenChallenged =
      tcrState !== 'notInTcr' && tcrState !== 'appWasMade'
    const challengeEnded =
      tcrState === 'videoApproved' || tcrState === 'videoRejected'
    const voteCommitted = voteState === VOTE_STATE.COMMITTED
    const voteRevealed = voteState === VOTE_STATE.REVEALED
    console.log(`voteCommitted: ${voteCommitted}`)
    console.log(`VOTE_STATE.COMMITTED: ${VOTE_STATE.COMMITTED}`)
    console.log(`voteRevealed: ${voteRevealed}`)

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
            <ChallengePeriod
              commitEnd={challenge.commitEndDate}
              revealEnd={challenge.revealEndDate}
              tcrRerenderComponents={this.props.tcrRerenderComponents}
              videoId={videoId}
              status="challenged"
            />
            {voteCommitted ? (
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
            <ChallengePeriod
              commitEnd={challenge.commitEndDate}
              revealEnd={challenge.revealEndDate}
              tcrRerenderComponents={this.props.tcrRerenderComponents}
              videoId={videoId}
              status="inReveal"
            />
            <Card marginTop>
              {voteRevealed ? <VoteRevealed /> : <RevealYourVote />}
            </Card>
          </div>
        )}

        {challengeEnded && (
          <div>
            <Card>
              <Voting
                votesFor={challenge.votesFor || 0}
                votesAgainst={challenge.votesAgainst || 0}
                date={this.challengeDate()}
              />
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
