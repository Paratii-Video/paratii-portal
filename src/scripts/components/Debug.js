import React, { Component } from 'react'
import styled from 'styled-components'
import { paratii } from '../utils/ParatiiLib'
import type { RootState } from 'types/ApplicationTypes'

const DebugBox = styled.div`
  background-color: #ccc;
  border: 4px dashed #f55;
  padding: 20px;
  margin: 20px;
`

const Title = styled.h2`
  height: 50px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  color: #f55;
`
type Props = {
  state: RootState
}

class Debug extends Component<Props, void> {
  render () {
    delete paratii.config.paratii
    const config = JSON.stringify(paratii.config, null, 2)
    const state = JSON.stringify(this.props, null, 2)
    let warning = null
    if (!paratii.config.registryAddress) {
      warning = (
        <div>
          <b>No registry address set!</b>
        </div>
      )
    } else {
      warning = <div />
    }
    return (
      <DebugBox>
        <pre>
          <Title>Debug information that may be useful to you, developer</Title>
          {warning}
          <br />
          <h3>paratii.config:</h3>
          {config}
          <br />
          <h3>State:</h3>
          {state}
        </pre>
      </DebugBox>
    )
  }
}

export default Debug
