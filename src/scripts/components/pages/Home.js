import React, { Component } from 'react'
import { CardContainer } from '../structures/Card'
import PTIGuide from '../widgets/PTIGuide'

class Home extends Component {
  render () {
    return (
      <CardContainer>
        <PTIGuide />
      </CardContainer>
    )
  }
}

export default Home
