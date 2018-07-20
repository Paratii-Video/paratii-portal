/* @flow */
/* stylelint-disable */
// import paratii from 'utils/ParatiiLib'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Button from 'components/foundations/Button'
import Text from 'components/foundations/Text'
import TranslatedText from 'components/translations/TranslatedText'
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
      <Fragment>
        <InfoStatusTitle big accent>
          <TranslatedText message="tcr.CommitYourVote.title" />
        </InfoStatusTitle>
        <InfoStatusContent margin="36px 0 30px">
          <Text>
            <TranslatedText message="tcr.CommitYourVote.text" />
          </Text>
        </InfoStatusContent>
        <InfoStatusButtons>
          <Button
            accent
            onClick={() => this.voteVideo(1)}
            data-test-id="button-vote-1"
          >
            <TranslatedText message="tcr.CommitYourVote.buttonSupport" />
          </Button>
          <Button
            highlight
            onClick={() => this.voteVideo(0)}
            data-test-id="button-vote-2"
          >
            <TranslatedText message="tcr.CommitYourVote.buttonOppose" />
          </Button>
        </InfoStatusButtons>
      </Fragment>
    )
  }
}

export default CommitYourVote
