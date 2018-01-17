import React, { Component } from 'react'

import Title from './foundations/Title'
import Wrapper from './foundations/Wrapper'
import Button from './foundations/Button'

type Props = {
  onFileChosen: (file: Object) => void,
  onUploadRequested: () => void
}

class UploadFile extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.state = {}
    this.onFileChosen = this.onFileChosen.bind(this)
  }

  onFileChosen (e) {
    const file = e.target.files[0]
    this.props.onFileChosen(file)
    this.setState({file: e.target.files[0]})
  }

  render () {
    return (
      <Wrapper>
        <Title>Upload File</Title>
        <input type='file' onChange={this.onFileChosen} />
        <Button id='upload-submit' onClick={this.props.onUploadRequested}>Upload</Button>
      </Wrapper>
    )
  }
}

export default UploadFile
