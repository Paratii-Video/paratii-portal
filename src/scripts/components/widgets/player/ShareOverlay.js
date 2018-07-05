/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import TextButton from 'components/foundations/TextButton'
import SVGIcon from 'components/foundations/SVGIcon'
import Title from 'components/foundations/Title'
import RadioCheck, { RadioWrapper } from 'components/widgets/forms/RadioCheck'
import TranslatedText from 'components/translations/TranslatedText'
import {
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS
} from 'constants/ApplicationConstants'
import { copyTextToClipboard } from 'utils/AppUtils'
import RawTranslatedText from 'utils/translations/RawTranslatedText'

import type { Notification, NotificationLevel } from 'types/ApplicationTypes'

type Props = {
  show?: boolean,
  portalUrl?: string,
  videoId?: string,
  videoLabelUrl?: string,
  shareOptions?: Array<Object>,
  onToggle: (e: Object) => void,
  showNotification: (Notification, NotificationLevel) => void
}

type State = {
  showEmbed: boolean,
  embedOptions: Array<Object>
}

// z-index

const Z_INDEX_CONTENT: number = 1
const Z_INDEX_ARROWBUTTON: number = 2
const Z_INDEX_CLOSEBUTTON: number = 3

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.background.transparent};
  height: 100%;
  left: 0;
  opacity: ${props => (props.show ? 1 : 0)};
  overflow: hidden;
  position: absolute;
  pointer-events: ${props => (!props.show ? 'none' : null)};
  transition: opacity ${props => props.theme.animation.time.repaint};
  top: 0;
  width: 100%;
  z-index: 15;
`

const ArrowButton = styled(TextButton)`
  height: 20px;
  left: 30px;
  opacity: ${props => (props.show ? 1 : 0)};
  pointer-events: ${props => (props.show ? null : 'none')};
  position: absolute;
  transition: opacity ${props => props.theme.animation.time.repaint};
  top: 27px;
  width: 20px;
  z-index: ${Z_INDEX_ARROWBUTTON};
`

const ArrowButtonIcon = styled.div`
  height: 100%;
  transform: rotateY(180deg);
  width: 100%;
`

const CloseButton = TextButton.extend`
  height: 20px;
  position: absolute;
  right: 30px;
  top: 27px;
  width: 20px;
  z-index: ${Z_INDEX_CLOSEBUTTON};
`

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? null : 'none')};
  position: absolute;
  top: 0;
  transition: opacity ${props => props.theme.animation.time.repaint} linear
    ${({ show }) => (show ? '0.2s' : null)};
  width: 100%;
  z-index: ${Z_INDEX_CONTENT};
`

const ShareTitle = Title.extend`
  font-size: ${props => props.theme.fonts.video.share.title};
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    margin: 18px 0 24px;
  }

  @media (max-width: 400px) {
    font-size: ${props => props.theme.fonts.text.big};
    margin: 0;
  }
`

const ShareContent = styled.div`
  margin: 0 auto 3vw;
  max-width: 480px;
  padding: 0 20px;
  text-align: center;
  width: 100%;
`

const CopyEmbed = TextButton.extend`
  font-size: ${props => props.theme.fonts.text.small};
  font-weight: ${props => props.theme.fonts.weight.bold};
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 100%;

  @media (max-width: 767px) {
    font-size: ${props => props.theme.fonts.text.big};
    height: 43px;
    margin-bottom: 10px;
    overflow: hidden;
  }

  @media (max-width: 400px) {
    font-size: ${props => props.theme.fonts.text.small};
    height: auto;
    margin: 10px 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const ShareButtons = styled.div`
  display: flex;
  margin-top: 20px;

  @media (max-width: 767px) {
    margin-top: 50px;
  }

  @media (max-width: 400px) {
    margin-top: 2%;
  }
`

const ShareLink = TextButton.extend`
  height: 30px;
  margin: 0 5px;
  width: 30px;
`

const Anchor = ShareLink.withComponent('a')

const AnchorLink = Anchor.extend`
  font-size: ${props => props.theme.fonts.title.small};
  padding: 0 10%;
  text-align: center;
  width: 100%;
  word-wrap: break-word;

  @media (max-width: 767px) {
    margin: 0;
  }

  @media (max-width: 400px) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const ShareLinkIcon = styled.img`
  display: block;
  height: 100%;
  width: 100%;
`

class ShareOverlay extends Component<Props, State> {
  embedOptionsArray: Array<Object>
  toggleShareContent: (e: Object) => void
  getEmbedCode: () => void
  toggleOption: (e: Object) => void
  copyCodeToClipboard: (e: Object) => void
  getUrl: () => string

