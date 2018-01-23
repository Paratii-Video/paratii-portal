import React, { Component } from 'react'

import Wrapper from './foundations/Wrapper'
import Button from './foundations/Button'

type Props = {
  progress: number,
  onCancelUpload: () => boolean
}

class UploadProgress extends Component<Props, void> {
  render () {
    let progress = this.props.progress
    return (
      <Wrapper>
        <b>progress: {progress} [THIS SHOULD BECOME A NICE BAR]</b>
        <Button id='cancel-upload' type='submit' onClick={this.props.onCancelUpload}>Cancel upload  [NOT WORKING YET]</Button>
      </Wrapper>
    )
  }
}

export default UploadProgress
