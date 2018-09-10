/* @flow */

import React from 'react'
import styled from 'styled-components'
import TranslatedText from 'components/translations/TranslatedText'
import Colors from 'components/foundations/base/Colors'
import Text from 'components/foundations/Text'
import { FlexCenterStyle } from 'components/foundations/Styles'
import type { ParatiiLib } from 'types/ApplicationTypes'

type Props = {
  balance: string,
  stakedPTI: string,
  color?: string
}

const Wrapper = styled.div`
  ${FlexCenterStyle}
  color: ${({ color }) => color || Colors.purple};
`

class InvestedBalance extends React.Component<Props, void> {
  render () {
    const { color, stakedPTI } = this.props
    const stakedNumber = stakedPTI ? Number(stakedPTI) : 0
    const paratii: ParatiiLib = window.paratii
    const formattedStakedPTI = paratii.eth.web3.utils.fromWei(
      stakedNumber.toString(),
      'ether'
    )

    return (
      <Wrapper color={color}>
        <Text warn margin="0 3px 0 0">{formattedStakedPTI} <TranslatedText message="invested" /></Text>
      </Wrapper>
    )
  }
}

export default InvestedBalance
