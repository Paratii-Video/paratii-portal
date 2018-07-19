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

export default class VoteSent extends Component<Props, void> {
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
          Vote Revealed
        </InfoStatusTitle>
        <InfoStatusContent margin="36px 0 0">
          <Text>
            Your vote has been revealed, now you just need to wait until the
            reveal period ends.
          </Text>
        </InfoStatusContent>
      </Card>
    )
  }
}
