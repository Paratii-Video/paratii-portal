import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { paratii } from '../utils/ParatiiLib'
import type { RootState } from 'types/ApplicationTypes'

const DebugBox = styled.header`
  background-color: #fff;
  border: 2px dashed red;
  padding: 20px;
  margin: 20px;
`

const Title = styled.header`
  background-color: #fff;
  height: 50px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  color: blue;
`
type Props = {
  state: RootState
}

class Debug extends Component<Props, void> {
  render () {
    delete paratii.config.paratii
    let config = JSON.stringify(paratii.config, null, 2)
    let state = JSON.stringify(this.props, null, 2)
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
          <Link to="/play/foo">Play a video</Link>
          <br />
          <Link to="/uploader/upload-file">Upload a file</Link>
          <br />
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
