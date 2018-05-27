/* @flow */

import React from 'react'
import styled from 'styled-components'

import paratii from 'utils/ParatiiLib'
import PTIBalanceContainer from 'containers/widgets/PTIBalanceContainer'
import CloseButton from 'components/foundations/buttons/CloseButton'
import SVGIcon from 'components/foundations/SVGIcon'
import Popover from 'components/foundations/Popover'
import Colors from 'components/foundations/base/Colors'
import { POPOVER_PADDING, OVERLAY_BUTTONS_HEIGHT } from 'constants/UIConstants'
import {
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS
} from 'constants/ApplicationConstants'
import { copyTextToClipboard } from 'utils/AppUtils'

import type { Notification, NotificationLevel } from 'types/ApplicationTypes'

const Wrapper = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: ${POPOVER_PADDING};
`

const TopBar = styled.div`
  flex: 0 0 20%;
  width: 100%;
  display: flex;
  align-items: center;
`
const Header = styled.h1`
  flex: 1 1 0;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;

  &:not(:first-child) {
    margin-top: 15px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`

const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Address = styled.div`
  font-size: 14px;
  word-break: break-word;
`

const CopyIcon = styled.div`
  flex: 0 0 15px;
  height: 20px;
  margin-right: 15px;
  width: 20px;
`

type Props = {
  onClose: () => void,
  open: boolean,
  showNotification: (Notification, NotificationLevel) => void
}

class WalletInfo extends React.Component<Props> {
  addressRef: ?HTMLElement

  getAddress = (): string => paratii.eth.getAccount()

  copyAddressToClipboard = (): void => {
    const { showNotification } = this.props
    const { addressRef } = this

    if (addressRef) {
      copyTextToClipboard(addressRef)
      showNotification(
        {
          title: 'Success',
          message: 'Your address has been copied to the clipboard',
          position: NOTIFICATION_POSITIONS.BOTTOM_RIGHT
        },
        NOTIFICATION_LEVELS.SUCCESS
      )
    }
  }

  getAddress = (): string => paratii.eth.getAccount()

  setAddressRef = (ref: HTMLElement): void => {
    this.addressRef = ref
  }

  render () {
    const { onClose, open } = this.props

    return (
      <Popover
        open={open}
        top={OVERLAY_BUTTONS_HEIGHT}
        right={0}
        data-test-id="wallet-info-popover"
      >
        <Wrapper>
          <TopBar>
            <Header>Balance</Header>
            <CloseButton
              data-test-id="wallet-info-close-button"
              onClick={onClose}
            />
          </TopBar>
          <Content>
            <PTIBalanceContainer color={Colors.white} />
            <Header>Public Address</Header>
            <AddressWrapper onClick={this.copyAddressToClipboard}>
              <CopyIcon>
                <SVGIcon color="white" icon="icon-copy" />
              </CopyIcon>
              <Address
                data-test-id="wallet-info-address"
                innerRef={this.setAddressRef}
              >
                {this.getAddress()}
              </Address>
            </AddressWrapper>
          </Content>
        </Wrapper>
      </Popover>
    )
  }
}

export default WalletInfo
