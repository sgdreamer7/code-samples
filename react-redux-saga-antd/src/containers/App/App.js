import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom';
import { getUser } from '../../store/user/selectors'
import { userActions } from '../../store/user'

const mapStateToProps = ((state)=>({  
  user: getUser(state)  
}))
const mapDispatchToProps = ((dispatch) => ({  
    actions: {...bindActionCreators({ ...userActions })}, // es7 spread syntax
    dispatch  
}))
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

