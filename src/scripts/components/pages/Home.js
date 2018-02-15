import React, { Component } from 'react'
import Btn from 'components/foundations/Button'
import HR from 'components/foundations/HR'
import styled from 'styled-components'
import ModalStake from 'components/widgets/modals/ModalStake'

type Props = {
  showModal: Object
}

const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 200px;
`

class Home extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <Btn
          onClick={() => {
            this.props.showModal(<ModalStake />)
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
