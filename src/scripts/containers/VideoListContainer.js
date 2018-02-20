import { connect } from 'react-redux'

import { selectUploaderVideo } from 'actions/UploaderActions'
import VideoList from 'components/VideoList'
import { bindActionCreators } from 'redux'
import { getVideos } from 'selectors/index'
import { getSelectedUploaderVideo } from 'selectors/UploaderSelectors'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  videos: getVideos(state),
  selectedVideo: getSelectedUploaderVideo(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedVideo: bindActionCreators(selectUploaderVideo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoList)
