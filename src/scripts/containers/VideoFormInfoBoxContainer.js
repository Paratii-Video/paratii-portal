import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import VideoFormInfoBox from 'components/VideoFormInfoBox'
import {
  saveVideoInfo,
  transcodeVideo,
  uploadAndTranscode
} from 'actions/UploaderActions'
import { getSelectedUploaderVideo } from 'selectors/UploaderSelectors'
import { getUser } from 'selectors/index'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  selectedVideo: getSelectedUploaderVideo(state),
  user: getUser(state)
})

const mapDispatchToProps = dispatch => ({
  saveVideoInfo: bindActionCreators(saveVideoInfo, dispatch),
  transcodeVideo: bindActionCreators(transcodeVideo, dispatch),
  uploadAndTranscode: bindActionCreators(uploadAndTranscode, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoFormInfoBox)
