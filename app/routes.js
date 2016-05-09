// modules/routes.js
import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Player from './components/Player'

module.exports = (
  <Route component={App}>
    <Route path='/' component={Player}>
    //   <Redirect from="/" to="player" />
    // </Route>
    <Route path='/player' component={Home} />
  </Route>
)
