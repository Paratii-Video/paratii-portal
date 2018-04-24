/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openModal, closeModal } from 'actions/ModalActions'
import { setAddressAndBalance, setWalletData } from 'actions/UserActions'
import { fetchOwnedVideos } from 'actions/VideoActions'
import { show } from 'react-notification-system-redux'
import ModalAskPin from 'components/widgets/modals/ModalAskPin'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = dispatch => ({
  openModal: bindActionCreators(openModal, dispatch),
  closeModal: bindActionCreators(closeModal, dispatch),
  notification: bindActionCreators(show, dispatch),
  setWalletData: bindActionCreators(setWalletData, dispatch),
  setAddressAndBalance: bindActionCreators(setAddressAndBalance, dispatch),
  fetchOwnedVideos: bindActionCreators(fetchOwnedVideos, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalAskPin)
