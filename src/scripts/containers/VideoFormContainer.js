import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import VideoForm from 'components/VideoForm'
import { saveVideoInfo } from 'actions/UploaderActions'
import { getSelectedUploaderVideo } from 'selectors/UploaderSelectors'
import { getUser } from 'selectors/index'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  selectedVideo: getSelectedUploaderVideo(state),
  user: getUser(state)
})

const mapDispatchToProps = dispatch => ({
  saveVideoInfo: bindActionCreators(saveVideoInfo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoForm)
