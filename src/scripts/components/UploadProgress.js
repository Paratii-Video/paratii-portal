import React, { Component } from 'react'

import type { VideoRecord } from 'records/VideoRecords'
import Wrapper from './foundations/Wrapper'
import TextButton from './foundations/TextButton'

type Props = {
  progress: number,
  onCancelUpload: () => boolean,
  state: VideoRecord
}

class UploadProgress extends Component<Props, void> {
  render () {
    const progress = this.props.progress
    return (
      <Wrapper>
        Blockchain status (= the object has been saved on the blockchain?):{' '}
        {this.props.state.storageStatus.name}
        <br />
        Upload status (= the object has been pinned?):{' '}
        {this.props.state.uploadStatus.name}
        <br />
        Transcoding status (= the object has been transcoded and is available
        for streaming?):
        {this.props.state.transcodingStatus.name}
        <br />
        <b>progress: {progress} [THIS SHOULD BECOME A NICE BAR]</b>
        <TextButton
          id="cancel-upload"
          type="submit"
          onClick={this.props.onCancelUpload}
        >
          Cancel upload [NOT WORKING YET]
        </TextButton>
      </Wrapper>
    )
  }
}

export default UploadProgress
