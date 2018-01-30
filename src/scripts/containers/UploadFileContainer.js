import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import React, { Component } from 'react'

import type { RootState } from 'types/ApplicationTypes'

import { upload } from 'actions/UploadActions'

import FilesUploader from '../components/widgets/FilesUploader'

type Props = {
  upload: (filename: string) => void
}

class UploadFileContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.state = { file: null }
    this.handleFileChosen = this.handleFileChosen.bind(this)
    this.handleUploadRequested = this.handleUploadRequested.bind(this)
  }

  handleFileChosen (file) {
    this.setState({
      file: file
    })
  }

  handleUploadRequested () {
    this.props.upload(this.state.file)
  }

  render () {
    return (
      <FilesUploader
        onFileChosen={this.handleFileChosen}
        onUploadRequested={this.handleUploadRequested}
      />
    )
  }
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = dispatch => ({
  upload: bindActionCreators(upload, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadFileContainer)
