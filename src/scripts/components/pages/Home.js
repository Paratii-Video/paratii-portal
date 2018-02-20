import React, { Component } from 'react'
import { CardContainer } from '../structures/Card'
import PTIGuide from '../widgets/PTIGuide'

import Button from 'components/foundations/Button'
import ModalStake from 'components/widgets/modals/ModalStake'

type Props = {
  showModal: Object
}

class Home extends Component<Props, void> {
  render () {
    return (
      <div>
        <div>
          <Button
            onClick={() => {
              this.props.showModal(<ModalStake />)
            }}
            purple
          >
            Call Modal
          </Button>
        </div>
        <CardContainer>
          <PTIGuide />
        </CardContainer>
      </div>
    )
  }
}

export default Home
