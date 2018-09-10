/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { show } from 'react-notification-system-redux'

import { closeModal } from 'actions/ModalActions'
import { getUser, getPlayerVideoId } from 'selectors/index'
import ModalChallenge from 'components/widgets/modals/ModalChallenge'
import { videoChallenged } from 'actions/TCRActions'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  selectedVideoId: getPlayerVideoId(state),
  user: getUser(state)
})

const mapDispatchToProps = dispatch => ({
  closeModal: bindActionCreators(closeModal, dispatch),
  notification: bindActionCreators(show, dispatch),
  videoChallenged: bindActionCreators(videoChallenged, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalChallenge)
