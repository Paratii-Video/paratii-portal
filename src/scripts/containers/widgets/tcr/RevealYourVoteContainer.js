import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RevealYourVote from 'components/widgets/tcr/RevealYourVote'
import type { RootState } from 'types/ApplicationTypes'
import { revealYourVote } from 'actions/TCRActions'
import { getTcrStatusRecord } from 'selectors/TCRSelectors'
import { getPlayerVideoId } from 'selectors/index'
import { show } from 'react-notification-system-redux'

const mapStateToProps = (state: RootState, props) => ({
  videoId: getPlayerVideoId(state),
  tcrStatusRecord: getTcrStatusRecord(state)
})

const mapDispatchToProps = dispatch => ({
  revealYourVote: bindActionCreators(revealYourVote, dispatch),
  notification: bindActionCreators(show, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RevealYourVote)
