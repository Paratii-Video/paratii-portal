import React, { Component } from 'react'
// import styled from 'styled-components'

import Title from './foundations/Title'
import Wrapper from './foundations/Wrapper'
// import Button from './foundations/buttons/Button'
// import Input from './foundations/Input'
import Dropzone from './Dropzone'

// import styled from 'styled-components'

type Props = {
  onFileChosen: (files: Array<Object>) => void
}

// const ExternUpload = styled.div`
//   height: 200px;
//   width: 100%;
// `

class UploadFile extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.onFileChosen = this.onFileChosen.bind(this)
  }

  onFileChosen (e) {
    const file = e.target.files[0]
    this.props.onFileChosen(file)
    this.setState({ file: e.target.files[0] })
  }

  render () {
    return (
      <Wrapper>
        <Title>Paratii Uploadertool</Title>
        <section>
          <Dropzone onDrop={this.onFileChosen} accept="all">
            <p>
              Try dropping some files here, or click to select files to upload.
            </p>
          </Dropzone>
        </section>
      </Wrapper>
    )
  }
}

export default UploadFile

// <ExternUpload>
//   <h5>Upload Files from Youtube or Vimeo</h5>
//   <Input />
// </ExternUpload>
// <Button id="upload-submit" onClick={this.props.onUploadRequested}>
//   Upload
// </Button>
