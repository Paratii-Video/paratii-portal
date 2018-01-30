import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import FilesUploaderSvg from '../foundations/svgs/FilesUploaderSvg'
import Button from '../foundations/buttons/Button'
import TextField from '../foundations/forms/TextField'

type Props = {
  onFileChosen: (file: Object) => void,
  onUploadRequested: (e: Object) => void
}

const Wrapper = styled.div`
  position: relative;
  width: 490px;
`

const StyleInput = css`
  height: 490px;
  width: 100%;
`

const InputFile = styled.input`
  ${StyleInput} cursor: pointer;
  left: 0;
  opacity: 0.5;
  position: absolute;
  top: 0;
  z-index: 2;
`

const InputFileFake = styled.div`
  ${StyleInput} align-items: center;
  background-color: ${props =>
    props.theme.colors.FilesUploader.fake.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
`

const Icon = styled.div`
  height: 130px;
  margin: 0 0 20px 36px;
  width: 190px;
`

const ColorText = styled.p`
  color: ${props => props.theme.colors.FilesUploader.fake.color};
  font-size: ${props => props.theme.fonts.text.small};
  text-align: center;
`

const ColorTextBig = styled.span`
  display: block;
  font-size: ${props => props.theme.fonts.text.big};
  margin-bottom: 15px;
`
const InputWrapper = styled.div`
  background-color: ${props =>
    props.theme.colors.FilesUploader.input.background};
  padding: 40px 45px 50px;
  width: 100%;
`

class FilesUploader extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.state = {
      error: false
    }

    this.onFileChosen = this.onFileChosen.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.changeError = this.changeError.bind(this)
  }

  changeError () {
    let error = this.state.error

    this.setState({
      error: !error
    })
  }

  onFileChosen (e) {
    const file = e.target.files[0]
    this.props.onFileChosen(file)
    this.setState({ file: e.target.files[0] })
    console.log('onFileChosen', file)
  }

  onDragOver (e) {
    console.log('Drag type:', e.type)
  }

  render () {
    return (
      <Wrapper>
        <InputFile
          type="file"
          onChange={this.onFileChosen}
          onDrag={this.onDragOver}
          onDragEnter={this.onDragOver}
          onDragExit={this.onDragOver}
          onDragLeave={this.onDragOver}
          onDragOver={this.onDragOver}
          onDragStart={this.onDragOver}
          onDrop={this.onDragOver}
        />

        <InputFileFake>
          <Icon>
            <FilesUploaderSvg />
          </Icon>
          <ColorText>
            <ColorTextBig>Drag your files</ColorTextBig> or search them
          </ColorText>
        </InputFileFake>

        <InputWrapper>
          <TextField
            label="Upload from Youtube or Vimeo"
            helper="(http://youtube.com/videoID or http://vimeo.com/videoID)"
            error={this.state.error}
          />
        </InputWrapper>
        <Button id="upload-submit" onClick={this.changeError}>
          Upload
        </Button>
      </Wrapper>
    )
  }
}

export default FilesUploader
