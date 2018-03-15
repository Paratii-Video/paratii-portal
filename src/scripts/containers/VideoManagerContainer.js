import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getSelectedUploaderVideo,
  getUploaderVideos
} from 'selectors/UploaderSelectors'
import { selectUploaderVideo } from 'actions/UploaderActions'
import type { RootState } from 'types/ApplicationTypes'

import VideoManager from 'components/VideoManager'

const mapStateToProps = (state: RootState) => ({
  videos: getUploaderVideos(state),
  selectedVideo: getSelectedUploaderVideo(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedVideo: bindActionCreators(selectUploaderVideo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoManager)
