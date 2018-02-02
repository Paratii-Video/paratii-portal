import React, { Component } from 'react'
import Title from './foundations/Title'
import Wrapper from './foundations/Wrapper'
import Dropzone from './Dropzone'

type Props = {
  onFileChosen: (files: Array<Object>) => void
}

class UploadFile extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.onFileChosen = this.onFileChosen.bind(this)
  }

  onFileChosen (files) {
    const file = files[0]
    this.props.onFileChosen(file)
    this.setState({ file: file })
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
