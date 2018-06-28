/* @flow */
import React, { Component } from 'react'
import paratii from 'utils/ParatiiLib'
import styled from 'styled-components'
import ButtonColor from 'components/foundations/Button'
import Text, { Strong } from 'components/foundations/Text'
import { CardStyle } from 'components/structures/Card'

type Props = {
  videoId: string
}
const INFOSTATUS_CARD_MARGIN_BOTTOM: string = '15px'

const InfoStatus = styled.div`
  ${CardStyle} margin-bottom: ${INFOSTATUS_CARD_MARGIN_BOTTOM};
`

const InfoStatusTitle = styled(Text)`
  display: flex;
  align-items: center;
`

const InfoStatusContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 20px;
`

class WhiteListed extends Component<Props, void> {
  challengeVideo: number => void

  constructor (props: Props) {
    super(props)

    this.challengeVideo = this.challengeVideo.bind(this)
  }

  challengeVideo () {
    paratii.eth.tcr.approveAndStartChallenge(this.props.videoId)
  }

  render () {
    return (
      <InfoStatus>
        <InfoStatusContent>
          <InfoStatusTitle big>
            This video is <Strong>Whitelisted</Strong>
          </InfoStatusTitle>
        </InfoStatusContent>
        <InfoStatusContent>
          <Text gray>
            This video has been published in our network. If it has anything
            that goes against our policy challenge it and you’ll be rewarded
          </Text>
        </InfoStatusContent>
        <ButtonColor onClick={this.challengeVideo}>
          Challenge this content
        </ButtonColor>
      </InfoStatus>
    )
  }
}

export default WhiteListed
