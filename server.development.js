'use strict';

import 'babel-polyfill';

// server.js
var express = require('express')
var path = require('path')
var compression = require('compression')
var url = require('url');
var colors = require('colors');
var bodyParser = require('body-parser')


const PORT = process.env.PORT || 8081;
const API_ROOT = PORT - 1;

/** for dev env **/
if (!process.env.NODE_ENV) {
  let webpack = require('webpack');
  let WebpackDevServer = require('webpack-dev-server');
  let config = require('./webpack.development.config');

  new WebpackDevServer(webpack(config), {
    /** webpack configuration **/
    proxy: {
      "/socket.io/*": {
        target: 'http://localhost:' + API_ROOT
      },
      "/api/*": {
        target: 'http://localhost:' + API_ROOT
      },
      "/socket": {
        target: "http://localhost:" + API_ROOT + '/socket.io/socket.io.js'
      }
    },
    publicPath: path.resolve('/public/'),
    hot: true,
    quiet: false,
    noInfo: false,
    contentBase: 'public/',
    historyApiFallback: true,
    stats: { colors: true },
    /** end webpack configuration **/
  }).listen(PORT, 'localhost', function (err, result) {
    if (err) {
      return console.log(err);
    }

    console.log('Webpack-dev-server listening at http://localhost:' + PORT);
  });
}

/** api server **/
var app = express()

// middlewares
// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(compression())
app.use(function (req, res, next) {
  console.log(req.method.red.bold + " - " + req.url.green.bold);
  next();
});

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
