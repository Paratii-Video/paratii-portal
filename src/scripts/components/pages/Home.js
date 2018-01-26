import React, { Component } from 'react'
import Anchor from '../foundations/buttons/Anchor'
import Button from '../foundations/buttons/Button'
import NavLink from '../foundations/buttons/NavLink'

type Props = {
}

class Home extends Component<Props, void> {
  render () {
    return (
      <div>
        <Anchor purple>Paratii</Anchor>
        <Button purple>Paratii</Button>
        <NavLink purple="true" to="/">Paratii</NavLink>
      </div>
    )
  }
}

export default Home
