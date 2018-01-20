import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import VideoStatus from 'components/VideoStatus'
import type { RootState } from 'types/ApplicationTypes'

type Props = {
  video: Object,
  videoFromPTI: Object
}

class UploadVideoStatusContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    console.log(props)
  }

  render () {
    console.log('Rendering UploadVideoStatusContainer', this.props.video)
    return (
      <VideoStatus video={this.props.video} />
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  state: state,
  video: state.upload.videoInfo
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoStatusContainer)
