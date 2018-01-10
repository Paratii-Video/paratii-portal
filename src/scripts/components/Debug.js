import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
        <pre>
          <Title>Debug page</Title>
          <Link to="/play/foo">Play a video</Link>
          <br />
          <Link to="/uploader/upload-file">Upload a file</Link>
        </pre>
      </Wrapper>
    )
  }
}

export default Debug
