/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { show } from 'react-notification-system-redux'

import { closeModal } from 'actions/ModalActions'
import { getUser, getPlayerVideoId } from 'selectors/index'
import { getVideoVote } from 'selectors/TCRSelectors'
import ModalVote from 'components/widgets/modals/ModalVote'
import { loadBalances } from 'actions/UserActions'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  selectedVideoId: getPlayerVideoId(state),
  user: getUser(state),
  getVideoVote: getVideoVote(state)
})

const mapDispatchToProps = dispatch => ({
  closeModal: bindActionCreators(closeModal, dispatch),
  notification: bindActionCreators(show, dispatch),
  loadBalances: bindActionCreators(loadBalances, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalVote)
