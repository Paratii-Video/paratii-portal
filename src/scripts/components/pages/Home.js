import React, { Component } from 'react'
import { CardContainer } from '../structures/Card'
import PTIGuide from '../widgets/PTIGuide'

type Props = {}

class Home extends Component<Props, void> {
  render () {
    return (
      <CardContainer>
        <PTIGuide />
      </CardContainer>
    )
  }
}

export default Home
