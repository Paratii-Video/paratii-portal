import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import VideoForm from 'components/VideoForm'
import type { RootState } from 'types/ApplicationTypes'
import { openModal } from 'actions/ModalActions'
import { checkUserWallet } from 'actions/UserActions'
import {
  saveVideoInfo,
  uploadAndTranscode,
  selectVideoToPublish
} from 'actions/UploaderActions'
import { getUser } from 'selectors/index'
import { getFormattedPtiBalance, getIsSecure } from 'selectors/UserSelectors'
import { show } from 'react-notification-system-redux'

const mapStateToProps = (state: RootState, props) => ({
  isWalletSecured: getIsSecure(state),
  user: getUser(state),
  balance: getFormattedPtiBalance(state)
})

const mapDispatchToProps = dispatch => ({
  saveVideoInfo: bindActionCreators(saveVideoInfo, dispatch),
  openModal: bindActionCreators(openModal, dispatch),
  uploadAndTranscode: bindActionCreators(uploadAndTranscode, dispatch),
  notification: bindActionCreators(show, dispatch),
  checkUserWallet: bindActionCreators(checkUserWallet, dispatch),
  setVideoToPublish: bindActionCreators(selectVideoToPublish, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoForm)
