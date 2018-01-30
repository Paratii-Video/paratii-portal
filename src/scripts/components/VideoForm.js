/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import VideoRecord from 'records/VideoRecords'

import Button from './foundations/buttons/Button'
import Input from './foundations/Input'

type Props = {
  selectedVideo: VideoRecord,
  canSubmit: boolean,
  onSubmit: () => void,
  onInputChange: (name: string, e: Object) => void
}

const Form = styled.form`
  font-size: 20px;
  width: 300px;
  margin: 10px;
`

class VideoForm extends Component<Props, void> {
  render () {
    // let title = this.state && this.state.title
    // let description = this.state && this.state.description
    return (
      <Form>
        Editing video with id: {this.props.selectedVideo.id}
        <Input
          id="video-title"
          type="text"
          onChange={e => this.props.onInputChange('title', e)}
          value={this.state && this.state.title}
          placeholder="Title"
        />
        <Input
          id="video-description"
          type="textarea"
          value={this.state && this.state.description}
          onChange={e => this.props.onInputChange('description', e)}
          placeholder="Description"
        />
        <Button id="video-submit" type="submit" onClick={this.props.onSubmit}>
          Submit
        </Button>
      </Form>
    )
  }
}

export default VideoForm
