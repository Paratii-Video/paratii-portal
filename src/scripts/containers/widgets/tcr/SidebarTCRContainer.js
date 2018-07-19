/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  isVideoWhiteListed
  // videoChallengeExists
} from 'selectors/VideoSelectors'
// import { getVoteStatus } from 'selectors/TCRSelectors'
import { fetchChallenge } from 'actions/TCRActions'
import SidebarTCR from 'components/widgets/tcr/SidebarTCR'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => {
  // videoChallengeExists: videoChallengeExists(state),
  // voteStatus: getVoteStatus(state),
  // tcr states
  // Of the next 4 states, only one can be true at any time
  const inChallenge = false
  // const inChallenge = videoChallengeExists
  const inReveal = false
  // todo: the VOTE_STATE is not correct here
  // const videoApproved = voteStatus === VOTE_STATE.APPROVED
  const videoApproved = false
  const videoRejected = false

  const hasBeenChallenged =
    inChallenge || inReveal || videoApproved || videoRejected
  const challengeEnded = videoApproved || videoRejected
  // state of the user's vote
  // TODO: the VOTE_STATE is not correct here
  // const voteCommited = voteStatus === VOTE_STATE.COMMITTED
  const voteCommited = true
  // const voteRevealed = voteStatus === VOTE_STATE.REVEALED
  const voteRevealed = true

  return {
    isWhitelisted: isVideoWhiteListed(state),
    // at most one of the next 4 states can be true at any one time
    inChallenge,
    inReveal,
    videoApproved,
    // videoRejected,
    hasBeenChallenged,
    challengeEnded,
    voteCommited,
    voteRevealed
  }
}

const mapDispatchToProps = dispatch => ({
  fetchChallenge: bindActionCreators(fetchChallenge, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarTCR)
