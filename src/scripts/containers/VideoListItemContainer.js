import { connect } from 'react-redux'

import { setSelectedVideo } from 'actions/VideoActions'
import { bindActionCreators } from 'redux'
import { getVideos, getVideo } from 'selectors/index'
import type { RootState } from 'types/ApplicationTypes'
import VideoListItem from 'components/VideoListItem'

const mapStateToProps = (state: RootState) => ({
  videos: getVideos(state),
  selectedVideo: getVideo(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedVideo: bindActionCreators(setSelectedVideo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoListItem)
