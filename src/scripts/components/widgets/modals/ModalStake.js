/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import TextButton from 'components/foundations/TextButton'
import UserRecord from 'records/UserRecords'
import { ModalContentWrapper, ModalScrollContent } from './Modal'

type Props = {
  id: string,
  title: string,
  description: string,
  author: string,
  user: UserRecord,
  closeModal: () => void,
  saveVideoStaked: Object => Object,
  selectedVideo: Object => Object,
  notification: (Object, string) => void,
  loadTotalStakedPTI: () => void,
  loadBalances: () => void
}

const Highlight = styled(Text)`
  color: ${props => props.theme.colors.Modal.highlight};
  margin: 14px 0;
`

const MainText = styled(Text)`
  margin-top: 14px;
`

const Anchor = TextButton.withComponent('a')

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  width: 100%;
`

class ModalStake extends Component<Props, Object> {
  onSubmit: (e: Object) => void
  disableButton: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      errorMessage: false,
      agreedTOC: false, // TODO,
      stakeAmount: 0,
      isStaking: false
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.disableButton = this.disableButton.bind(this)
  }

  disableButton = () => {
    return this.state.isStaking
  }

  onSubmit (event: Object) {
    const { loadBalances, loadTotalStakedPTI } = this.props
    event.preventDefault()
    this.props.notification({ title: 'Processing...' }, 'warning')
    const stakeAmount = this.state.stakeAmount
    const stakeAmountWei = paratii.eth.web3.utils.toWei(String(stakeAmount))
    const videoIdStaked = this.props.selectedVideo.id

    this.setState({
      isStaking: true
    })

    paratii.eth.tcr
      .checkEligiblityAndApply(videoIdStaked, stakeAmountWei)
      .then(resp => {
        if (resp && resp === true) {
          this.setState({
            errorMessage: false
          })
          const videoToSave = {
            id: videoIdStaked,
            deposit: stakeAmountWei
          }
          this.props.saveVideoStaked(videoToSave)

          this.props.closeModal()
          console.log(
            `video ${videoIdStaked} successfully applied to TCR Listing`
          )
          this.props.notification(
            {
              title: 'Stake well done',
              message: `You have staked ${stakeAmount} 💎.`
            },
            'success'
          )
          loadBalances()
          loadTotalStakedPTI()
        } else {
          const msg =
            'apply returns false :( , something went wrong at contract level. check balance, gas, all of that stuff.'
          this.setState({
            errorMessage: msg,
            isStaking: false
          })
          console.log(msg)
        }
      })
      .catch(e => {
        if (e) {
          const msg = String(e)
          this.setState({
            errorMessage: msg,
            isStaking: false
          })
          console.log(msg)
        }
      })
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
    const minDeposit = this.state.stakeAmount
    const balanceIsTooLow = Number(balanceInPTI) < Number(minDeposit)
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title accent>Stake {minDeposit} 💎</Title>
          <Highlight primary>
            By publishing this video you agree to make a stake deposit of{' '}
            {minDeposit} 💎. The 💎 still belong to you, and can be
            retrieved, along with the video, at any time.
          </Highlight>
          {!balanceIsTooLow ? (
            <MainText small>
              This is an experiment with distributed curation.
              💎 has no monetary properties. One day, 💎 may accrue value and
              become freely traded.
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
              Your balance is too low: you need to stake at least {minDeposit}{' '}
              💎, but you only have {balanceInPTI}. Have no voucher?{' '}
              <Anchor
                href="mailto:we@paratii.video"
                target="_blank"
                accent
                anchor
              >
                Drop us a line
              </Anchor>{' '}
              and we might hand out some!
            </MainText>
          ) : (
            <Footer>
              <TextButton
                accent
                onClick={this.onSubmit}
                disabled={this.disableButton()}
                data-test-id="button-stake"
              >
                Continue
              </TextButton>
            </Footer>
          )}
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalStake
