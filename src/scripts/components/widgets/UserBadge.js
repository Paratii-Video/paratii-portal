import React, { Component } from 'react'
import { add0x } from 'utils/AppUtils'
import Blockies from 'react-blockies'
import { ACTIVATE_SECURE_WALLET } from 'constants/ParatiiLibConstants'
import styled from 'styled-components'
import Text from '../foundations/Text'

type Props = {
  userAddress: String,
  userName: String,
  userDate: String,
  isWalletSecured: Boolean
}

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

class UserBadge extends Component<Props> {
  render () {
    let avatarUser = ''
    if (this.props.userAddress) {
      const lowerAddress = add0x(this.props.userAddress)
      if (ACTIVATE_SECURE_WALLET && this.props.isWalletSecured) {
        avatarUser = <Blockies seed={lowerAddress} size={10} scale={4} />
      }
    }
    return (
      <UserInfo>
        <UserAvatar>{avatarUser}</UserAvatar>
        <UserText>
          <Text small>{this.props.userName}</Text>
          <Text tiny gray>
            {this.props.userDate}
          </Text>
        </UserText>
      </UserInfo>
    )
  }
}

export default UserBadge
