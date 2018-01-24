/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import Button from './foundations/Button'
import Input from './foundations/Input'

type Props = {
  onSubmit: () => void,
  onInputChange: (name: string, e: Object) => void,
  onVideoInfoSubmitted: (e: Object) => void,
  canSubmit: boolean
};

const Form = styled.form`
  font-size: 20px;
  margin: 10px;
`

class VideoForm extends Component<Props, void> {
  render () {
    const { onSubmit, onInputChange } = this.props
    return (
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
        <Button id='video-submit' type='submit' onClick={this.props.onVideoInfoSubmitted} disabled={!this.props.canSubmit}>Submit</Button>

      </Form>
    )
  }
}
// next lines give a flow error..
// VideoForm.defaultProps = {
//   canSubmit: true
// }
//
export default VideoForm
