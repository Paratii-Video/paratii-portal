import React, { Component } from 'react'
import Title from './foundations/Title'
import Label from './foundations/Label'
import Wrapper from './foundations/Wrapper'

import LogoutButton from 'containers/LogoutButtonContainer'

type Props = {
  user: {
    name: string,
    email: string
  }
}

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
