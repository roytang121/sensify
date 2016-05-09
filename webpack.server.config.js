/** transpiling server.js **/

var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

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
    __dirname: true,
    fs: 'empty',
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot-loader', 'babel']
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|bower_components)/,
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        loader: "style!css!less"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test   : /\.(png|jpg)$/,
        loader : 'url-loader?limit=8192'
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  // resolve: {
  //   modulesDirectories: [
  //       'node_modules'
  //   ],
  //   extensions: ['', '.json', '.js', '.jsx']
  // },
  //
  // progress: true,
  //
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'root.jQuery': 'jquery'
    }),
  ]
}
