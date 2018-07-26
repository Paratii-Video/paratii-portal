/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchVoteStatus } from 'actions/TCRActions'
import { getTcrState, getChallenge } from 'selectors/VideoSelectors'
import { getVoteStatus } from 'selectors/TCRSelectors'
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
  const challenge = getChallenge(state)
  // console.log(`tcrState: ${tcrState}`)
  // const tcrState = 'appWasMade'
  // moreover, a second state regulates the vote, and is one
  // - voteCommited
  // -  voteRevealed
  const voteState = getVoteStatus(state)

  return {
    challenge,
    tcrState,
    voteState
  }
}

const mapDispatchToProps = dispatch => ({
  fetchVoteStatus: bindActionCreators(fetchVoteStatus, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarTCR)
