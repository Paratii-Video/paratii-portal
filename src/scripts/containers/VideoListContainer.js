import { connect } from 'react-redux'

import { setSelectedVideo } from 'actions/VideoActions'
import VideoList from 'components/VideoList'
import { bindActionCreators } from 'redux'
import { getVideos, getVideo } from 'selectors/index'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  videos: getVideos(state),
  selectedVideo: getVideo(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedVideo: bindActionCreators(setSelectedVideo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoList)
