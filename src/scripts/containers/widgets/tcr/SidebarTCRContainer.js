/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isVideoWhiteListed, isVideoChallenged } from 'selectors/VideoSelectors'
import { getVideoStatus } from 'selectors/TCRSelectors'
import { fetchVoteStatus } from 'actions/TCRActions'
import SidebarTCR from 'components/widgets/tcr/SidebarTCR'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  whiteListed: isVideoWhiteListed(state),
  videoChallenged: isVideoChallenged(state),
  voteStatus: getVideoStatus(state)
})

const mapDispatchToProps = dispatch => ({
  fetchVoteStatus: bindActionCreators(fetchVoteStatus, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarTCR)
