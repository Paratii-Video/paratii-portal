import { connect } from 'react-redux'
import VideoList from 'components/VideoList'
import type { RootState } from 'types/ApplicationTypes'
import { getVideos } from 'selectors/index'
import { bindActionCreators } from 'redux'
import { setSelectedVideo } from 'actions/VideoActions'

const mapStateToProps = (state: RootState) => ({
  videos: getVideos(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedVideo: bindActionCreators(setSelectedVideo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoList)
