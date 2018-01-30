import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import React, { Component } from 'react'

import VideoForm from 'components/VideoForm'
import { saveVideoInfo } from 'actions/UploadActions'
import VideoInfoRecord from 'records/VideoInfoRecords'
import { getVideo } from 'selectors/index'

import type { RootState } from 'types/ApplicationTypes'

type Props = {
  selectedVideo: VideoInfoRecord,
  canSubmit: boolean
}

class VideoFormContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps: Props) {
    const props = nextProps
    this.setState({
      title: props.selectedVideo.title,
      description: props.selectedVideo.description
    })
  }

  handleInputChange (input, e) {
    this.setState({
      [input]: e.target.value
    })
  }
  handleSubmit (e) {
    e.preventDefault()
    let videoToSave = {
      id: this.props.selectedVideo.id,
      title: this.state.title,
      description: this.state.description
    }
    saveVideoInfo(videoToSave)
  }

  render () {
    console.log('render videoformcontainer:')
    console.log(this.props)
    return (
      <VideoForm
        selectedVideo={this.props.selectedVideo}
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
      />
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  selectedVideo: getVideo(state)
})

const mapDispatchToProps = dispatch => ({
  updateVideoInfo: bindActionCreators(saveVideoInfo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoFormContainer)
// connect(mapStateToProps, mapDispatchToProps)(VideoFormContainer)
