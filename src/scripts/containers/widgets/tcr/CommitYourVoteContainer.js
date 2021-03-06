import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CommitYourVote from 'components/widgets/tcr/CommitYourVote'
import type { RootState } from 'types/ApplicationTypes'
import { openModal } from 'actions/ModalActions'
import { checkUserWallet } from 'actions/UserActions'
import { voteVideo } from 'actions/TCRActions'
import { getUser } from 'selectors/index'
import { getFormattedPtiBalance, getIsSecure } from 'selectors/UserSelectors'
import { show } from 'react-notification-system-redux'

const mapStateToProps = (state: RootState, props) => ({
  isWalletSecured: getIsSecure(state),
  user: getUser(state),
  balance: getFormattedPtiBalance(state)
})

const mapDispatchToProps = dispatch => ({
  setVote: bindActionCreators(voteVideo, dispatch),
  openModal: bindActionCreators(openModal, dispatch),
  notification: bindActionCreators(show, dispatch),
  checkUserWallet: bindActionCreators(checkUserWallet, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CommitYourVote)
