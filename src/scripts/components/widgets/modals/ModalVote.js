/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Text, { Strong } from 'components/foundations/Text'
import TextButton from 'components/foundations/TextButton'
import TranslatedText from 'components/translations/TranslatedText'
import UserRecord from 'records/UserRecords'
import { MIN_VOTE_PTI } from 'constants/TCRConstants'
import { ModalContentWrapper, ModalScrollContent, ModalTitle } from './Modal'

type Props = {
  id: string,
  title: string,
  description: string,
  author: string,
  user: UserRecord,
  selectedVideoId: string,
  getVideoVote: number,
  setVoteStatus: Object => void,
  closeModal: () => void,
  saveVideoStaked: Object => Object,
  notification: (Object, string) => void,
  storeVote: Object => void,
  loadBalances: () => void
}

const Highlight = styled(Text)`
  color: ${props => props.theme.colors.Modal.hightlight};
  margin-bottom: 14px;
`

const MainText = styled(Text)`
  margin-bottom: 35px;
`

const Anchor = TextButton.withComponent('a')

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  width: 100%;
`

class ModalVote extends Component<Props, Object> {
  onSubmit: (e: Object) => void
  disableButton: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      errorMessage: false,
      agreedTOC: false, // TODO,
      stakeAmount: 0,
      isVoting: false
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.disableButton = this.disableButton.bind(this)
  }

  disableButton = () => {
    return this.state.isVoting
  }

  async onSubmit (event: Object) {
    event.preventDefault()
    const amountInWei = paratii.eth.web3.utils.toWei(String(MIN_VOTE_PTI))
    this.props.notification({ title: 'Processing your vote...' }, 'warning')
    const vote = this.props.getVideoVote
    const videoId = this.props.selectedVideoId
    console.log(`your vote is ${vote}`)
    try {
      // Inside eventLogs there is the voteCommite to save in localStorage
      const {
        tx,
        salt
      } = await paratii.eth.tcr.approveAndGetRightsAndCommitVote(
        videoId,
        vote,
        Number(amountInWei)
      )

      this.props.setVoteStatus({
        id: this.props.selectedVideoId,
        voteStatus: {
          voter: paratii.getAccount(),
          numTokens: Number(amountInWei),
          vote: vote
        }
      })
      const pollID = tx.events._VoteCommitted.returnValues.pollID
      console.log(
        `need to save salt: ${salt} and vote ${vote} and pollID ${pollID} in localstorage`
      )
      this.props.storeVote({
        videoId,
        salt,
        vote,
        pollID
      })

      // notifications.something('lasdfjasdflj')
    } catch (e) {
      console.log(e.message)
      this.props.notification({ title: e.message }, 'error')
      throw e
    }

    this.setState({
      isVoting: true
    })
    this.props.closeModal()
  }

  async componentDidMount () {
    const stakeAmountBN = await paratii.eth.tcr.getMinDeposit()
    const stakeAmountWei = stakeAmountBN.toString()
    const stakeAmount = paratii.eth.web3.utils.fromWei(stakeAmountWei)
    this.setState({
      stakeAmount
    })
  }

  componentWillReceiveProps (nextProps: Props): void {
    this.setState({
      errorMessage: false,
      agreedTOC: false // TODO,
    })
  }

  render () {
    const balanceInWei = this.props.user.balances.PTI
    const balanceInPTI = paratii.eth.web3.utils.fromWei(String(balanceInWei))
    const balanceIsTooLow = Number(balanceInPTI) < Number(MIN_VOTE_PTI)
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <ModalTitle accent>
            <TranslatedText message="modal.vote.title" />
          </ModalTitle>
          <Highlight>
            By voting to {this.props.getVideoVote ? 'support' : 'oppose'} this
            video you agree to make a stake deposit of{' '}
            <Strong purple>{MIN_VOTE_PTI} PTI</Strong>.
          </Highlight>
          {!balanceIsTooLow ? (
            <MainText small>
              For now, with no monetary value, this is mostly an experiment.
              Soon, the community will curate all the content published.
              Well-received videos will see their stakes increase, earning PTI
              for their creators. Illegal content may lose its stake. Want to
              know how exactly this is going to play out? Stay alert!
            </MainText>
          ) : (
            ''
          )}

          {this.state.errorMessage && (
            <MainText warn small>
              {this.state.errorMessage}
            </MainText>
          )}
          {balanceIsTooLow ? (
            <MainText warn>
              Your balance is too low: you need to stake at least {MIN_VOTE_PTI}{' '}
              PTI, but you only have {balanceInPTI}. Have no voucher?{' '}
              <Anchor
                href="mailto:we@paratii.video"
                target="_blank"
                accent
                anchor
              >
                Drop us a line
              </Anchor>{' '}
              and we might hand out some. Remember: these are testnet tokens. No
              real value (yet)!
            </MainText>
          ) : (
            <Footer>
              <TextButton
                accent
                onClick={this.onSubmit}
                disabled={this.disableButton()}
                data-test-id="button-confirm-vote"
              >
                {this.props.getVideoVote ? 'support' : 'oppose'}
              </TextButton>
            </Footer>
          )}
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalVote
