import React, { Component } from 'react'
import styled from 'styled-components'

import LogoutButton from 'containers/LogoutButtonContainer'

type Props = {
  user: {
    name: string,
    email: string
  }
}

const Wrapper = styled.div`
  font-size: 20px;
`

const Title = styled.header`
  background-color: #fff;
  height: 50px;
  padding: 20px;
  display: flex;
  align-items: center;
  color: #95989a;
  font-weight: 500;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`

const Label = styled.div`
  color: gray;
`

class Profile extends Component<Props, void> {
  render () {
    const {name, email} = this.props.user
    return (
      <Wrapper>
        <Title>{name}</Title>
        <Label id='profile-email'>{email}</Label>
        <LogoutButton />
      </Wrapper>
    )
  }
}

export default Profile
