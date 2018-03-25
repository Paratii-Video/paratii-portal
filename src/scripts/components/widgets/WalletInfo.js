/* @flow */

import React from 'react'
import styled from 'styled-components'

import paratii from 'utils/ParatiiLib'
import PTIBalanceContainer from 'containers/widgets/PTIBalanceContainer'
import CloseButton from 'components/foundations/buttons/CloseButton'
import Popover from 'components/foundations/Popover'
import { POPOVER_PADDING, OVERLAY_BUTTONS_HEIGHT } from 'constants/UIConstants'

const Wrapper = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  height: 130px;
  width: 200px;
  padding: ${POPOVER_PADDING};
`

const TopBar = styled.div`
  flex: 0 0 20%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`

const Balance = styled.div`
  display: flex;
  align-items: center;
`

const BalancePrompt = styled.div`
  margin-right: 10px;
`

const AddressPrompt = styled.div`
  margin-top: 10px;
  margin-right: 10px;
`

const Address = styled.div`
  margin-top: 5px;
  font-size: 12px;
  word-break: break-word;
`

type Props = {
  onClose: () => void,
  open: boolean
}

class WalletInfo extends React.Component<Props> {
  render () {
    const { onClose, open } = this.props

    return (
      <Popover open={open} top={OVERLAY_BUTTONS_HEIGHT} right={0}>
        <Wrapper>
          <TopBar>
            <CloseButton onClick={onClose} />
          </TopBar>
          <Content>
            <Balance>
              <BalancePrompt>Balance: </BalancePrompt>
              <span>
                <PTIBalanceContainer />
              </span>
            </Balance>

            <AddressPrompt>Public Address: </AddressPrompt>
            <Address>{paratii.config.account.address}</Address>
          </Content>
        </Wrapper>
      </Popover>
    )
  }
}

export default WalletInfo
