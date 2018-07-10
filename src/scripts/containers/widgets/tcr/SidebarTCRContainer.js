/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isVideoWhiteListed, isVideoChallenged } from 'selectors/VideoSelectors'
import { getVideoStatus } from 'selectors/TCRSelectors'
import { fetchChallenge } from 'actions/TCRActions'
import SidebarTCR from 'components/widgets/tcr/SidebarTCR'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  whiteListed: isVideoWhiteListed(state),
  videoChallenged: isVideoChallenged(state),
  voteStatus: getVideoStatus(state)
})

const mapDispatchToProps = dispatch => ({
  fetchChallenge: bindActionCreators(fetchChallenge, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarTCR)
