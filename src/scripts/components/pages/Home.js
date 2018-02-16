import React, { Component } from 'react'
import Btn from 'components/foundations/Button'
import styled from 'styled-components'

type Props = {}

const Wrapper = styled.div`
  margin: 0 auto;
  width: 200px;
`

const Anchor = Btn.withComponent('a')

class Home extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <Btn>Paratii</Btn>
        <Btn white>Paratii</Btn>
        <Btn purple>Paratii</Btn>
        <Btn underline>Paratii</Btn>
        <Anchor white anchor>
          Paratii
        </Anchor>
        <Anchor purple anchor>
          Paratii
        </Anchor>
      </Wrapper>
    )
  }
}

export default Home
