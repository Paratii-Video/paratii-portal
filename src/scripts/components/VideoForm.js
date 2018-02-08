/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import VideoRecord from 'records/VideoRecords'

import Button from './foundations/buttons/Button'
import Input from './foundations/Input'
import Textarea from './foundations/Textarea'

type Props = {
  selectedVideo: VideoRecord,
  canSubmit: boolean,
  saveVideoInfo: Object => Object
}

const WrapperForm = styled.div`
  background: #555;
`

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
    // console.log(this.props.selectedVideo)
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
    const video = this.props.selectedVideo
    const progressUpdate = video.getIn(['uploadStatus', 'data', 'progress'])
    const thumbImages = video.getIn([
      'transcodingStatus',
      'data',
      'sizes',
      'screenshots'
    ])
    const ipfsHash = video.ipfsHash
    let thumbImage = ''
    if (thumbImages !== undefined) {
      thumbImage = thumbImages.get(1)
      console.log(thumbImage)
    }
    // console.log(this.props.selectedVideo.transcodingStatus)
    const state = JSON.stringify(this.state, null, 2)
    return (
      <WrapperForm>
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
            onChange={e => this.handleInputChange('title', e)}
            value={this.state.title}
            placeholder="Title"
          />
          <Textarea
            id="video-description"
            value={this.state.description}
            onChange={e => this.handleInputChange('description', e)}
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
        <h3>Details</h3>
        <strong>Porgress Update: </strong>
        {progressUpdate}
        <img
          src={`https://gateway.paratii.video/ipfs/${ipfsHash}/${thumbImage}`}
        />
        <h3>Video State</h3>
        <div>
          <pre>{state}</pre>
        </div>
      </WrapperForm>
    )
  }
}

export default VideoForm
