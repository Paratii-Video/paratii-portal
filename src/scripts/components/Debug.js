import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { paratii } from '../utils/ParatiiLib'

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

class Debug extends Component {
  render () {
    delete paratii.config.paratii
    let config = JSON.stringify(paratii.config, null, 2)
    let warning = null
    if (!paratii.config.registryAddress) {
      warning = <div><b>No registry address set!</b></div>
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
          {config}

        </pre>
      </DebugBox>
    )
  }
}

export default Debug
