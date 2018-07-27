import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RevealYourVote from 'components/widgets/tcr/RevealYourVote'
import type { RootState } from 'types/ApplicationTypes'
import { revealYourVote } from 'actions/TCRActions'
import { getTcrStatusRecord } from 'selectors/TCRSelectors'

const mapStateToProps = (state: RootState, props) => ({
  tcrStatusRecord: getTcrStatusRecord(state)
})

const mapDispatchToProps = dispatch => ({
  revealYourVote: bindActionCreators(revealYourVote, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RevealYourVote)
