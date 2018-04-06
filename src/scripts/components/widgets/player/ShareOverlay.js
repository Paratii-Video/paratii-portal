/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import Button from 'components/foundations/Button'
import Title from 'components/foundations/Title'
import RadioCheck, { RadioWrapper } from 'components/widgets/forms/RadioCheck'
import {
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS
} from 'constants/ApplicationConstants'
import { copyTextToClipboard } from 'utils/AppUtils'
import type { Notification, NotificationLevel } from 'types/ApplicationTypes'

type Props = {
  show?: boolean,
  portalUrl?: string,
  videoId?: string,
  videoLabelUrl?: string,
  shareOptions?: Array,
  onToggle: (e: Object) => void,
  showNotification: (Notification, NotificationLevel) => void
}

// z-index

const Z_INDEX_CONTENT: number = 1
const Z_INDEX_ARROWBUTTON: number = 2
const Z_INDEX_CLOSEBUTTON: number = 3

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.VideoPlayer.share.background};
  height: 100%;
  left: 0;
  opacity: ${props => (props.show ? 1 : 0)};
  position: absolute;
  pointer-events: ${props => (!props.show ? 'none' : null)};
  transition: opacity ${props => props.theme.animation.time.repaint};
  top: 0;
  width: 100%;
  z-index: 15;
`

const ArrowButton = styled(Button)`
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

const ArrowButtonIcon = styled.svg`
  height: 100%;
  transform: rotateY(180deg);
  width: 100%;
`

const CloseButton = Button.extend`
  height: 20px;
  position: absolute;
  right: 30px;
  top: 27px;
  width: 20px;
  z-index: ${Z_INDEX_CLOSEBUTTON};
`

const CloseButtonIcon = styled.svg`
  fill: ${props => props.theme.colors.VideoPlayer.header.icons};
  display: block;
  height: 100%;
  width: 100%;
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
`

const ShareContent = styled.div`
  margin: 0 auto 7vw;
  max-width: 480px;
  padding: 0 20px;
  text-align: center;
`

const CopyEmbed = Button.extend`
  font-size: ${props => props.theme.fonts.text.small};
  font-weight: ${props => props.theme.fonts.weight.bold};
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 100%;
`

const ShareButtons = styled.div`
  display: flex;
  margin-top: 20px;
`

const ShareLink = Button.extend`
  height: 30px;
  margin: 0 5px;
  width: 30px;
`

const Anchor = ShareLink.withComponent('a')

const AnchorLink = Anchor.extend`
  font-size: ${props => props.theme.fonts.video.share.link};
  padding: 0 10%;
  text-align: center;
  width: 100%;
  word-wrap: break-word;
`

const ShareLinkIcon = styled.img`
  display: block;
  height: 100%;
  width: 100%;
`

class ShareOverlay extends Component<Props> {
  Array
  constructor (props) {
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
  }

  getEmbedCode () {
    let code: string =
      '<iframe webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true" src="' +
      this.props.portalUrl +
      '/embed/' +
      this.props.videoId
    let embedOptions: string = '?'
    this.state.embedOptions.map((opt: Object, index: number) => {
      embedOptions += opt.checked ? opt.value + '=' + opt.checked + '&' : ''
    })
    code +=
      embedOptions +
      'type=mini" width="570" height="320" frameborder="0"></iframe>'
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
      <Wrapper show={this.props.show}>
        <ArrowButton
          show={this.state.showEmbed}
          onClick={this.toggleShareContent}
        >
          <ArrowButtonIcon>
            <use xlinkHref="#icon-arrow" />
          </ArrowButtonIcon>
        </ArrowButton>
        <CloseButton onClick={this.props.onToggle}>
          <CloseButtonIcon>
            <use xlinkHref="#icon-close" />
          </CloseButtonIcon>
        </CloseButton>
        <Content show={!this.state.showEmbed}>
          <ShareTitle small>Share this video</ShareTitle>
          <AnchorLink
            href={this.props.portalUrl + 'play' + this.props.videoId}
            target="_blank"
            anchor
            white
          >
            {this.props.videoLabelUrl}
          </AnchorLink>
          <ShareButtons>
            {this.props.shareOptions.map((share: Object, index: number) => (
              <Anchor
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
            <ShareLink onClick={this.toggleShareContent} title="Embed">
              <ShareLinkIcon src="/assets/svg/icons-embed-link.svg" />
            </ShareLink>
          </ShareButtons>
        </Content>
        <Content show={this.state.showEmbed}>
          <ShareTitle small>Embed this video</ShareTitle>
          <ShareContent>
            <CopyEmbed anchor white onClick={this.copyCodeToClipboard}>
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
