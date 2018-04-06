/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { show } from 'react-notification-system-redux'

import { closeModal } from 'actions/ModalActions'
import { getSelectedUploaderVideo } from 'selectors/UploaderSelectors'
import { saveVideoStaked, uploadAndTranscode } from 'actions/UploaderActions'
import { getUser } from 'selectors/index'
import ModalStake from 'components/widgets/modals/ModalStake'
import { loadBalances } from 'actions/UserActions'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  selectedVideo: getSelectedUploaderVideo(state),
  user: getUser(state)
})

const mapDispatchToProps = dispatch => ({
  saveVideoStaked: bindActionCreators(saveVideoStaked, dispatch),
  uploadAndTranscode: bindActionCreators(uploadAndTranscode, dispatch),
  closeModal: bindActionCreators(closeModal, dispatch),
  notification: bindActionCreators(show, dispatch),
  loadBalances: bindActionCreators(loadBalances, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalStake)
