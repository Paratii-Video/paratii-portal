import { connect } from 'react-redux'
import { getIsSecure } from 'selectors/UserSelectors'
import {
  getSelectedUploaderVideo,
  getUploaderVideos
} from 'selectors/UploaderSelectors'
import { selectVideoToPublish } from 'actions/UploaderActions'
import { fetchOwnedVideos } from 'actions/VideoActions'
import type { RootState } from 'types/ApplicationTypes'

import VideoManager from 'components/VideoManager'

const mapStateToProps = (state: RootState) => ({
  videos: getUploaderVideos(state),
  selectedVideo: getSelectedUploaderVideo(state),
  isWalletSecured: getIsSecure(state)
})

const mapDispatchToProps = {
  fetchVideos: fetchOwnedVideos,
  setSelectedVideo: selectVideoToPublish
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoManager)
