import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import FilesUploaderSvg from '../foundations/svgs/FilesUploaderSvg'
import Button from '../foundations/buttons/Button'
import TextField from '../foundations/forms/TextField'

type Props = {
  onFileChosen: (file: Object) => void,
  onUploadRequested: (e: Object) => void,
  onError: Boolean
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
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: 2;
`

const UploadCover = styled.div`
  ${StyleInput} align-items: center;
  background-color: ${props =>
    props.theme.colors.FilesUploader.drag.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  transition: background ${props => props.theme.animation.time.repaint};
  z-index: 1;

  .dragenter & {
    background-color: ${props => props.theme.colors.FilesUploader.drag.enter};
  }
`

const UploadCoverIcon = styled.div`
  height: 130px;
  margin: 0 0 20px 36px;
  transition: transform 0.5s ${props => props.theme.animation.ease.smooth};
  width: 190px;

  .dragenter & {
    transform: scale(0.95);
  }
`

const UploadCoverText = styled.p`
  color: ${props => props.theme.colors.FilesUploader.drag.color};
  font-size: ${props => props.theme.fonts.text.small};
  text-align: center;
`

const UploadCoverTextBig = styled.span`
  display: block;
  font-size: ${props => props.theme.fonts.text.big};
  margin-bottom: 15px;
`

const UploadCoverInfo = styled.p`
  color: ${props => props.theme.colors.FilesUploader.drag.color2};
  font-size: ${props => props.theme.fonts.text.small};
  margin: 20px 0 0;
  text-align: center;
`

const InputWrapper = styled.div`
  align-items: flex-end;
  background-color: ${props =>
    props.theme.colors.FilesUploader.input.background};
  display: flex;
  flex-direction: column;
  padding: 53px 47px 50px;
  width: 100%;
`

const InputText = styled(TextField)`
  margin: 0 0 30px;
`

class FilesUploader extends Component<Props, void> {
  constructor (props) {
    super(props)

    this.state = {
      dragClass: '',
      fileName: 'No file chosen',
      inputTextError: false
    }

    this.onFileChosen = this.onFileChosen.bind(this)
    this.onDrag = this.onDrag.bind(this)
  }

  onFileChosen (e) {
    const file = e.target.files[0]
    this.props.onFileChosen(file)
    this.setState({
      file: file,
      fileName: file.name + ' | ' + file.size + 'bytes'
    })
  }

  onDrag (e) {
    const status = e.type
    let klass = ''

    if (status === 'dragenter' || status === 'mouseover') {
      klass = 'dragenter'
    } else if (status === 'drop') {
      klass = 'drop'
    } else {
      klass = ''
    }

    this.setState({
      dragClass: klass
    })
  }

  render () {
    return (
      <Wrapper className={this.state.dragClass}>
        <InputFile
          type="file"
          onChange={this.onFileChosen}
          onDrag={this.onDrag}
          onDragEnter={this.onDrag}
          onDragExit={this.onDrag}
          onDragLeave={this.onDrag}
          onDrop={this.onDrag}
          onMouseOver={this.onDrag}
          onMouseOut={this.onDrag}
        />

        <UploadCover>
          <UploadCoverIcon>
            <FilesUploaderSvg />
          </UploadCoverIcon>
          <UploadCoverText>
            <UploadCoverTextBig>Drag & drop to upload</UploadCoverTextBig> or
            choose a file
          </UploadCoverText>
          <UploadCoverInfo>{this.state.fileName}</UploadCoverInfo>
        </UploadCover>
        <InputWrapper>
          <InputText
            label="(Not working yet) Or upload from Youtube or Vimeo"
            helper="i.e.: http://youtube.com/videoID or http://vimeo.com/videoID"
            error={this.state.inputTextError}
          />
          <Button
            id="upload-submit"
            onClick={this.props.onUploadRequested}
            purple
          >
            Upload
          </Button>
        </InputWrapper>
      </Wrapper>
    )
  }
}

export default FilesUploader
