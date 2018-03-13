import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { uploadAndTranscode } from 'actions/UploaderActions'
import type { RootState } from 'types/ApplicationTypes'
import FilesUploader from '../components/widgets/FilesUploader'

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = dispatch => ({
  onFileChosen: bindActionCreators(uploadAndTranscode, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(FilesUploader)
