/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchChallenge } from 'actions/TCRActions'
import SidebarTCR from 'components/widgets/tcr/SidebarTCR'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => {
  // the video can be in one of the following states:
  // - notInTcr: the default state, we get from the redux state, in tcrStatus.name === notInTcr
  // - appWasMade: after the app was made, we get this fromt eh redux state stcrStatus.name === 'appWasMade', AND NONE OF THE OTHER STATES APPLY
  // - inChallenge:  a challange was made (tcrStatus.challange != {}) and currentTime < commitEndDate
  // - inReveal:  a challange was made (tcrStatus.challange != {}) and currentTime > commitEndDate and currentTime < revealEndDate
  // - videoApproved: currentTime > revealEnddata and isWhitelisted
  // - videoRejected: currentTime > revealEnddata and !isWhitelisted
  const tcrState = 'videoApproved'
  // moreover, a second state regulates the vote, and is one
  // - voteCommited
  // -  voteRevealed
  const voteState = 'voteCommited'
  //
  //   // videoChallengeExists: videoChallengeExists(state),
  //   // voteStatus: getVoteStatus(state),

  return {
    tcrState,
    voteState
  }
}

const mapDispatchToProps = dispatch => ({
  fetchChallenge: bindActionCreators(fetchChallenge, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarTCR)
