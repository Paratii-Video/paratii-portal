/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import ButtonColor from 'components/foundations/Button'
import Text, { Strong } from 'components/foundations/Text'
import { CardStyle } from 'components/structures/Card'
import SVGIcon from 'components/foundations/SVGIcon'

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

export default class SendYourVoteBack extends Component<Props, void> {
  render () {
    return (
      <InfoStatus>
        <InfoStatusContent>
          <InfoStatusTitle>
            <SVGIcon
              color="pink"
              icon="icon-alert"
              height="18px"
              width="18px"
              margin="0 10px 0 0"
            />
            You need to send back your vote!!
          </InfoStatusTitle>
        </InfoStatusContent>
        <InfoStatusContent>
          <Text gray>
            Wait until the commit period ends to reveal your vote. You will send
            it
            <Strong purple>back</Strong> when the reveal period starts. If you
            don’t send it back your vote is not going to be counted.
          </Text>
        </InfoStatusContent>
        <ButtonColor>Send back your vote</ButtonColor>
      </InfoStatus>
    )
  }
}
