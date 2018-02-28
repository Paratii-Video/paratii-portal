/* @flow */

import { connect } from 'react-redux'
import { closeModal } from 'actions/ModalActions'
import { bindActionCreators } from 'redux'

import Modal from 'components/widgets/modals/Modal'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  showModal: state.modal.showModal
})

const mapDispatchToProps = dispatch => ({
  closeModal: bindActionCreators(closeModal, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
