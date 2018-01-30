import React, { Component } from 'react'
import styled, { css } from 'styled-components'

import Wrapper from './foundations/Wrapper'
import Button from './foundations/buttons/Button'
import Input from './foundations/Input'
import FilesUploaderSvg from './foundations/svgs/FilesUploaderSvg'

type Props = {
  onFileChosen: (file: Object) => void,
  onUploadRequested: (e: Object) => void
}

const ExternUpload = styled.div`
  height: 200px;
  width: 100%;
`

//

const FilesUploader = styled.div`
  position: relative;
  width: 490px;
`

const StyleInput = css`
  height: 560px;
  width: 100%;
`

const FilesUploaderInput = styled.input`
  ${StyleInput} cursor: pointer;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
`

const FilesUploaderInputFake = styled.div`
  ${StyleInput} align-items: center;
  background-color: ${props =>
    props.theme.colors.FilesUploader.fake.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`

const SVG = styled(FilesUploaderSvg)`
  height: 200px;
  width: 200px;
`

const ColorText = styled.p`
  color: ${props => props.theme.colors.FilesUploader.fake.color};
  font-size: ${props => props.theme.fonts.text.small};
`

const ColorTextBold = styled.span`
  display: block;
  font-size: ${props => props.theme.fonts.text.big};
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
        <FilesUploader>
          <FilesUploaderInput type="file" onChange={this.onFileChosen} />
          <FilesUploaderInputFake>
            <SVG />
            <ColorText>
              <ColorTextBold>Search files</ColorTextBold> or drag them here
            </ColorText>
          </FilesUploaderInputFake>

          <ExternUpload>
            <h5>Upload Files from Youtube or Vimeo</h5>
            <Input />
          </ExternUpload>
          <Button id="upload-submit" onClick={this.props.onUploadRequested}>
            Upload
          </Button>
        </FilesUploader>
      </Wrapper>
    )
  }
}

export default UploadFile
