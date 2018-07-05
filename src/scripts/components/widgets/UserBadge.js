import React, { Component } from 'react'
import styled from 'styled-components'
import Text from '../foundations/Text'

type Props = {
  userAvatar: Object,
  userName: String,
  userDate: String
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

  img {
    height: 100%;
    width: 100%;
  }
`

const UserText = styled.div`
  flex: 1 1 100%;
`

class UserBadge extends Component<Props> {
  render () {
    return (
      <UserInfo>
        <UserAvatar>{this.props.userAvatar}</UserAvatar>
        <UserText>
          <Text accent bold small>
            {this.props.userName}
          </Text>
        </UserText>
      </UserInfo>
    )
  }
}

export default UserBadge
