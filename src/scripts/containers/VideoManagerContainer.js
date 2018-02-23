import { Map } from 'immutable'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CardContainer } from 'components/structures/Card'
import PTIGuide from 'components/widgets/PTIGuide'
import VideoRecord from 'records/VideoRecords'
import {
  getSelectedUploaderVideo,
  getUploaderVideos
} from 'selectors/UploaderSelectors'
import type { RootState } from 'types/ApplicationTypes'

import RedeemVoucher from 'components/widgets/RedeemVoucher'
import VideoList from 'containers/VideoListContainer'
import VideoForm from 'containers/VideoFormContainer'
import UploadFile from 'containers/UploadFileContainer'

type Props = {
  videos: Map<string, VideoRecord>,
  selectedVideo: ?VideoRecord,
  showModal: (View: Object) => void,
  closeModal: () => void
}

class VideoManagerContainer extends Component<Props, void> {
  render () {
    const showForm = this.props.selectedVideo
    const showList = this.props.videos.size > 0 || this.selectedVideo

    return (
      <CardContainer>
        {showList ? <VideoList /> : ''}
        {showForm ? (
          <VideoForm
            showModal={this.props.showModal}
            closeModal={this.props.closeModal}
          />
        ) : (
          <UploadFile />
        )}
        {!showList ? <RedeemVoucher margin="0 25px 0 0" /> : ''}
        {!showForm && <PTIGuide />}
      </CardContainer>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  videos: getUploaderVideos(state),
  selectedVideo: getSelectedUploaderVideo(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(
  VideoManagerContainer
)
