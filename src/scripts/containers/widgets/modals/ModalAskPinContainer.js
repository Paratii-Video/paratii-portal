/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openModal, closeModal } from 'actions/ModalActions'
import { setWalletAddress, loadBalances } from 'actions/UserActions'
import { show } from 'react-notification-system-redux'
import ModalAskPin from 'components/widgets/modals/ModalAskPin'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = dispatch => ({
  openModal: bindActionCreators(openModal, dispatch),
  closeModal: bindActionCreators(closeModal, dispatch),
  notification: bindActionCreators(show, dispatch),
  setWalletAddress: bindActionCreators(setWalletAddress, dispatch),
  loadBalances: bindActionCreators(loadBalances, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalAskPin)
