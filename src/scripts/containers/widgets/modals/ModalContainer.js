/* @flow */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getModalContent, getModalStatus } from 'selectors/index'
import { closeModal } from 'actions/ModalActions'
import Modal from 'components/widgets/modals/Modal'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  modalContent: getModalContent(state),
  showModal: getModalStatus(state)
})

const mapDispatchToProps = dispatch => ({
  closeModal: bindActionCreators(closeModal, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
