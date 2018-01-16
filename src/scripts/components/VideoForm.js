/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import Button from './foundations/Button'
import Input from './foundations/Input'

type Props = {
  onSubmit: () => void,
  onInputChange: (name: string, e: Object) => void
};

const Form = styled.form`
  font-size: 20px;
  margin: 10px;
`

class VideoForm extends Component<Props, void> {
  render () {
    const { onSubmit, onInputChange } = this.props
    return (
      // <UploadProgressBarContainer />
      <Form onSubmit={onSubmit}>
        <Input
          id='video-title'
          type='text'
          onChange={(e) => onInputChange('title', e)}
          placeholder='Title'
        />
        <Input
          id='video-description'
          type='textarea'
          onChange={(e) => onInputChange('description', e)}
          placeholder='Description'
        />
        <Button id='video-submit' type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default VideoForm
