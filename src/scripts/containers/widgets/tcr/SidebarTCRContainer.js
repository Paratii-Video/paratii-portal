/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchVoteStatus, tcrRerenderComponents } from 'actions/TCRActions'
import {
  getTcrState,
  getChallenge,
  getVoteStatusRecord
} from 'selectors/TCRSelectors'
import { getPlayerVideoId } from 'selectors/index'
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
  const challenge = getChallenge(state)
  const tcrState = getTcrState(state)
  // moreover, a second state regulates the vote, and is one
  // - voteCommited
  // -  voteRevealed
  const voteInfo = getVoteStatusRecord(state)
  const voteState = voteInfo && voteInfo.name
  const videoId = getPlayerVideoId(state)
  // console.log('aaargh')
  // console.log(voteState)
  // console.log(voteInfo)

  return {
    videoId,
    challenge,
    tcrState,
    voteState,
    voteInfo
  }
}

const mapDispatchToProps = dispatch => ({
  fetchVoteStatus: bindActionCreators(fetchVoteStatus, dispatch),
  tcrRerenderComponents: bindActionCreators(tcrRerenderComponents, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarTCR)
