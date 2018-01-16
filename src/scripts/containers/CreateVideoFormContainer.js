import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import React, { Component } from 'react'

import VideoForm from 'components/VideoFormContainer'
import { updateUploadInfo } from 'actions/UserActions'

import type { RootState } from 'types/ApplicationTypes'

type Props = {
  updateUploadInfo: (title: string, description: string) => void
}

class CreateVideoFormContainer extends Component<Props, void> {
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
    e.preventDefault()
    this.props.updateUploadInfo(title, description)
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

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = dispatch => ({
  updateUploadInfo: bindActionCreators(updateUploadInfo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateVideoFormContainer)
