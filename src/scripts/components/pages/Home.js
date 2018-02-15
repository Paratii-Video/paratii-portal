import React, { Component } from 'react'
import Btn from 'components/foundations/Button'
import HR from 'components/foundations/HR'
import styled from 'styled-components'

type Props = {
  showModal: Object
}

const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 200px;
`

const view = styled.div`
  background: purple;
  height: 100px;
  width: 100px;
`

class Home extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <HR />
        <Btn
          onClick={() => {
            this.props.showModal(view)
          }}
          purple
        >
          Call Modal
        </Btn>
        <HR />
      </Wrapper>
    )
  }
}

export default Home
