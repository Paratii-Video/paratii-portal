/* @flow */
/* stylelint-disable */
import React, { Component } from 'react'
import styled from 'styled-components'
import ButtonColor from 'components/foundations/Button'
import Text from 'components/foundations/Text'
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

const InfoStatusButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${ButtonColor} {
    flex: 0 0 49%;
  }
`

class CommitYourVote extends Component<Props, void> {
  render () {
    return (
      <InfoStatus>
        <InfoStatusContent>
          <InfoStatusTitle>Committ your vote</InfoStatusTitle>
        </InfoStatusContent>
        <InfoStatusContent>
          <Text gray>
            This video has been published in our network. If it has anything
            that goes against our policy challenge it and you’ll be rewarded
          </Text>
        </InfoStatusContent>
        <InfoStatusContent>
          <InfoStatusTitle>Choose wise</InfoStatusTitle>
        </InfoStatusContent>
        <InfoStatusButtons>
          <ButtonColor green>Support</ButtonColor>
          <ButtonColor pink>Oppose</ButtonColor>
        </InfoStatusButtons>
      </InfoStatus>
    )
  }
}

export default CommitYourVote
