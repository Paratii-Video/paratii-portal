import { connect } from 'react-redux'

import UploadList from 'components/UploadList'
import { getUploaderVideos } from 'selectors/UploaderSelectors'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  videos: getUploaderVideos(state)
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UploadList)
