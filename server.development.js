// 'use strict';

// import 'babel-polyfill';

// import React from 'react'
// import { render } from 'react-dom'
// import { Router, browserHistory } from 'react-router'
// // we'll use this to render our app to an html string
// import { renderToString } from 'react-dom/server'
// // and these to match the url to routes and then render
// import { match, RouterContext } from 'react-router'
// import routes from './app/routes'

// server.js
var express = require('express')
var path = require('path')
var compression = require('compression')
var url = require('url');
var colors = require('colors');
var bodyParser = require('body-parser')


const API_ROOT = process.env.PORT || 8080;
const PORT = API_ROOT + 1;

/** for dev env **/
// if (process.env.NODE_ENV === 'dev' || !process.env.NODE_ENV) {
//   let webpack = require('webpack');
//   let WebpackDevServer = require('webpack-dev-server');
//   let config = require('./webpack.development.config');
//
//   new WebpackDevServer(webpack(config), {
//     /** webpack configuration **/
//     proxy: {
//       "/socket.io/*": {
//         target: 'http://localhost:' + API_ROOT
//       },
//       "/api/*": {
//         target: 'http://localhost:' + API_ROOT
//       },
//       "/socket": {
//         target: "http://localhost:" + API_ROOT + '/socket.io/socket.io.js'
//       }
//     },
//     publicPath: path.resolve('/public/'),
//     hot: false,
//     quiet: false,
//     noInfo: false,
//     contentBase: 'public/',
//     historyApiFallback: true,
//     stats: { colors: true },
//     /** end webpack configuration **/
//   }).listen(PORT, 'localhost', function (err, result) {
//     if (err) {
//       return console.log(err);
//     }
//
//     console.log('Webpack-dev-server listening at http://localhost:' + PORT);
//   });
// }

/** api server **/
var app = express()
app.use(compression());

// middlewares
// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.set('view engine', 'ejs');
app.use(function (req, res, next) {
  console.log(req.method.red.bold + " - " + req.url.green.bold);
  next();
});


var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
let config = require('./webpack.development.config');

if (!process.env.NODE_ENV) {
  app.use(webpackDevMiddleware(webpack(config), {
    // options
    publicPath: path.resolve('/public/'),
    contentBase: 'public/',
    quiet: false,
    historyApiFallback: true,
    stats: { colors: true },
  }));
}

/** Production Server **/
// if (process.env.NODE_ENV === 'production') {
//   app.get('*', (req, res) => {
//     match({ routes: routes, location: req.url}, (err, redirect, props) => {
//       if (err) {
//         // there was an error somewhere during route matching
//         res.status(500).send(err.message)
//       } else if (redirect) {
//         // we haven't talked about `onEnter` hooks on routes, but before a
//         // route is entered, it can redirect. Here we handle on the server.
//         res.redirect(redirect.pathname + redirect.search)
//       } else if (props) {
//         // if we got props then we matched a route and can render
//         const appHtml = renderToString(<RouterContext {...props}/>)
//         res.send(renderPage(appHtml))
//       } else {
//         // no errors, no redirect, we just didn't match anything
//         res.status(404).send('Not Found');
//       }
//     });
//   });
// }

// function renderPage(appHtml) {
//   return `
//     <!doctype html public="storage">
//     <html>
//     <meta charset=utf-8/>
//     <title>My First React Router App</title>
//     <link rel=stylesheet href=/index.css>
//     <div id=app>${appHtml}</div>
//     <script src="/bundle.js"></script>
//    `
// }

// var proxy = require('http-proxy-middleware');
// var webpackProxy = proxy('/webpack', {
//   target: 'http://localhost:' + PORT,
//   changeOrigin: true,
//   ws: true,
//   pathRewrite: {
//     '/webpack': '/',
//   },
//   proxyTable: {
//     '*': 'http://localhost:' + PORT
//   }
// });
// app.use(webpackProxy);

//import api module
app.use('/api', require('./api'));

// socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
    onlineUsers++;

    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

    socket.on('disconnect', function() {
        onlineUsers--;
        io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
    });
});

server.listen(API_ROOT, function() {
  console.log('Api Express server running at localhost:' + API_ROOT)
})



// rethinkdb and events
import rethink from './rethink';

rethink.on('connection', () => {
  console.log("Rethink db connected".green);
});

rethink.on('playlistChanges', (newVal) => {
  console.log('OnPlaylistChanges'.green.bold);
  io.sockets.emit('playlistChanges', newVal);
})
