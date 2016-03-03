import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import configureStore from './store'
import Routes from './components/routes'

import './app.scss';

const store = configureStore()

render(
  <Provider store={store}>
    <Routes/>
  </Provider>,
  document.getElementById('content')
)
