import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import VideoStatus from 'components/VideoStatus'
import type { RootState } from 'types/ApplicationTypes'
import VideoRecord from 'records/VideoRecords'

type Props = {
  video: VideoRecord, // TODO: seems a bit too much
  state: VideoRecord
}

class UploadVideoStatusContainer extends Component<Props, void> {
  render () {
    return (
      <VideoStatus video={this.props.video} state={this.props.state.upload} />
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  state: state,
  video: state.upload.videoInfo
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(
  UploadVideoStatusContainer
)
