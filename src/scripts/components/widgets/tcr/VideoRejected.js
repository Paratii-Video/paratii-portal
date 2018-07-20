/* @flow */
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
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

export default class VideoRejected extends Component<Props, void> {
  render () {
    return (
      <Fragment>
        <InfoStatusTitle big accent>
          <SVGIcon
            icon="icon-close"
            height="18px"
            width="18px"
            margin="0 10px 0 0"
          />
          This video has been rejected
        </InfoStatusTitle>
        <InfoStatusContent margin="36px 0 30px">
          <Text>
            The Paratii community opposed the permanence of this video on the
            platform. The video was deleted because most of our trustees believe
            that this video broke one of our policies
          </Text>
        </InfoStatusContent>
      </Fragment>
    )
  }
}
