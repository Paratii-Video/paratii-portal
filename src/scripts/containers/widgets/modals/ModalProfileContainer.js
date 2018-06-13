/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openModal, closeModal } from 'actions/ModalActions'
import { setUserData } from 'actions/UserActions'
import { getWalletKey } from 'selectors/index'
import { show } from 'react-notification-system-redux'
import ModalProfile from 'components/widgets/modals/ModalProfile'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  walletKey: getWalletKey(state)
})

const mapDispatchToProps = dispatch => ({
  openModal: bindActionCreators(openModal, dispatch),
  closeModal: bindActionCreators(closeModal, dispatch),
  setUserData: bindActionCreators(setUserData, dispatch),
  notification: bindActionCreators(show, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalProfile)
