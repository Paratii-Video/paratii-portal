import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeModal } from 'actions/ModalActions'
import { getSelectedUploaderVideo } from 'selectors/UploaderSelectors'
import { saveVideoInfo, uploadAndTranscode } from 'actions/UploaderActions'
import { getUser } from 'selectors/index'
import type { RootState } from 'types/ApplicationTypes'
import ModalStake from 'components/widgets/modals/ModalStake'

const mapStateToProps = (state: RootState) => ({
  selectedVideo: getSelectedUploaderVideo(state),
  user: getUser(state)
})

const mapDispatchToProps = dispatch => ({
  saveVideoInfo: bindActionCreators(saveVideoInfo, dispatch),
  uploadAndTranscode: bindActionCreators(uploadAndTranscode, dispatch),
  closeModal: bindActionCreators(closeModal, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalStake)
