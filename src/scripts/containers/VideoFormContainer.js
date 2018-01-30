import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import React, { Component } from 'react'

import VideoForm from 'components/VideoForm'
import { saveVideoInfo } from 'actions/UploadActions'
import VideoInfoRecord from 'records/VideoInfoRecords'

import type { RootState } from 'types/ApplicationTypes'

type Props = {
  updateVideoInfo: (id: string, title: string, description: string) => void,
  videoInfo: VideoInfoRecord
}

class VideoFormContainer extends Component<Props, void> {
  constructor (props) {
    console.log('constructor')
    super(props)
    const { videoInfo } = this.props
    const title = videoInfo.get('title')
    const description = videoInfo.get('description')
    this.state = { title: title, description: description }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { videoInfo } = nextProps
    const title = videoInfo.get('title')
    const description = videoInfo.get('description')
    this.setState({ title: title, description: description })
  }

  handleInputChange (input, e) {
    this.setState({
      [input]: e.target.value
    })
  }

  handleSubmit (e) {
    const { title, description } = this.state
    const { updateVideoInfo } = this.props
    e.preventDefault()
    updateVideoInfo({
      id: this.props.videoInfo.id,
      title: title,
      description: description
    })
  }

  render () {
    return (
      <VideoForm
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
        title={this.state.title}
        description={this.state.description}
      />
    )
  }
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = dispatch => ({
  updateVideoInfo: bindActionCreators(saveVideoInfo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoFormContainer)
