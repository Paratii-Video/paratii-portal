/* @flow */

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import IconButton from 'components/foundations/buttons/IconButton'
import Popover from 'components/foundations/Popover'
import TruncatedText from 'components/foundations/TruncatedText'
import {
  getFormattedEthBalance,
  getFormattedPtiBalance
} from 'selectors/UserSelectors'

import type { RootState } from 'types/ApplicationTypes'

type Props = {
  popoverPortal: HTMLElement,
  popoverOpen: boolean,
  onClick: (e: Object) => void,
  onClose: (e: Object) => void,
  ethBalance: string,
  ptiBalance: string
}

const mapStateToProps = (state: RootState): Object => ({
  ethBalance: getFormattedEthBalance(state),
  ptiBalance: getFormattedPtiBalance(state)
})

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`

const TopBar = styled.div`
  display: flex;
  flex: 0 0 45%;
  width: 100%;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.popover.title};
`

const Header = styled.div`
  flex: 1 1 0;
  height: 100%;
`

const CloseButton = styled.div`
  flex: 0 0 15px;
  display: flex;
  justify-content: flex-end;
  height: 15px;
`

const BottomBar = styled.div`
  flex: 1 1 0;
  width: 100%;
  display: flex;
`

const Balance = styled.div`
  flex: 0 0 75%;
  max-width: 75%;
  display: flex;
  font-size: 15px;
  position: absolute;
  bottom: 0;
`

const BalanceNumberWrapper = styled.span`
  width: 60%;
  display: inline-block;
`

const ProfileButton = (props: Props) => {
  const { popoverPortal, popoverOpen, onClick, onClose, ethBalance } = props

  return (
    <Fragment>
      <IconButton
        data-test-id="overlay-profile-button"
        icon="/assets/img/prof.svg"
        onClick={onClick}
      />
      {popoverOpen
        ? ReactDOM.createPortal(
          <Popover>
            <ContentWrapper>
              <TopBar>
                <Header>Paratii Wallet</Header>
                <CloseButton>
                  <IconButton
                    icon="/assets/img/close.png"
                    onClick={onClose}
                  />
                </CloseButton>
              </TopBar>
              <BottomBar>
                <Balance>
                  <BalanceNumberWrapper>
                    <TruncatedText>{ethBalance}</TruncatedText>
                  </BalanceNumberWrapper>{' '}
                    PTI
                </Balance>
              </BottomBar>
            </ContentWrapper>
          </Popover>,
          popoverPortal
        )
        : null}
    </Fragment>
  )
}

export default connect(mapStateToProps)(ProfileButton)
