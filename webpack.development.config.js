var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// loaders: ['react-hot', 'babel-loader?presets[]=es2015&presets[]=react']
var production = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: production ? 'source-map' : 'eval',

  node: {
    fs: "empty"
  },

  entry: {
    app: [
      './index.js',
      // 'webpack-dev-server/client?http://localhost:8080/',
      // "webpack/hot/only-dev-server"
    ],
    // vendors: ['video.js', 'jquery']
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve('./public/'),
    publicPath: 'public/'
    // publicPath: '/static/'
  },

  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     exclude: /(node_modules|bower_components)/,
    //     loader: 'source-map'
    //   }
    // ],
    loaders: [
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve(__dirname, './app'),
          path.resolve(__dirname, './index.js')
        ],
        loaders: ['react-hot-loader', 'babel']
      },
      {
        test: /\.less$/,
        // exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve(__dirname, './app/stylesheets')
        ],
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        loader: "style!css!less"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test   : /\.(png|jpg)$/,
        loader : 'url-loader?limit=8192',
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      }
    ]
  },
  resolve: {
    modulesDirectories: [
        'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  progress: true,
  // plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery',
    //     'window.jQuery': 'jquery',
    //     'root.jQuery': 'jquery'
    // }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin(),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    // new ExtractTextPlugin("/css/[name].css")
    // ExtractTextPlugin will be used in production level
    // because it doesn't support hot reload
  // ]
  plugins: production ? [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'root.jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
  ] : [
    // new webpack.HotModuleReplacementPlugin()
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'root.jQuery': 'jquery'
    }),
  ],
}
