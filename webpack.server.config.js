/** transpiling server.js **/

var fs = require('fs')
var path = require('path')

module.exports = {
  devtool: 'eval',

  entry: path.resolve(__dirname, 'server.development.js'),

  output: {
    path: path.resolve('./build/'),
    filename: 'server.development.bundle.js'
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}
