import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-size: 20px;
`

const Title = styled.header`
  background-color: #fff;
  height: 50px;
  padding: 20px;
  display: flex;
  align-items: center;
  color: blue;
`

class Debug extends Component {
  render () {
    return (
      <Wrapper>
        <Title>Debug page</Title>
      </Wrapper>
    )
  }
}

export default Debug
