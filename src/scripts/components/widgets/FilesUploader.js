/* @flow */
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import FilesUploaderSvg from '../foundations/svgs/FilesUploaderSvg'
import TextField from '../widgets/forms/TextField'
import Card, { CardTitle } from 'components/structures/Card'

type Props = {
  isWalletSecured: boolean,
  onError: boolean,
  showCard: boolean,
  margin: string,
  onFileChosen: (file: Object) => void,
  checkUserWallet: () => void
}
const StyleInput = css`
  height: 100%;
  width: 100%;
`

const Title = CardTitle.extend`
  padding: 40px 42px;
`

const InputFile = styled.input`
  ${StyleInput} cursor: pointer;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: 3;
`

const UploadCover = styled.div`
  ${StyleInput} background: 0;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
  position: relative;
  transition: background ${props => props.theme.animation.time.repaint} 0.2s;
  z-index: 1;

  .dragenter & {
    background-color: ${props => props.theme.colors.FilesUploader.drag.enter};
    transition-delay: 0.16s;
  }
`

const UploadCoverIcon = styled.div`
  margin: 30px 0 20px;
  width: 100%;
`

const Icon = styled.div`
  height: 110px;
  margin: 0 auto;
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

const FooterWrapper = styled.div`
  width: 100%;
`

const InputText = styled(TextField)`
  margin: 0 0 30px;
`

const UploaderWrapper = styled.div`
  width: 100%;
  position: relative;
`

class FilesUploader extends Component<Props, Object> {
  onFileChosen: (e: Object) => void
  onDrag: (e: Object) => void
  onCheck: (e: Object) => void

  constructor (props: Props) {
    super(props)

    this.state = {
      dragClass: '',
      fileName: 'No file chosen',
      inputTextError: false
    }

    this.onFileChosen = this.onFileChosen.bind(this)
    this.onDrag = this.onDrag.bind(this)
    this.onCheck = this.onCheck.bind(this)
  }

  onCheck (e: Object) {
    if (!this.props.isWalletSecured) {
      e.preventDefault()
      this.props.checkUserWallet()
    }
  }

  onFileChosen (e: Object) {
    // If wallet not secure open the modal
    if (this.props.isWalletSecured) {
      const file = e.target.files[0]
      this.props.onFileChosen(file)
      this.setState({
        file: file,
        fileName: file.name + ' | ' + file.size + 'bytes'
      })
    } else {
      this.props.checkUserWallet()
    }
  }

  onDrag (e: Object) {
    // If wallet not secure open the modal
    if (this.props.isWalletSecured) {
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
    } else {
      this.props.checkUserWallet()
    }
  }

  render () {
    const showcard = this.props.showCard
    return showcard ? (
      <Card
        {...this.props}
        nopadding
        className={this.state.dragClass}
        footer={
          <FooterWrapper>
            <InputText
              label="(Not working yet) Or upload from Youtube or Vimeo"
              helper="i.e.: http://youtube.com/videoID or http://vimeo.com/videoID"
              error={this.state.inputTextError}
              disabled
            />
          </FooterWrapper>
        }
      >
        <InputFile
          type="file"
          onClick={this.onCheck}
          onChange={this.onFileChosen}
          onDragEnd={this.onDrag}
        />
        <UploadCover>
          <Title>Upload video</Title>
          <UploadCoverIcon>
            <Icon>
              <FilesUploaderSvg />
            </Icon>
          </UploadCoverIcon>
          <UploadCoverText>
            <UploadCoverTextBig>Drag & drop to upload</UploadCoverTextBig> or
            choose a file
          </UploadCoverText>
        </UploadCover>
      </Card>
    ) : (
      <UploaderWrapper>
        <InputFile
          type="file"
          onClick={this.onCheck}
          onChange={this.onFileChosen}
          onDragEnd={this.onDrag}
        />
        <UploadCover>
          <UploadCoverIcon />
          <UploadCoverText>
            <UploadCoverTextBig>Drag & drop to upload</UploadCoverTextBig> or
            choose a file
          </UploadCoverText>
        </UploadCover>
      </UploaderWrapper>
    )
  }
}

export default FilesUploader
