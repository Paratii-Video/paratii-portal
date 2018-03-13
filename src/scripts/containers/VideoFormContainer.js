import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import VideoForm from 'components/VideoForm'
import { saveVideoInfo, uploadAndTranscode } from 'actions/UploaderActions'
import { getSelectedUploaderVideo } from 'selectors/UploaderSelectors'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  selectedVideo: getSelectedUploaderVideo(state)
})

const mapDispatchToProps = dispatch => ({
  saveVideoInfo: bindActionCreators(saveVideoInfo, dispatch),
  uploadAndTranscode: bindActionCreators(uploadAndTranscode, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoForm)
