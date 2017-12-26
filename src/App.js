import React, { Component } from 'react'
import logo from './paratii_logo.png'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Paratii Portal</h1>
        </header>
        <p className='App-intro'>Everything starts here.</p>
      </div>
    )
  }
}

export default App
