import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeModal } from 'actions/ModalActions'
import { getSelectedUploaderVideo } from 'selectors/UploaderSelectors'
import { getUser } from 'selectors/index'
import type { RootState } from 'types/ApplicationTypes'
import ModalStake from 'components/widgets/modals/ModalStake'

const mapStateToProps = (state: RootState) => ({
  videoId: getSelectedUploaderVideo(state),
  user: getUser(state)
})

const mapDispatchToProps = dispatch => ({
  onSuccess: bindActionCreators(closeModal, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalStake)
