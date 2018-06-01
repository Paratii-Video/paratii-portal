import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getIsSecure } from 'selectors/UserSelectors'
import {
  getSelectedUploaderVideo,
  getUploaderVideos
} from 'selectors/UploaderSelectors'
import { selectVideoToPublish } from 'actions/UploaderActions'
import type { RootState } from 'types/ApplicationTypes'

import VideoManager from 'components/VideoManager'

const mapStateToProps = (state: RootState) => ({
  videos: getUploaderVideos(state),
  selectedVideo: getSelectedUploaderVideo(state),
  isWalletSecured: getIsSecure(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedVideo: bindActionCreators(selectVideoToPublish, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoManager)
