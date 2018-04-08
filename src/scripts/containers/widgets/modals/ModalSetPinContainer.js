/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openModal, closeModal } from 'actions/ModalActions'
import { secureKeystore } from 'actions/UserActions'
import ModalSetPin from 'components/widgets/modals/ModalSetPin'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = dispatch => ({
  openModal: bindActionCreators(openModal, dispatch),
  closeModal: bindActionCreators(closeModal, dispatch),
  secureKeystore: bindActionCreators(secureKeystore, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalSetPin)