  constructor (props: Props) {
    super(props)

    this.embedOptionsArray = [
      {
        label: 'Autoplay',
        value: 'autoplay',
        name: 'embed-top',
        checked: 0
      },
      {
        label: 'Fullscreen',
        value: 'fullscreen',
        name: 'embed-top',
        checked: 0
      },
      {
        label: 'Loop',
        value: 'loop',
        name: 'embed-top',
        checked: 0
      },
      {
        label: 'Playsinline (iOS)',
        value: 'playsinline',
        name: 'embed-top',
        checked: 0
      }
    ]

    this.state = {
      showEmbed: false,
      embedOptions: this.embedOptionsArray
    }

    this.toggleShareContent = this.toggleShareContent.bind(this)
    this.getEmbedCode = this.getEmbedCode.bind(this)
    this.toggleOption = this.toggleOption.bind(this)
    this.copyCodeToClipboard = this.copyCodeToClipboard.bind(this)
    this.getUrl = this.getUrl.bind(this)
  }

  getUrl () {
    let linkHref = this.props.portalUrl || ''
    linkHref += '/play/'
    linkHref += this.props.videoId || ''
    return linkHref
  }

  getEmbedCode () {
    let code: string =
      '<iframe webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true" src="'
    code += this.props.portalUrl || ''
    code += '/embed/'
    code += this.props.videoId || ''

    let embedOptions: string = '?'
    this.state.embedOptions.map((opt: Object, index: number) => {
      embedOptions += opt.checked ? opt.value + '=' + opt.checked + '&' : ''
    })
    code += embedOptions
    code += 'type=mini" width="570" height="320" frameborder="0"></iframe>'
    return code
  }

  copyCodeToClipboard (event: Object) {
    copyTextToClipboard(event.currentTarget)
    this.props.showNotification(
      {
        title: 'Copied!',
        message: 'The embed code has been copied to the clipboard',
        position: NOTIFICATION_POSITIONS.TOP_RIGHT
      },
      NOTIFICATION_LEVELS.SUCCESS
    )
  }

  toggleOption (event: Object) {
    this.embedOptionsArray.find((element, index) => {
      if (element.value === event.currentTarget.value) {
        this.embedOptionsArray[index].checked = this.embedOptionsArray[index]
          .checked
          ? 0
          : 1
        this.setState({
          embedOptions: this.embedOptionsArray
        })
      }
    })
  }

  toggleShareContent () {
    this.setState({
      showEmbed: !this.state.showEmbed
    })
  }

  render () {
    return (
      <Wrapper data-test-id="share-overlay" show={this.props.show}>
        <ArrowButton
          warn
          show={this.state.showEmbed}
          onClick={this.toggleShareContent}
        >
          <ArrowButtonIcon>
            <SVGIcon icon="icon-arrow" />
          </ArrowButtonIcon>
        </ArrowButton>
        <CloseButton
          data-test-id="share-close-button"
          onClick={this.props.onToggle}
          warn
        >
          <SVGIcon icon="icon-close" />
        </CloseButton>
        <Content show={!this.state.showEmbed}>
          <ShareTitle small accent>
            <TranslatedText message="player.share.title" />
          </ShareTitle>
          <AnchorLink
            data-test-id="share-anchor-link"
            href={this.getUrl()}
            target="_blank"
            anchor
            warn
          >
            {this.props.videoLabelUrl}
          </AnchorLink>
          <ShareButtons>
            {this.props.shareOptions &&
              this.props.shareOptions.map((share: Object, index: number) => (
                <Anchor
                  data-test-id={`${share.label}-share-link`}
                  key={index}
                  href={share.href}
                  title={share.label}
                  target="_blank"
                  anchor
                >
                  <ShareLinkIcon
                    src={'/assets/svg/icons-share-' + share.icon + '.svg'}
                  />
                </Anchor>
              ))}
            <ShareLink
              warn
              onClick={this.toggleShareContent}
              title={RawTranslatedText({
                message: 'player.share.options.embed'
              })}
            >
              <ShareLinkIcon src="/assets/svg/icons-embed-link.svg" />
            </ShareLink>
          </ShareButtons>
        </Content>
        <Content show={this.state.showEmbed}>
          <ShareTitle small accent>
            <TranslatedText message="player.share.embedVideo" />
          </ShareTitle>
          <ShareContent>
            <CopyEmbed anchor warn onClick={this.copyCodeToClipboard}>
              {this.getEmbedCode()}
            </CopyEmbed>
          </ShareContent>
          <RadioWrapper justifyContent="center">
            {this.state.embedOptions.map((opt: Object, index: number) => (
              <RadioCheck
                checkbox
                white
                nomargin={index === this.state.embedOptions.length - 1}
                key={index}
                name={opt.name}
                value={opt.value}
                onChange={this.toggleOption}
              >
                {opt.label}
              </RadioCheck>
            ))}
          </RadioWrapper>
        </Content>
      </Wrapper>
    )
  }
}

export default ShareOverlay
