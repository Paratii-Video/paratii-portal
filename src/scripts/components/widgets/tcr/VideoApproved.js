/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Card from 'components/structures/Card'
import SVGIcon from 'components/foundations/SVGIcon'

type Props = {}

const InfoStatusTitle = styled(Text)`
  display: flex;
  align-items: center;
`

const InfoStatusContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ margin }) => margin};
`

export default class VideoApproved extends Component<Props, void> {
  render () {
    return (
      <Card>
        <InfoStatusTitle big accent>
          <SVGIcon
            icon="icon-check"
            height="18px"
            width="18px"
            margin="0 10px 0 0"
          />
          This video has been approved
        </InfoStatusTitle>
        <InfoStatusContent margin="36px 0 30px">
          <Text>
            The Paratii community supported the permanence of this video on the
            platform. The video will continue to exist on the plataform and is
            going to be available for new challenges in 6 days
          </Text>
        </InfoStatusContent>
      </Card>
    )
  }
}
