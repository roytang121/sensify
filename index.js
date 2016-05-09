// index.js
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
// import routes and pass them into <Router/>
import routes from './app/routes'


/** CSS **/
require('./app/stylesheets/main.less');
require('./app/stylesheets/style.less');
require('video.js/dist/video-js.css');

/** vendors **/
require('jquery-ui/sortable');


render(
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById('app')
)
