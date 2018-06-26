/* @flow */
/* stylelint-disable */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import ButtonColor from 'components/foundations/Button'
import Text from 'components/foundations/Text'
import { CardStyle } from 'components/structures/Card'

type Props = {
  videoId: string
}
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
  voteVideo: number => void

  constructor (props: Props) {
    super(props)

    this.state = {}
    this.voteVideo = this.voteVideo.bind(this)
  }

  async voteVideo (vote: number) {
    const amountInWei = paratii.eth.web3.utils.toWei('10')
    await paratii.eth.tcr.approveAndGetRightsAndCommitVote(
      this.props.videoId,
      vote,
      amountInWei
    )
  }

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
          <ButtonColor green onClick={() => this.voteVideo(1)}>
            Support
          </ButtonColor>
          <ButtonColor pink onClick={() => this.voteVideo(0)}>
            Oppose
          </ButtonColor>
        </InfoStatusButtons>
      </InfoStatus>
    )
  }
}

export default CommitYourVote
