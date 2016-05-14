/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(__dirname) {/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-api/modules/index.js\"), RootInstanceProvider = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-loader/RootInstanceProvider.js\"), ReactMount = require(\"react/lib/ReactMount\"), React = require(\"react\"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\n'use strict';\n\nvar _rethink = __webpack_require__(1);\n\nvar _rethink2 = _interopRequireDefault(_rethink);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// 'use strict';\n\n// import 'babel-polyfill';\n\n// import React from 'react'\n// import { render } from 'react-dom'\n// import { Router, browserHistory } from 'react-router'\n// // we'll use this to render our app to an html string\n// import { renderToString } from 'react-dom/server'\n// // and these to match the url to routes and then render\n// import { match, RouterContext } from 'react-router'\n// import routes from './app/routes'\n\n// server.js\nvar express = __webpack_require__(6);\nvar path = __webpack_require__(7);\nvar compression = __webpack_require__(8);\nvar url = __webpack_require__(9);\nvar colors = __webpack_require__(2);\nvar bodyParser = __webpack_require__(10);\n\nvar API_ROOT = process.env.PORT || 8080;\nvar PORT = API_ROOT + 1;\n\n/** for dev env **/\n// if (process.env.NODE_ENV === 'dev' || !process.env.NODE_ENV) {\n//   let webpack = require('webpack');\n//   let WebpackDevServer = require('webpack-dev-server');\n//   let config = require('./webpack.development.config');\n//\n//   new WebpackDevServer(webpack(config), {\n//     /** webpack configuration **/\n//     proxy: {\n//       \"/socket.io/*\": {\n//         target: 'http://localhost:' + API_ROOT\n//       },\n//       \"/api/*\": {\n//         target: 'http://localhost:' + API_ROOT\n//       },\n//       \"/socket\": {\n//         target: \"http://localhost:\" + API_ROOT + '/socket.io/socket.io.js'\n//       }\n//     },\n//     publicPath: path.resolve('/public/'),\n//     hot: false,\n//     quiet: false,\n//     noInfo: false,\n//     contentBase: 'public/',\n//     historyApiFallback: true,\n//     stats: { colors: true },\n//     /** end webpack configuration **/\n//   }).listen(PORT, 'localhost', function (err, result) {\n//     if (err) {\n//       return console.log(err);\n//     }\n//\n//     console.log('Webpack-dev-server listening at http://localhost:' + PORT);\n//   });\n// }\n\n/** api server **/\nvar app = express();\napp.use(compression());\n\n// middlewares\n// serve our static stuff like index.css\napp.use(express.static(path.join(__dirname, 'public')));\napp.use(bodyParser.json()); // to support JSON-encoded bodies\napp.use(bodyParser.urlencoded({ // to support URL-encoded bodies\n  extended: true\n}));\napp.set('view engine', 'ejs');\napp.use(function (req, res, next) {\n  console.log(req.method.red.bold + \" - \" + req.url.green.bold);\n  next();\n});\n\nvar webpackDevMiddleware = __webpack_require__(11);\nvar webpack = __webpack_require__(12);\nvar config = __webpack_require__(13);\n\nif (!process.env.NODE_ENV) {\n  app.use(webpackDevMiddleware(webpack(config), {\n    // options\n    publicPath: path.resolve('/public/'),\n    contentBase: 'public/',\n    quiet: false,\n    historyApiFallback: true,\n    stats: { colors: true }\n  }));\n}\n\n/** Production Server **/\n// if (process.env.NODE_ENV === 'production') {\n//   app.get('*', (req, res) => {\n//     match({ routes: routes, location: req.url}, (err, redirect, props) => {\n//       if (err) {\n//         // there was an error somewhere during route matching\n//         res.status(500).send(err.message)\n//       } else if (redirect) {\n//         // we haven't talked about `onEnter` hooks on routes, but before a\n//         // route is entered, it can redirect. Here we handle on the server.\n//         res.redirect(redirect.pathname + redirect.search)\n//       } else if (props) {\n//         // if we got props then we matched a route and can render\n//         const appHtml = renderToString(<RouterContext {...props}/>)\n//         res.send(renderPage(appHtml))\n//       } else {\n//         // no errors, no redirect, we just didn't match anything\n//         res.status(404).send('Not Found');\n//       }\n//     });\n//   });\n// }\n\n// function renderPage(appHtml) {\n//   return `\n//     <!doctype html public=\"storage\">\n//     <html>\n//     <meta charset=utf-8/>\n//     <title>My First React Router App</title>\n//     <link rel=stylesheet href=/index.css>\n//     <div id=app>${appHtml}</div>\n//     <script src=\"/bundle.js\"></script>\n//    `\n// }\n\n// var proxy = require('http-proxy-middleware');\n// var webpackProxy = proxy('/webpack', {\n//   target: 'http://localhost:' + PORT,\n//   changeOrigin: true,\n//   ws: true,\n//   pathRewrite: {\n//     '/webpack': '/',\n//   },\n//   proxyTable: {\n//     '*': 'http://localhost:' + PORT\n//   }\n// });\n// app.use(webpackProxy);\n\n//import api module\napp.use('/api', __webpack_require__(16));\n\n// socket.io\nvar server = __webpack_require__(21).createServer(app);\nvar io = __webpack_require__(22)(server);\nvar onlineUsers = 0;\n\nio.sockets.on('connection', function (socket) {\n  onlineUsers++;\n\n  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });\n\n  socket.on('disconnect', function () {\n    onlineUsers--;\n    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });\n  });\n});\n\nserver.listen(API_ROOT, function () {\n  console.log('Api Express server running at localhost:' + API_ROOT);\n});\n\n// rethinkdb and events\n\n\n_rethink2.default.on('connection', function () {\n  console.log(\"Rethink db connected\".green);\n});\n\n_rethink2.default.on('playlistChanges', function (newVal) {\n  console.log('OnPlaylistChanges'.green.bold);\n  io.sockets.emit('playlistChanges', newVal);\n});\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-loader/makeExportsHot.js\"); if (makeExportsHot(module, require(\"react\"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot not apply hot update to \" + \"server.development.js\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }\n/* WEBPACK VAR INJECTION */}.call(exports, \"\"))\n\n/*****************\n ** WEBPACK FOOTER\n ** ./server.development.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./server.development.js?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-api/modules/index.js\"), RootInstanceProvider = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-loader/RootInstanceProvider.js\"), ReactMount = require(\"react/lib/ReactMount\"), React = require(\"react\"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\n'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _colors = __webpack_require__(2);\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar r = __webpack_require__(3);\nvar config = __webpack_require__(4)(process.env.NODE_ENV || 'development');\n\n__webpack_require__(5)(r);\n\n/*\n  * Setting up block level variable to store class state\n  * , set's to null by default.\n*/\nvar table_name = 'playlist_test';\n\nvar Rethink = function () {\n  function Rethink() {\n    _classCallCheck(this, Rethink);\n\n    /** delegates must be defined here before listening **/\n    this.delegates = {\n      connection: [],\n      playlistChanges: []\n    };\n\n    console.log(\"rethink connecting db: \" + config.rethinkdb_dbname.red);\n    // start rethink connection\n    r.init({\n      host: config.rethinkdb_host,\n      port: config.rethinkdb_port,\n      db: config.rethinkdb_dbname\n    }, [{\n      name: table_name,\n      primaryKey: 'identifier'\n    }]).then(function (conn) {\n      var _this = this;\n\n      console.log(\"Rethinkdb running on \".green + config.rethinkdb_host + ':' + config.rethinkdb_port);\n      this.conn = conn;\n\n      // delegate connection event\n      this.notify('connection');\n\n      // rethinkdb changeFeeds\n      r.table(table_name).changes().run(this.conn, function (err, feed) {\n        if (err) {\n          console.log(err.toString().red.bold);\n        } else {\n          feed.on('data', function (message) {\n            if (!message.new_val || !message.old_val || !message) return;\n\n            if (message.new_val.identifier === message.old_val.identifier) {\n\n              // notify event\n              this.notify('playlistChanges', message.new_val);\n\n              console.log(this.delegates);\n            }\n          }.bind(_this));\n        }\n      });\n    }.bind(this)).fail(function (err) {\n      console.log(err.bold.red);\n    }.bind(this));\n\n    // function bindings\n    this.updatePlaylist = this.updatePlaylist.bind(this);\n  }\n\n  /** Delegates **/\n\n\n  _createClass(Rethink, [{\n    key: 'on',\n    value: function on(event, cb) {\n      if (event in this.delegates) {\n        this.delegates[event].push(cb);\n      }\n    }\n  }, {\n    key: 'notify',\n    value: function notify(event, data) {\n      if (event in this.delegates) {\n        var _iteratorNormalCompletion = true;\n        var _didIteratorError = false;\n        var _iteratorError = undefined;\n\n        try {\n          for (var _iterator = this.delegates[event][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n            var cb = _step.value;\n\n            cb(data);\n          }\n        } catch (err) {\n          _didIteratorError = true;\n          _iteratorError = err;\n        } finally {\n          try {\n            if (!_iteratorNormalCompletion && _iterator.return) {\n              _iterator.return();\n            }\n          } finally {\n            if (_didIteratorError) {\n              throw _iteratorError;\n            }\n          }\n        }\n      }\n    }\n\n    /* ------------ */\n    /*    Actions   */\n    /* ------------ */\n\n  }, {\n    key: 'updatePlaylist',\n    value: function updatePlaylist(identifier, playlist, cb) {\n      var _this2 = this;\n\n      console.log(\"updatePlaylist\".red.bold + \" \" + identifier.green.bold);\n\n      if (playlist === null) {\n        playlist = [];\n      }\n\n      r.table(table_name).getAll(identifier, { index: \"identifier\" }).limit(1).run(this.conn, function (err, cursor) {\n        if (err) {\n          console.log(err);\n        } else {\n          cursor.toArray().then(function (results) {\n            if (results.length >= 1) {\n              // update\n              var doc = results[0];\n              console.log(\"identifier:\" + identifier.green.bold + \" found with id \" + doc.identifier + \", updating document\");\n\n              console.log(playlist);\n              r.table(table_name).get(doc.identifier).update({\n                data: playlist || new Array(0)\n              }).run(_this2.conn, function (err, result) {\n                if (err) {\n                  console.log(err);\n                }\n                cb(err, result);\n              });\n            } else {\n              // create\n              console.log(\"identifier:\" + identifier + \"found, creating document\");\n\n              r.table(table_name).insert({\n                identifier: identifier,\n                data: playlist\n              }).run(_this2.conn, function (err, result) {\n                if (err) {\n                  console.log(err);\n                }\n                cb(err, result);\n              });\n            }\n          });\n        }\n      });\n    }\n  }, {\n    key: 'getPlaylist',\n    value: function getPlaylist(identifier, cb) {\n      r.table(table_name).get(identifier).run(this.conn, function (err, result) {\n        cb(err, result);\n      });\n    }\n  }]);\n\n  return Rethink;\n}();\n\nvar _rethink = new Rethink();\n\nexports.default = _rethink;\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-loader/makeExportsHot.js\"); if (makeExportsHot(module, require(\"react\"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot not apply hot update to \" + \"rethink.js\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }\n\n/*****************\n ** WEBPACK FOOTER\n ** ./rethink.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./rethink.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("module.exports = require(\"colors\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"colors\"\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22colors%22?");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("module.exports = require(\"rethinkdb\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"rethinkdb\"\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22rethinkdb%22?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-api/modules/index.js\"), RootInstanceProvider = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-loader/RootInstanceProvider.js\"), ReactMount = require(\"react/lib/ReactMount\"), React = require(\"react\"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\n\"use strict\";\n\nvar _colors = __webpack_require__(2);\n\nvar _colors2 = _interopRequireDefault(_colors);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nmodule.exports = function (env) {\n  console.log(\"Using \" + \"Config\".green + \" file with \" + env.red);\n\n  // docker environment\n  if (process.env.DOCKER_IP) {\n    console.log(\"Detected using docker environment: \" + process.env.DOCKER_IP);\n    return {\n      rethinkdb_host: process.env.DOCKER_IP,\n      rethinkdb_port: 28015,\n      rethinkdb_dbname: 'dev_sensbify'\n    };\n  }\n\n  if (env === 'production') {\n    return {\n      rethinkdb_host: \"localhost\",\n      rethinkdb_port: process.env.RETHINKDB_PORT,\n      rethinkdb_dbname: 'dev_sensbify'\n    };\n  } else {\n    return {\n      rethinkdb_host: '192.168.99.100',\n      rethinkdb_port: 32775,\n      rethinkdb_dbname: 'dev_sensbify'\n    };\n  }\n};\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-loader/makeExportsHot.js\"); if (makeExportsHot(module, require(\"react\"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot not apply hot update to \" + \"config.js\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }\n\n/*****************\n ** WEBPACK FOOTER\n ** ./config.js\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./config.js?");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("module.exports = require(\"rethinkdb-init\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"rethinkdb-init\"\n ** module id = 5\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22rethinkdb-init%22?");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("module.exports = require(\"express\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"express\"\n ** module id = 6\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22express%22?");

/***/ },
/* 7 */
/***/ function(module, exports) {

	eval("module.exports = require(\"path\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"path\"\n ** module id = 7\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22path%22?");

/***/ },
/* 8 */
/***/ function(module, exports) {

	eval("module.exports = require(\"compression\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"compression\"\n ** module id = 8\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ },
/* 9 */
/***/ function(module, exports) {

	eval("module.exports = require(\"url\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"url\"\n ** module id = 9\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22url%22?");

/***/ },
/* 10 */
/***/ function(module, exports) {

	eval("module.exports = require(\"body-parser\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"body-parser\"\n ** module id = 10\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ },
/* 11 */
/***/ function(module, exports) {

	eval("module.exports = require(\"webpack-dev-middleware\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"webpack-dev-middleware\"\n ** module id = 11\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ },
/* 12 */
/***/ function(module, exports) {

	eval("module.exports = require(\"webpack\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"webpack\"\n ** module id = 12\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(__dirname) {/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-api/modules/index.js\"), RootInstanceProvider = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-loader/RootInstanceProvider.js\"), ReactMount = require(\"react/lib/ReactMount\"), React = require(\"react\"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\n'use strict';\n\nvar webpack = __webpack_require__(12);\nvar path = __webpack_require__(7);\nvar ExtractTextPlugin = __webpack_require__(14);\nvar HtmlWebpackPlugin = __webpack_require__(15);\n// loaders: ['react-hot', 'babel-loader?presets[]=es2015&presets[]=react']\nvar production = process.env.NODE_ENV === 'production';\n\nmodule.exports = {\n  devtool: production ? 'source-map' : 'eval',\n\n  node: {\n    fs: \"empty\"\n  },\n\n  entry: {\n    app: ['./index.js']\n  },\n\n  // 'webpack-dev-server/client?http://localhost:8080/',\n  // \"webpack/hot/only-dev-server\"\n  // vendors: ['video.js', 'jquery']\n  output: {\n    filename: 'bundle.js',\n    path: path.resolve('./public/'),\n    publicPath: 'public/'\n    // publicPath: '/static/'\n  },\n\n  module: {\n    // preLoaders: [\n    //   {\n    //     test: /\\.jsx?$/,\n    //     exclude: /(node_modules|bower_components)/,\n    //     loader: 'source-map'\n    //   }\n    // ],\n    loaders: [{\n      test: /\\.js$/,\n      // exclude: /(node_modules|bower_components)/,\n      include: [path.resolve(__dirname, './app'), path.resolve(__dirname, './index.js')],\n      loaders: ['react-hot-loader', 'babel']\n    }, {\n      test: /\\.less$/,\n      // exclude: /(node_modules|bower_components)/,\n      include: [path.resolve(__dirname, './app/stylesheets')],\n      // loader: ExtractTextPlugin.extract(\"style-loader\", \"css-loader!less-loader\")\n      loader: \"style!css!less\"\n    }, {\n      test: /\\.css$/,\n      loader: \"style-loader!css-loader\"\n    }, {\n      test: /\\.(png|jpg)$/,\n      loader: 'url-loader?limit=8192'\n    }, {\n      test: /\\.woff($|\\?)|\\.woff2($|\\?)|\\.ttf($|\\?)|\\.eot($|\\?)|\\.svg($|\\?)/,\n      loader: 'url-loader'\n    }, {\n      test: /\\.json$/,\n      loader: 'json-loader'\n    }]\n  },\n  resolve: {\n    modulesDirectories: ['node_modules'],\n    extensions: ['', '.json', '.js', '.jsx']\n  },\n  progress: true,\n  // plugins: [\n  // new webpack.HotModuleReplacementPlugin(),\n  // new webpack.ProvidePlugin({\n  //     $: 'jquery',\n  //     jQuery: 'jquery',\n  //     'window.jQuery': 'jquery',\n  //     'root.jQuery': 'jquery'\n  // }),\n  // new webpack.DefinePlugin({\n  //   'process.env': {\n  //     'NODE_ENV': JSON.stringify('production')\n  //   }\n  // }),\n  // new webpack.optimize.UglifyJsPlugin(),\n  // new webpack.IgnorePlugin(/^\\.\\/locale$/, /moment$/),\n  // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')\n  // new ExtractTextPlugin(\"/css/[name].css\")\n  // ExtractTextPlugin will be used in production level\n  // because it doesn't support hot reload\n  // ]\n  plugins: production ? [new webpack.ProvidePlugin({\n    $: 'jquery',\n    jQuery: 'jquery',\n    'window.jQuery': 'jquery',\n    'root.jQuery': 'jquery'\n  }), new webpack.DefinePlugin({\n    'process.env': {\n      'NODE_ENV': JSON.stringify('production')\n    }\n  }), new webpack.optimize.DedupePlugin(), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.optimize.UglifyJsPlugin({\n    compressor: {\n      warnings: false\n    }\n  }), new HtmlWebpackPlugin({\n    template: 'index.ejs',\n    debug: \"debug\",\n    filename: \"index.html\",\n    production: true,\n    inject: false\n  })] : [\n  // new webpack.HotModuleReplacementPlugin()\n  new webpack.ProvidePlugin({\n    $: 'jquery',\n    jQuery: 'jquery',\n    'window.jQuery': 'jquery',\n    'root.jQuery': 'jquery'\n  }), new HtmlWebpackPlugin({\n    template: 'index.ejs',\n    debug: \"debug\",\n    filename: \"index.html\",\n    production: false,\n    inject: false\n  })]\n};\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-loader/makeExportsHot.js\"); if (makeExportsHot(module, require(\"react\"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot not apply hot update to \" + \"webpack.development.config.js\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }\n/* WEBPACK VAR INJECTION */}.call(exports, \"\"))\n\n/*****************\n ** WEBPACK FOOTER\n ** ./webpack.development.config.js\n ** module id = 13\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./webpack.development.config.js?");

/***/ },
/* 14 */
/***/ function(module, exports) {

	eval("module.exports = require(\"extract-text-webpack-plugin\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"extract-text-webpack-plugin\"\n ** module id = 14\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22extract-text-webpack-plugin%22?");

/***/ },
/* 15 */
/***/ function(module, exports) {

	eval("module.exports = require(\"html-webpack-plugin\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"html-webpack-plugin\"\n ** module id = 15\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	eval("/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-api/modules/index.js\"), RootInstanceProvider = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-loader/RootInstanceProvider.js\"), ReactMount = require(\"react/lib/ReactMount\"), React = require(\"react\"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\n'use strict';\n\nvar _express = __webpack_require__(6);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _rethink = __webpack_require__(1);\n\nvar _rethink2 = _interopRequireDefault(_rethink);\n\nvar _request = __webpack_require__(17);\n\nvar _request2 = _interopRequireDefault(_request);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar router = _express2.default.Router();\n\n\n/** api **/\nvar atob = __webpack_require__(18);\nvar btoa = __webpack_require__(19);\nvar youtubedl = __webpack_require__(20);\n\nrouter.get('/youtubedl/', function (req, res, next) {\n  var decoded = atob(req.query.encoded);\n\n  if (decoded === null) {\n    res.send({ error: 'encoded url cannot be null' });\n    return;\n  }\n\n  youtubedl.getInfo(decoded, null, function (err, info) {\n    if (err) {\n      res.send({ error: err });\n    } else {\n      res.send({\n        url: info.url,\n        title: info.title,\n        metadata: info\n      });\n    }\n  });\n});\n\nrouter.post('/updatePlaylist', function (req, res, next) {\n  var identifier = req.body.identifier;\n  var data = req.body.data;\n\n  _rethink2.default.updatePlaylist(identifier, data, function (err, result) {\n    if (err) {\n      console.log(err);\n      res.send(err);\n      return;\n    } else {\n      res.send(result);\n      return;\n    }\n  });\n});\n\nrouter.get('/getPlaylist/', function (req, res, next) {\n  var identifier = req.query.identifier;\n  _rethink2.default.getPlaylist(identifier, function (err, result) {\n    if (err) {\n      console.log(err.red);\n      res.send(err);\n      return;\n    } else {\n      res.send(result);\n      return;\n    }\n  });\n});\n\nrouter.get('/ip', function (req, res) {\n  _request2.default.get('http://bot.whatismyipaddress.com/', function (error, response, body) {\n    res.send({ response: response, body: body });\n  });\n});\n\nmodule.exports = router;\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require(\"/Users/roytang/GitHub/sensify/node_modules/react-hot-loader/makeExportsHot.js\"); if (makeExportsHot(module, require(\"react\"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot not apply hot update to \" + \"api.js\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }\n\n/*****************\n ** WEBPACK FOOTER\n ** ./api.js\n ** module id = 16\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./api.js?");

/***/ },
/* 17 */
/***/ function(module, exports) {

	eval("module.exports = require(\"request\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"request\"\n ** module id = 17\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22request%22?");

/***/ },
/* 18 */
/***/ function(module, exports) {

	eval("module.exports = require(\"atob\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"atob\"\n ** module id = 18\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22atob%22?");

/***/ },
/* 19 */
/***/ function(module, exports) {

	eval("module.exports = require(\"btoa\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"btoa\"\n ** module id = 19\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22btoa%22?");

/***/ },
/* 20 */
/***/ function(module, exports) {

	eval("module.exports = require(\"youtube-dl\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"youtube-dl\"\n ** module id = 20\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22youtube-dl%22?");

/***/ },
/* 21 */
/***/ function(module, exports) {

	eval("module.exports = require(\"http\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"http\"\n ** module id = 21\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22http%22?");

/***/ },
/* 22 */
/***/ function(module, exports) {

	eval("module.exports = require(\"socket.io\");\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"socket.io\"\n ** module id = 22\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ }
/******/ ]);