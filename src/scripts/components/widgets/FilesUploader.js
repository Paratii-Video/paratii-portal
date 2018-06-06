/* @flow */

import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import type { RouterHistory } from 'react-router-dom'

import styled, { css } from 'styled-components'
import { FILESUPLOADER_PATH_TO } from 'constants/UrlConstants'
import TextField from '../widgets/forms/TextField'
import Card from 'components/structures/Card'
import Text from '../foundations/Text'
import SVGIcon from '../foundations/SVGIcon'
import FilesUploaderSvg from '../foundations/svgs/FilesUploaderSvg'
import { SUPPORTED_FILE_TYPES } from 'constants/UploaderConstants'

type Props = {
  history: RouterHistory,
  isWalletSecured: boolean,
  margin: string,
  onError: boolean,
  showCard: boolean,
  white: Boolean,
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

const SupportedFileTypes = styled.span`
  color: ${({ theme }) => theme.colors.FilesUploader.supportedFileTypes.color};
  font-size: ${props => props.theme.fonts.text.tiny};
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
  width: 100%;
  position: relative;
`

const UploaderSimpleWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 70px 0;
  position: relative;
`
const Icon = styled.div`
  height: 110px;
  margin: 50px auto 30px;
  transform: ${({ className }) =>
    className === 'dragenter' ? 'scale(0.9)' : 'scale(1)'};
  transition: transform 0.5s ${props => props.theme.animation.ease.smooth};
  width: 190px;
  ${UploaderSimpleWrapper}:hover & {
    transform: scale(0.9);
  }
`
const UploadAddIcon = Icon.extend`
  height: 36px;
  margin: 0 0 20px;
  width: 36px;
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

      this.props.history.push(FILESUPLOADER_PATH_TO)
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

  renderUploadTrigger ({ card }: { card: boolean } = {}) {
    return (
      <Fragment>
        <UploaderSimpleWrapper>
          <InputFile
            type="file"
            data-test-id="upload-file-input"
            onClick={this.onCheck}
            onChange={this.onFileChosen}
            onDragEnter={this.onDrag}
            onDragLeave={this.onDrag}
          />
          {card ? (
            <Icon className={this.state.dragClass}>
              <FilesUploaderSvg />
            </Icon>
          ) : (
            <UploadAddIcon className={this.state.dragClass}>
              <SVGIcon
                color={this.props.white ? 'white' : 'gray'}
                icon="icon-add"
              />
            </UploadAddIcon>
          )}
          <UploadCoverText gray={!this.props.white} small>
            <UploadCoverTextBig big gray={!this.props.white}>
              Drag your files here
            </UploadCoverTextBig>{' '}
            or click to find them
            <SupportedFileTypes>
              <br />
              (only .mp4 currently supported)
            </SupportedFileTypes>
          </UploadCoverText>
        </UploaderSimpleWrapper>
      </Fragment>
    )
  }

  render () {
    const { showCard } = this.props
    return showCard ? (
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
        {this.renderUploadTrigger({ card: true })}
      </Card>
    ) : (
      <div>
        <UploaderWrapper className={this.state.dragClass} />
        <UploaderWrapper>{this.renderUploadTrigger()}</UploaderWrapper>
      </div>
    )
  }
}

export default withRouter(FilesUploader)
