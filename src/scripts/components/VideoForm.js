/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import VideoRecord from 'records/VideoRecords'

import Button from './foundations/buttons/Button'
import Input from './foundations/Input'

type Props = {
  selectedVideo: VideoRecord,
  canSubmit: boolean,
  saveVideoInfo: Object => Object
}

const Form = styled.form`
  font-size: 20px;
  width: 300px;
  margin: 10px;
`

class VideoForm extends Component<Props, Object> {
  handleSubmit: (e: Object) => void
  handleInputChange: (input: string, e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = new VideoRecord(this.props.selectedVideo)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps: Props): void {
    this.setState(nextProps.selectedVideo)
    this.setState({
      id: nextProps.selectedVideo.id,
      title: nextProps.selectedVideo.title,
      description: nextProps.selectedVideo.description
    })
  }

  handleInputChange (input: string, e: Object) {
    this.setState({
      [input]: e.target.value
    })
  }

  handleSubmit (e: Object) {
    e.preventDefault()
    const videoToSave = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description
    }
    this.props.saveVideoInfo(videoToSave)
  }

  render () {
    const onInputChange = this.handleInputChange
    return (
      <Form>
        <h5>Editing video {this.state.id}</h5>
        <Input
          id="video-id"
          type="hidden"
          value={this.state.id}
          placeholder="Title"
        />
        <Input
          id="video-title"
          type="text"
          onChange={e => onInputChange('title', e)}
          value={this.state.title}
          placeholder="Title"
        />
        <Input
          id="video-description"
          type="textarea"
          value={this.state.description}
          onChange={e => onInputChange('description', e)}
          placeholder="Description"
        />
        <Button
          id="video-submit"
          type="submit"
          onClick={this.handleSubmit}
          // disabled={!this.props.canSubmit}
        >
          Submit
        </Button>
      </Form>
    )
  }
}

export default VideoForm
