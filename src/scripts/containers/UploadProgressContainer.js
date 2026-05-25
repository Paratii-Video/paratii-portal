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
    this.props.cancelUpload()
  }

  render () {
    return (
      <UploadProgress progress={this.props.progress} onCancelUpload={this.cancelUpload} state={this.props.state.upload}/>
    )
  }
}

import { bindActionCreators } from 'redux'
import { cancelUpload } from 'actions/UploaderActions'

const mapStateToProps = (state: RootState) => ({
  progress: getUploadProgress(state),
  state: state
})

const mapDispatchToProps = dispatch => ({
  cancelUpload: bindActionCreators(cancelUpload, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadProgressContainer)
