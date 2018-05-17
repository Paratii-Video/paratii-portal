/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import { add0x } from 'utils/AppUtils'
import Blockies from 'react-blockies'
import {
  MAINHEADER_LOGO_HEIGHT,
  Z_INDEX_USERNAV
} from '../constants/UIConstants'
import { ACTIVATE_SECURE_WALLET } from 'constants/ParatiiLibConstants'
import Text from './foundations/Text'

type Props = {
  children: Object,
  userAddress: string,
  isWalletSecured: boolean,
  checkUserWallet: () => void
}

const Wrapper = styled.div`
  background: ${props => props.theme.colors.UserNav.background};
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 312px;
  z-index: ${Z_INDEX_USERNAV};
`

const UserWrapper = styled.div`
  background: ${props => props.theme.colors.UserNav.Userbackground};
  display: flex;
  flex-direction: column;
  margin-top: ${MAINHEADER_LOGO_HEIGHT};
  padding: 40px 30px;
`

const UserInfo = styled.div`
  align-items: center;
  display: flex;
`

const UserAvatar = styled.div`
  background-color: ${props => props.theme.colors.header.color};
  border-radius: 100%;
  flex: 0 0 40px;
  height: 40px;
  margin-right: 10px;
  overflow: hidden;
`

const UserText = styled.div`
  flex: 1 1 100%;
`

const UserPTI = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
`

const UserPTIValuesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const UserPTIValue = styled.div`
  flex: 0 1 48.5%;
`

const UserPTIValueBox = styled.div`
  align-content: center;
  background-color: ${props => props.theme.colors.UserNav.UserPTIValueBox};
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 14px 14px 16px;
  text-align: center;
`

const UserPTIBarWrapper = styled.div`
  border-radius: 2px;
  display: flex;
  height: 4px;
  margin-top: 25px;
`

const UserPTIBar = styled.div`
  background: ${props =>
    props.red
      ? props.theme.colors.UserNav.UserPTIBarTwo
      : props.theme.colors.UserNav.UserPTIBarOne};
  flex: 1 1 ${props => props.percentage};
  height: 100%;
  text-align: center;

  ${Text} {
    margin-top: 5px;
  }
`

class UserNav extends Component<Props, void> {
  render () {
    let avatarUser = ''
    if (this.props.userAddress) {
      const lowerAddress = add0x(this.props.userAddress)
      if (ACTIVATE_SECURE_WALLET && this.props.isWalletSecured) {
        avatarUser = <Blockies seed={lowerAddress} size={10} scale={4} />
      }
    }

    return (
      <Wrapper>
        <UserWrapper>
          <UserInfo>
            <UserAvatar>{avatarUser}</UserAvatar>
            <UserText>
              <Text small>User 12610549</Text>
              <Text tiny gray>
                Paratii member since 2018
              </Text>
            </UserText>
          </UserInfo>
          <UserPTI>
            <UserPTIValuesWrapper>
              <UserPTIValue>
                <Text gray tiny>
                  Available PTI
                </Text>
                <UserPTIValueBox>
                  <Text purple>10 PTI</Text>
                  <Text gray tiny>
                    US$ 3.00
                  </Text>
                </UserPTIValueBox>
              </UserPTIValue>
              <UserPTIValue>
                <Text gray tiny>
                  Staked PTI
                </Text>
                <UserPTIValueBox>
                  <Text pink>10 PTI</Text>
                  <Text gray tiny>
                    US$ 3.00
                  </Text>
                </UserPTIValueBox>
              </UserPTIValue>
            </UserPTIValuesWrapper>
            <UserPTIBarWrapper>
              <UserPTIBar percentage="70%">
                <Text purple tiny>
                  70%
                </Text>
              </UserPTIBar>
              <UserPTIBar red percentage="30%">
                <Text pink tiny>
                  30%
                </Text>
              </UserPTIBar>
            </UserPTIBarWrapper>
          </UserPTI>
        </UserWrapper>
      </Wrapper>
    )
  }
}

export default UserNav
