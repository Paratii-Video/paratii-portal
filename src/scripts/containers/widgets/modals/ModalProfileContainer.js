/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openModal, closeModal } from 'actions/ModalActions'
import { setUserData } from 'actions/UserActions'
import ModalProfile from 'components/widgets/modals/ModalProfile'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = dispatch => ({
  openModal: bindActionCreators(openModal, dispatch),
  closeModal: bindActionCreators(closeModal, dispatch),
  setUserData: bindActionCreators(setUserData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalProfile)
