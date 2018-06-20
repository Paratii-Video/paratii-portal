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

export default class VideoRejected extends Component<Props, void> {
  render () {
    return (
      <InfoStatus>
        <InfoStatusContent>
          <InfoStatusTitle>
            <SVGIcon
              color="pink"
              icon="icon-close"
              height="18px"
              width="18px"
              margin="0 10px 0 0"
            />
            This video has been rejected
          </InfoStatusTitle>
        </InfoStatusContent>
        <Text gray>
          The Paratii community opposed the permanence of this video on the
          platform. The video was deleted because most of our trustees believe
          that this video broke one of our policies
        </Text>
      </InfoStatus>
    )
  }
}
