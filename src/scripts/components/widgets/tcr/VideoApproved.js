/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
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

export default class VideoApproved extends Component<Props, void> {
  render () {
    return (
      <InfoStatus>
        <InfoStatusContent>
          <InfoStatusTitle>
            <SVGIcon
              color="green"
              icon="icon-check"
              height="18px"
              width="18px"
              margin="0 10px 0 0"
            />
            This video has been approved
          </InfoStatusTitle>
        </InfoStatusContent>
        <Text gray>
          The Paratii community supported the permanence of this video on the
          platform. The video will continue to exist on the plataform and is
          going to be available for new challenges in 6 days
        </Text>
      </InfoStatus>
    )
  }
}
