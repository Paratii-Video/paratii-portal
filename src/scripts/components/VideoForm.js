/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import Button from './foundations/buttons/Button'
import Input from './foundations/Input'
import VideoRecord from 'records/VideoRecords'

type Props = {
  videoInfo: VideoRecord,
  onInputChange: (name: string, e: Object) => void,
  onSubmit: (e: Object) => void,
  canSubmit: boolean
}

const Form = styled.form`
  font-size: 20px;
  width: 300px;
  margin: 10px;
`

class VideoForm extends Component<Props, void> {
  render () {
    const { onInputChange } = this.props
    return (
      <Form>
        Editing video ... [insert video.id here]
        <Input
          id="video-title"
          type="text"
          onChange={e => onInputChange('title', e)}
          placeholder="Title"
        />
        <Input
          id="video-description"
          type="textarea"
          onChange={e => onInputChange('description', e)}
          placeholder="Description"
        />
        <Button
          id="video-submit"
          type="submit"
          onClick={this.props.onSubmit}
          // disabled={!this.props.canSubmit}
        >
          Submit
        </Button>
      </Form>
    )
  }
}

export default VideoForm
