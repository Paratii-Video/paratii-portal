/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  isVideoWhiteListed,
  videoChallengeExists
} from 'selectors/VideoSelectors'
import { getVoteStatus } from 'selectors/TCRSelectors'
import { fetchChallenge } from 'actions/TCRActions'
import SidebarTCR from 'components/widgets/tcr/SidebarTCR'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  whiteListed: isVideoWhiteListed(state),
  videoChallengeExists: videoChallengeExists(state),
  voteStatus: getVoteStatus(state)
})

const mapDispatchToProps = dispatch => ({
  fetchChallenge: bindActionCreators(fetchChallenge, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarTCR)
