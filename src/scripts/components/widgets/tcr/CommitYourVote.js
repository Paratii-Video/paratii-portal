/* @flow */
/* stylelint-disable */
// import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Button from 'components/foundations/Button'
import Text from 'components/foundations/Text'
import Card from 'components/structures/Card'
import { MODAL } from 'constants/ModalConstants'

type Props = {
  videoId: string,
  isWalletSecured: boolean,
  setVote: Object => void,
  openModal: string => void,
  checkUserWallet: () => void
}

const InfoStatusTitle = styled(Text)`
  display: flex;
  align-items: center;
`

const InfoStatusContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ margin }) => margin};
`

const InfoStatusButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${Button} {
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
      <Card>
        <InfoStatusTitle big accent>
          Commit your side
        </InfoStatusTitle>
        <InfoStatusContent margin="36px 0 30px">
          <Text>
            This video has been challenged, and we need your input! Please vote.
            You will not lose any tokens, but you may win some!
          </Text>
        </InfoStatusContent>
        <InfoStatusButtons>
          <Button accent onClick={() => this.voteVideo(1)}>
            Support
          </Button>
          <Button highlight onClick={() => this.voteVideo(0)}>
            Oppose
          </Button>
        </InfoStatusButtons>
      </Card>
    )
  }
}

export default CommitYourVote
