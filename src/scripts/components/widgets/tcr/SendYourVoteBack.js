/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import ButtonColor from 'components/foundations/Button'
import Text from 'components/foundations/Text'
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
            You have previously cast a secret vote, and now is the time to
            reveal it!
          </Text>
        </InfoStatusContent>
        <ButtonColor>Reveal your vote</ButtonColor>
      </InfoStatus>
    )
  }
}
