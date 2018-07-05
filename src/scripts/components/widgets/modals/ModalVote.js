/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Text, { Strong } from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import UserRecord from 'records/UserRecords'
import { MIN_VOTE_PTI } from 'constants/TCRConstants'
import { ModalContentWrapper, ModalScrollContent } from './Modal'

type Props = {
  id: string,
  title: string,
  description: string,
  author: string,
  user: UserRecord,
  selectedVideoId: string,
  getVideoVote: number,
  closeModal: () => void,
  saveVideoStaked: Object => Object,
  notification: (Object, string) => void,
  loadBalances: () => void
}

const Title = styled.h2`
  color: ${props => props.theme.colors.Modal.title};
  font-size: ${props => props.theme.fonts.modal.title};
  margin-bottom: 25px;
`

const Highlight = styled(Text)`
  color: ${props => props.theme.colors.Modal.hightlight};
  margin-bottom: 14px;
`

const MainText = styled(Text)`
  margin-bottom: 35px;
`

const Anchor = Button.withComponent('a')

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
    const amountInWei = paratii.eth.web3.utils.toWei(MIN_VOTE_PTI)
    this.props.notification({ title: 'Processing your vote...' }, 'warning')
    await paratii.eth.tcr.approveAndGetRightsAndCommitVote(
      this.props.selectedVideoId,
      this.props.getVideoVote,
      amountInWei
    )

    this.setState({
      isVoting: true
    })
  }

  async componentDidMount () {
    const stakeAmountBN = await paratii.eth.tcrPlaceholder.getMinDeposit()
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
          <Title>Vote this video</Title>
          <Highlight>
            By voting to {this.props.getVideoVote ? 'support' : 'oppose'} this
            video you agree to make a stake deposit of{' '}
            <Strong purple>{MIN_VOTE_PTI} PTI</Strong>. This will trigger the
            voting period.
          </Highlight>
          {!balanceIsTooLow ? (
            <MainText small gray>
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
            <MainText pink small>
              {this.state.errorMessage}
            </MainText>
          )}
          {balanceIsTooLow ? (
            <MainText pink>
              Your balance is too low: you need to stake at least {MIN_VOTE_PTI}{' '}
              PTI, but you only have {balanceInPTI}. Have no voucher?{' '}
              <Anchor
                href="mailto:we@paratii.video"
                target="_blank"
                purple
                anchor
              >
                Drop us a line
              </Anchor>{' '}
              and we might hand out some. Remember: these are testnet tokens. No
              real value (yet)!
            </MainText>
          ) : (
            <Footer>
              <Button
                purple
                onClick={this.onSubmit}
                disabled={this.disableButton()}
                data-test-id="button-stake"
              >
                Continue
              </Button>
            </Footer>
          )}
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalVote
