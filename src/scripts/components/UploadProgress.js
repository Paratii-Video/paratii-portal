import React, { Component } from 'react'

import type { UploadRecord } from 'records/UploadRecords'
import Wrapper from './foundations/Wrapper'
import Button from './foundations/Button'

type Props = {
  progress: number,
  onCancelUpload: () => boolean,
  state: UploadRecord
}

class UploadProgress extends Component<Props, void> {
  render () {
    let progress = this.props.progress
    return (
      <Wrapper>
        Blockchain status (= the object has been saved on the blockchain?): {this.props.state.blockchainStatus.name}
        <br />
        Upload status (= the object has been pinned?): {this.props.state.uploadStatus.name}
        <br />
        Transcoding status (= the object has been transcoded and is available for streaming?):
        {this.props.state.transcodingStatus.name}
        <br />

        <b>progress: {progress} [THIS SHOULD BECOME A NICE BAR]</b>
        <Button id='cancel-upload' type='submit' onClick={this.props.onCancelUpload}>Cancel upload  [NOT WORKING YET]</Button>
      </Wrapper>
    )
  }
}

export default UploadProgress
