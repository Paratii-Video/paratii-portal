/* @flow */

import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import type { RouterHistory } from 'react-router-dom'

import styled, { css } from 'styled-components'
import { FILESUPLOADER_PATH_TO } from 'constants/UrlConstants'
import TextField from '../widgets/forms/TextField'
import Card from 'components/structures/Card'
import Text, { TextColor, Span } from '../foundations/Text'
import SVGIcon from '../foundations/SVGIcon'
import FilesUploaderSvg from '../foundations/svgs/FilesUploaderSvg'
import TranslatedText from '../translations/TranslatedText'
import RawTranslatedText from 'utils/translations/RawTranslatedText'
import { SUPPORTED_FILE_TYPES } from 'constants/UploaderConstants'

type Props = {
  history: RouterHistory,
  isWalletSecured: boolean,
  margin: string,
  onError: boolean,
  showCard: boolean,
  white: boolean,
  height: string,
  onFileChosen: (file: Object) => void,
  checkUserWallet: () => void
}

const StyleInput = css`
  height: 100%;
  width: 100%;
`

const InputFile = styled.input.attrs({
  type: 'file',
  accept: SUPPORTED_FILE_TYPES.join(' ')
})`
  ${StyleInput} cursor: pointer;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: 3;
`

const UploadCoverText = styled(Text)`
  text-align: center;
`

const TextBig = Text.withComponent('span')

const UploadCoverTextBig = styled(TextBig)`
  display: block;
  margin-bottom: 5px;
`

const FooterWrapper = styled.div`
  width: 100%;
`

const InputText = styled(TextField)`
  margin: 0 0 30px;
`

const UploaderWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: ${props => (props.card ? '100px 0' : null)};
  position: relative;
  width: 100%;
`
const Icon = styled.div`
  height: 110px;
  margin: 0 auto 30px;
  transform: ${({ className }) =>
    className === 'dragenter' ? 'scale(0.9)' : 'scale(1)'};
  transition: transform 0.5s ${props => props.theme.animation.ease.smooth};
  width: 190px;
  ${UploaderWrapper}:hover & {
    transform: scale(0.9);
  }
`
const UploadAddIcon = Icon.extend`
  ${TextColor} height: 36px;
  margin: 0 0 20px;
  width: 36px;
`

class FilesUploader extends Component<Props, Object> {
  onFileChosen: (e: Object) => void
  onDrag: (e: Object) => void

  constructor (props: Props) {
    super(props)

    this.state = {
      dragClass: '',
      fileName: 'No file chosen',
      inputTextError: false
    }

    this.onFileChosen = this.onFileChosen.bind(this)
    this.onDrag = this.onDrag.bind(this)
  }

  setSelectedFile (file: File) {
    this.props.onFileChosen(file)
    this.setState({
      file: file,
      fileName: file.name + ' | ' + file.size + 'bytes'
    })
  }

  onFileChosen = (e: Object) => {
    if (this.props.isWalletSecured) {
      const file = e.target.files[0]
      if (file) {
        this.props.onFileChosen(file)
        this.setState({
          file: file,
          fileName: file.name + ' | ' + file.size + 'bytes'
        })
        this.props.history.push(FILESUPLOADER_PATH_TO)
      }
    } else {
      this.props.checkUserWallet()
    }
  }

  onDrag (e: Object) {
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

  onFileInputClick = (e: Object) => {
    if (!this.props.isWalletSecured) {
      e.preventDefault()
      this.props.checkUserWallet()
    }
  }

  renderUploadTrigger ({ card }: { card: boolean } = {}) {
    return (
      <UploaderWrapper card={card}>
        <InputFile
          type="file"
          data-test-id="upload-file-input"
          onChange={this.onFileChosen}
          onClick={this.onFileInputClick}
          onDrop={this.onFileChosen}
          onDragEnter={this.onDrag}
          onDragLeave={this.onDrag}
        />
        {card ? (
          <Icon className={this.state.dragClass}>
            <FilesUploaderSvg />
          </Icon>
        ) : (
          <UploadAddIcon primary className={this.state.dragClass}>
            <SVGIcon icon="icon-add" />
          </UploadAddIcon>
        )}
        <UploadCoverText small primary>
          <TranslatedText
            message="uploader.filesInstructions_html"
            options={{
              dragFiles: (
                <UploadCoverTextBig big primary>
                  <TranslatedText message="uploader.dragFiles" />
                </UploadCoverTextBig>
              )
            }}
          />
          <Span tiny>
            <br />
            <TranslatedText message="uploader.supportedFileTypes" />
          </Span>
        </UploadCoverText>
      </UploaderWrapper>
    )
  }

  render () {
    const { showCard } = this.props
    return showCard ? (
      <Card
        {...this.props}
        nopadding
        className={this.state.dragClass}
        height={this.props.height}
        footer={
          <FooterWrapper>
            <InputText
              label={RawTranslatedText({
                message: 'uploader.youtubeOrVimeo'
              })}
              helper="i.e.: http://youtube.com/videoID or http://vimeo.com/videoID"
              error={this.state.inputTextError}
              disabled
            />
          </FooterWrapper>
        }
      >
        {this.renderUploadTrigger({ card: true })}
      </Card>
    ) : (
      <Fragment>{this.renderUploadTrigger()}</Fragment>
    )
  }
}

export default withRouter(FilesUploader)
