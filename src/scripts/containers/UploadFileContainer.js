import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import React, { Component } from 'react'

import type { RootState } from 'types/ApplicationTypes'

import { upload } from 'actions/UploadActions'

import UploadFile from 'components/UploadFile'

type Props = {
  upload: (filename: string) => void
}

class UploadFileContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.state = {file: null}
    this.handleFileChosen = this.handleFileChosen.bind(this)
    this.handleUploadRequested = this.handleUploadRequested.bind(this)
  }

  handleFileChosen (file) {
    this.setState({
      file: file
    })
  }

<<<<<<< HEAD
  handleUploadRequested () {
    this.props.upload(this.state.file)
=======
  handleUploadRequested (e) {
    e.preventDefault()
    this.props.upload('file.mp4')
    // this.props.upload(this.state.file.name)
>>>>>>> a418520949bba2953d692ad32c41e13700f41f50
  }

  render () {
    return (
      <UploadFile
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
