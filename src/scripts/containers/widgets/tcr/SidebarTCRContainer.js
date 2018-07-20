/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchChallenge } from 'actions/TCRActions'
import { getTcrState } from 'selectors/VideoSelectors'
import SidebarTCR from 'components/widgets/tcr/SidebarTCR'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => {
  // the video can be in one of the following states:
  // - notInTcr: the default state when the video is not published yet
  // - appWasMade: after the app was made. The video is pbulished and has not yet been chellenged
  // - inChallenge: the video is being challenged - this is when votes are committed
  // - inReveal: the votes are cast, and now need to be revealed
  // - videoApproved: currentTime > revealEnddata and isWhitelisted
  // - videoRejected: currentTime > revealEnddata and !isWhitelisted
  const tcrState = getTcrState(state)
  // console.log(`tcrState: ${tcrState}`)
  // const tcrState = 'appWasMade'
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
