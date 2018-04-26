import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import VideoForm from 'components/VideoForm'
import { openModal } from 'actions/ModalActions'
import { checkUserWallet } from 'actions/UserActions'
import { saveVideoInfo, uploadAndTranscode } from 'actions/UploaderActions'
import { getUser } from 'selectors/index'
import { getFormattedPtiBalance, getIsSecure } from 'selectors/UserSelectors'
import {
  getSelectedUploaderVideo,
  isUploaded,
  isPublished,
  isPublishable
} from 'selectors/UploaderSelectors'
import type { RootState } from 'types/ApplicationTypes'
import { show } from 'react-notification-system-redux'

const mapStateToProps = (state: RootState) => ({
  isWalletSecured: getIsSecure(state),
  selectedVideo: getSelectedUploaderVideo(state),
  user: getUser(state),
  balance: getFormattedPtiBalance(state),
  isUploaded: isUploaded(state),
  isPublished: isPublished(state),
  isPublishable: isPublishable(state)
})

const mapDispatchToProps = dispatch => ({
  saveVideoInfo: bindActionCreators(saveVideoInfo, dispatch),
  openModal: bindActionCreators(openModal, dispatch),
  uploadAndTranscode: bindActionCreators(uploadAndTranscode, dispatch),
  notification: bindActionCreators(show, dispatch),
  checkUserWallet: bindActionCreators(checkUserWallet, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoForm)
