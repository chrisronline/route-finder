var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  context: __dirname + '/app',
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.(json)$/,
        loader: 'json-loader'
      },
      {
        test: /\.(scss)$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(css)$/,
        loaders: ['style', 'css']
      }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin(),
  ]
}