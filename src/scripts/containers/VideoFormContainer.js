import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import React, { Component } from 'react'

import VideoForm from 'components/VideoForm'
import { saveVideoInfo } from 'actions/UploadActions'
import UploadRecord from 'records/UploadRecords'

import type { RootState } from 'types/ApplicationTypes'

type Props = {
  updateUploadInfo: (id: string, title: string, description: string) => void,
  id: string,
  uploadInfo: UploadRecord
}

class UploadVideoFormContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    const {title, description} = this.props.uploadInfo
    this.state = {title: title, description: description}
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (input, e) {
    this.setState({
      [input]: e.target.value
    })
  }

  handleSubmit (e) {
    const { title, description } = this.state
    const { id, updateUploadInfo } = this.props
    e.preventDefault()
    updateUploadInfo(id, title, description)
  }

  render () {
    return (
      <VideoForm
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
      />
    )
  }
}

const mapStateToProps = (state: RootState) => ({
})

const mapDispatchToProps = dispatch => ({
  updateUploadInfo: bindActionCreators(saveVideoInfo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoFormContainer)
