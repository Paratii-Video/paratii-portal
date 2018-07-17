/* @flow */
/* stylelint-disable */
// import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import ButtonColor from 'components/foundations/Button'
import Text from 'components/foundations/Text'
import { CardStyle } from 'components/structures/Card'
import { MODAL } from 'constants/ModalConstants'

type Props = {
  videoId: string,
  isWalletSecured: boolean,
  setVote: Object => void,
  openModal: string => void,
  checkUserWallet: () => void
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
    this.voteVideo = this.voteVideo.bind(this)
  }

  async voteVideo (vote: number) {
    if (this.props.isWalletSecured) {
      this.props.setVote({ id: this.props.videoId, vote: vote })
      this.props.openModal(MODAL.VOTE)
    } else {
      // If wallet not secure open the modal for signup / login
      this.props.checkUserWallet()
    }
  }

  render () {
    return (
      <InfoStatus>
        <InfoStatusContent>
          <InfoStatusTitle>Commit your vote</InfoStatusTitle>
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
