import React, { Component } from 'react'
import styled from 'styled-components'

import Title from './foundations/Title'
import Wrapper from './foundations/Wrapper'
import Button from './foundations/buttons/Button'
import Input from './foundations/Input'

type Props = {
  onFileChosen: (file: Object) => void,
  onUploadRequested: (e: Object) => void
}

const UploadControls = styled.div`
  box-shadow: 0 1px 10px #bdbdbd;
  border-radius: 5px;
  margin: 10px;
  padding: 20px;
  width: 400px;
  height: 500px;
  background-color: white;
  color: #aaa;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
`

const ExternUpload = styled.div`
  height: 200px;
  width: 100%;
`

class UploadFile extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.state = {}
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
        <UploadControls>
          <h3>Drag&apos;n Drop</h3>
          <input type="file" onChange={this.onFileChosen} />
          <ExternUpload>
            <h5>Upload Files from Youtube or Vimeo</h5>
            <Input />
          </ExternUpload>
          <Button id="upload-submit" onClick={this.props.onUploadRequested}>
            Upload
          </Button>
        </UploadControls>
      </Wrapper>
    )
  }
}

export default UploadFile
