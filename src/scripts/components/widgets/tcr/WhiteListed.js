/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import ButtonColor from 'components/foundations/Button'
import Text, { Strong } from 'components/foundations/Text'
import { CardStyle } from 'components/structures/Card'

type Props = {}
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
        <ButtonColor>Challenge this content</ButtonColor>
      </InfoStatus>
    )
  }
}

export default WhiteListed
