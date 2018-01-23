import { getUploadProgress } from 'selectors/UploadSelectors'
import { connect } from 'react-redux'

import React, { Component } from 'react'

import type { RootState } from 'types/ApplicationTypes'

import UploadProgress from 'components/UploadProgress'

type Props = {
  progress: number;
  state: RootState;
}

class UploadProgressContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.cancelUpload = this.cancelUpload.bind(this)
  }

  cancelUpload () {
    console.log('Cancel upload..')
  }

  render () {
    return (
      <UploadProgress progress={this.props.progress} onCancelUpload={this.cancelUpload} state={this.props.state.upload}/>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  progress: getUploadProgress(state),
  state: state
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadProgressContainer)
