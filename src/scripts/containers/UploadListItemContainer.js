import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import { getSelectedUploaderVideo } from 'selectors/UploaderSelectors'
import { selectUploaderVideo } from 'actions/UploaderActions'
import type { RootState } from 'types/ApplicationTypes'
import UploadListItem from 'components/UploadListItem'

const mapStateToProps = (state: RootState) => ({
  selectedVideo: getSelectedUploaderVideo(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedVideo: bindActionCreators(selectUploaderVideo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadListItem)
