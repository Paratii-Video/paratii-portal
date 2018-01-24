import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import React, { Component } from 'react'

import VideoForm from 'components/VideoForm'
import { saveVideoInfo } from 'actions/UploadActions'
import { getIsUploading, getIpfsHash } from 'selectors/UploadSelectors'

import type { RootState } from 'types/ApplicationTypes'

type Props = {
  updateUploadInfo: (title: string, description: string) => void,
  isUploading: boolean,
  ipfsHash: string
}

class UploadVideoFormContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.state = {title: '', description: ''}
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
    const { ipfsHash, updateUploadInfo } = this.props
    e.preventDefault()
    updateUploadInfo({ title, description, ipfsHash })
  }

  render () {
    return (
      <VideoForm
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
        canSubmit={!this.props.isUploading}
      />
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  isUploading: getIsUploading(state),
  ipfsHash: getIpfsHash(state)
})

const mapDispatchToProps = dispatch => ({
  updateUploadInfo: bindActionCreators(saveVideoInfo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoFormContainer)
